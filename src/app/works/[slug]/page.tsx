/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllProjects,
  getProject,
  getAdjacentProjects,
} from "@/lib/content";
import { ToolBadge } from "@/components/shared/ToolBadge";
import { TeamBadge, Tag } from "@/components/shared/TeamBadge";
import { Video, mdxComponents } from "@/components/mdx";
import { emphasizeSelf } from "@/components/shared/emphasizeSelf";
import { LoopVideo } from "@/components/shared/LoopVideo";

// 作品詳細の「AI利用」セクションの表示切り替え（就活用）。
// 表示したい時は true にするだけ。各作品の aiUsage データはそのまま残す。
const SHOW_AI_USAGE = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proj = getProject(slug);
  if (!proj) return { title: "干川未来 | Portfolio" };
  const { title, tagline, cover } = proj.meta;
  const images = cover ? [cover] : undefined;
  const url = `/works/${slug}/`;
  return {
    title,
    description: tagline,
    openGraph: {
      type: "article",
      title: `${title} | 干川未来`,
      description: tagline,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 干川未来`,
      description: tagline,
      images,
    },
    alternates: { canonical: url },
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  research: "研究",
  entertainment: "エンタメ",
  implementation: "実装",
};

function SectionHead({ label }: { label: string }) {
  return (
    <h2 className="mb-8 text-[1.625rem] leading-snug font-bold tracking-tight text-[var(--text)]">
      {label}
    </h2>
  );
}

function SpecItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-[12px] tracking-[0.14em] text-[var(--text-sub)] uppercase">
        {label}
      </dt>
      <dd className="jp-phrase mt-2 text-[15px] leading-relaxed text-[var(--text-body)]">
        {children}
      </dd>
    </div>
  );
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getProject(slug);
  if (!data) notFound();
  const { meta, body } = data;
  const { prev, next } = getAdjacentProjects(slug);
  const imageBase = `/images/projects/${meta.slug}`;
  const components = mdxComponents(imageBase);

  const categories = (meta.categories && meta.categories.length
    ? meta.categories
    : [meta.category]
  ).map((c) => CATEGORY_LABEL[c] ?? c);

  const abstractText = meta.abstract || meta.tagline;

  return (
    <article className="pt-14">
      {/* Title block */}
      <header className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-16">
        <Link
          href="/works/"
          className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] text-[var(--text-sub)] uppercase transition-colors hover:text-[var(--text)]"
        >
          ← Works
        </Link>
        <p className="mt-8 text-[14px] tracking-[0.04em] text-[var(--text-sub)]">
          <span className="font-mono">{meta.year}</span>
          <span className="mx-2 text-[var(--text-mute)]" aria-hidden="true">·</span>
          {categories.join(" / ")}
        </p>
        <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.05] font-bold tracking-tight text-[var(--text)]">
          {meta.title}
        </h1>
        {meta.subtitle && (
          <p className="jp-phrase mt-4 text-lg font-medium text-[var(--text-sub)] md:text-xl">
            {meta.subtitle}
          </p>
        )}
        {(meta.teamType || meta.tags?.length || meta.repoUrl) && (
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            {meta.teamType && <TeamBadge type={meta.teamType} />}
            {meta.tags?.map((t) => <Tag key={t} label={t} />)}
            {meta.repoUrl && (
              <a
                href={meta.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] text-[var(--accent-ink)] uppercase underline-offset-4 hover:underline"
              >
                Source Code ↗
              </a>
            )}
          </div>
        )}
        {/* 題名のすぐ下に体制・担当／発表・成果／主な技術（PC のみ。スマホは要点の「成果」と重なるため出さない） */}
        <ProjectFacts
          team={meta.team}
          highlight={meta.highlight}
          tools={meta.tools}
          className="mt-10 hidden md:grid"
        />
      </header>

      {/* Abstract — 左に画像・右に説明（これだけ読めば概要がわかる） */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-24">
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-12">
          {meta.clip ? (
            <div className="overflow-hidden bg-[var(--bg-alt)]">
              <LoopVideo
                src={meta.clip}
                poster={meta.clipPoster ?? meta.cover}
                eager
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          ) : meta.cover ? (
            <div className="overflow-hidden bg-[var(--bg-alt)]">
              <img
                src={meta.cover}
                alt={meta.title}
                fetchPriority="high"
                decoding="async"
                className={
                  meta.cardFit === "contain"
                    ? "w-full object-contain"
                    : "aspect-[4/3] w-full object-cover"
                }
              />
            </div>
          ) : (
            <div />
          )}
          <div className="md:pt-2">
            {meta.keyPoints && meta.keyPoints.length > 0 ? (
              <div className="space-y-5">
                {meta.keyPoints.map((kp) => (
                  <div
                    key={kp.label}
                    className="border-l-2 border-[var(--accent)] pl-4"
                  >
                    <p className="text-[13px] font-bold tracking-[0.06em] text-[var(--accent-ink)]">
                      {kp.label}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-[var(--text-body)] md:text-base">
                      {kp.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="font-mono text-[12px] tracking-[0.12em] text-[var(--accent-ink)] uppercase">
                  Abstract
                </p>
                <p className="mt-5 text-pretty text-base leading-loose text-[var(--text-body)] md:text-lg">
                  {abstractText}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Video */}
      {meta.videoUrl && (
        <section className="bg-[var(--bg-alt)]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead label="Video" />
            <Video src={meta.videoUrl} title={meta.title} />
          </div>
        </section>
      )}

      {/* Sub-projects */}
      {meta.subProjects && meta.subProjects.length > 0 && (
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead label="Sub Projects" />
            <div className="space-y-12">
              {meta.subProjects.map((sub) => (
                <div key={sub.title}>
                  <p className="text-[12px] font-mono tracking-[0.14em] text-[var(--text-mute)] uppercase">
                    {sub.year}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[var(--text)]">
                    {sub.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--text-body)]">
                    {sub.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MDX Body */}
      {body.trim() && (
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
            <div className="mdx-body">
              <MDXRemote source={body} components={components} />
            </div>
          </div>
        </section>
      )}

      {/* AI Usage（SHOW_AI_USAGE で表示切替。就活用にオフ中） */}
      {SHOW_AI_USAGE && meta.aiUsage && (
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead label="AI利用" />
            <p className="max-w-2xl whitespace-pre-line text-lg leading-relaxed text-[var(--text-body)]">
              {meta.aiUsage}
            </p>
          </div>
        </section>
      )}

      {/* Gallery */}
      {meta.gallery && meta.gallery.length > 0 && (
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-4xl px-6 pt-16 md:px-10 md:pt-20">
            <SectionHead label="Gallery" />
          </div>
          <div
            className={`mx-auto px-6 pb-16 md:px-10 md:pb-20 ${
              meta.galleryLayout === "grid"
                ? "grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3"
                : "max-w-7xl space-y-3"
            }`}
          >
            {meta.gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${meta.title} - ${i + 1}`}
                loading="lazy"
                decoding="async"
                className={
                  meta.galleryLayout === "grid"
                    ? "aspect-[4/3] w-full object-cover"
                    : "w-full"
                }
              />
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {meta.achievements && meta.achievements.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--bg-alt)]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead label="導入・展示実績" />
            <ul className="space-y-3">
              {meta.achievements.map((a) => (
                <li
                  key={a}
                  className="text-lg leading-relaxed text-[var(--text-body)]"
                >
                  — {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* References */}
      {((meta.references && meta.references.length > 0) ||
        meta.academicRef) && (
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead label="書誌情報" />
            <ol className="list-decimal space-y-4 pl-6 text-[var(--text-body)]">
              {meta.references?.map((r, i) => {
                const text = typeof r === "string" ? r : r.text;
                const url = typeof r === "string" ? undefined : r.url;
                return (
                  <li key={i} className="leading-relaxed">
                    {emphasizeSelf(text)}
                    {url && (
                      <>
                        {" "}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent-ink)] underline underline-offset-2 hover:opacity-70"
                        >
                          [link]
                        </a>
                      </>
                    )}
                  </li>
                );
              })}
              {meta.academicRef && !meta.references && (
                <li className="leading-relaxed">{meta.academicRef}</li>
              )}
            </ol>
          </div>
        </section>
      )}

      {/* Media */}
      {meta.media && meta.media.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--bg-alt)]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead label="その他" />
            <ul className="space-y-3">
              {meta.media.map((m, i) => (
                <li
                  key={i}
                  className="text-lg leading-relaxed text-[var(--text-body)]"
                >
                  —{" "}
                  {m.url ? (
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[var(--text)]"
                    >
                      {m.title}
                    </a>
                  ) : (
                    m.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Tools */}
      {meta.tools && meta.tools.length > 0 && (
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead label="使用ツール" />
            <div className="flex flex-wrap gap-2">
              {meta.tools.map((t) => (
                <ToolBadge key={t} name={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation（前後の作品をサムネイルつきで） */}
      <nav className="border-t border-[var(--border)]" aria-label="作品の移動">
        <div className="mx-auto grid max-w-4xl gap-8 px-6 py-14 md:grid-cols-[1fr_auto_1fr] md:items-center md:px-10">
          <AdjacentLink project={prev} dir="prev" />
          <Link
            href="/works/"
            className="order-last justify-self-center border border-[var(--border)] px-5 py-2.5 font-mono text-[12px] tracking-[0.12em] text-[var(--text-sub)] uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--text)] md:order-none"
          >
            All Works
          </Link>
          <AdjacentLink project={next} dir="next" />
        </div>
      </nav>
    </article>
  );
}

function AdjacentLink({
  project,
  dir,
}: {
  project: { slug: string; title: string; cover?: string };
  dir: "prev" | "next";
}) {
  const isNext = dir === "next";
  return (
    <Link
      href={`/works/${project.slug}/`}
      className={`group flex items-center gap-4 ${isNext ? "flex-row-reverse text-right" : ""}`}
    >
      {project.cover && (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-24 shrink-0 object-cover opacity-80 transition-opacity group-hover:opacity-100 md:w-28"
        />
      )}
      <span>
        <span className="block font-mono text-[12px] tracking-[0.12em] text-[var(--text-sub)] uppercase">
          {isNext ? "Next →" : "← Prev"}
        </span>
        <span className="mt-2 block text-base font-bold leading-snug text-[var(--text)] group-hover:text-[var(--accent-ink)]">
          {project.title}
        </span>
      </span>
    </Link>
  );
}

function ProjectFacts({
  team,
  highlight,
  tools,
  className = "",
}: {
  team?: string;
  highlight?: string;
  tools?: string[];
  className?: string;
}) {
  const mainTools = tools && tools.length
    ? tools.slice(0, 4).join(" / ") + (tools.length > 4 ? " ほか" : "")
    : undefined;
  const count = [team, highlight, mainTools].filter(Boolean).length;
  if (count === 0) return null;
  const cols =
    count === 3
      ? "md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]"
      : count === 2
        ? "md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
        : "md:grid-cols-1";
  return (
    <dl
      className={`gap-x-10 gap-y-6 border-t border-[var(--border)] pt-7 ${cols} ${className}`}
    >
      {team && (
        <SpecItem label="Team / 体制・担当">
          <span className="whitespace-pre-line">{team}</span>
        </SpecItem>
      )}
      {highlight && <SpecItem label="Outcome / 発表・成果">{highlight}</SpecItem>}
      {mainTools && <SpecItem label="Tools / 主な技術">{mainTools}</SpecItem>}
    </dl>
  );
}
