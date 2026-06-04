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
import { Video, mdxComponents } from "@/components/mdx";

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
  return {
    title: proj ? `${proj.meta.title} | 干川未来` : "干川未来 | Portfolio",
  };
}

function SectionHead({
  num,
  label,
}: {
  num: string;
  label: string;
}) {
  return (
    <div className="mb-10 flex items-baseline gap-5">
      <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--accent)]">
        {num}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
        {label}
      </h2>
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

  // ヒーロー画像の決定:
  //   1) heroImages frontmatter (ファイル名指定) → ストリップ
  //   2) cover + gallery 最大3枚 → ストリップ
  //   3) cover 単体 → 16:9
  const heroStripUrls = (() => {
    if (meta.heroImages && meta.heroImages.length > 0) {
      return meta.heroImages.map((f) =>
        /^https?:\/\//.test(f) || f.startsWith("/")
          ? f
          : `${imageBase}/${f}`
      );
    }
    if (meta.cover && meta.gallery && meta.gallery.length >= 3) {
      return [meta.cover, ...meta.gallery.slice(0, 3)];
    }
    return null;
  })();

  let sectionIdx = 0;
  const nextNum = () => String(++sectionIdx).padStart(2, "0");

  return (
    <article className="pt-14">
      {/* Hero — コンテンツ幅に収めて4枚並べ */}
      {heroStripUrls ? (
        <div className="mx-auto mt-4 max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {heroStripUrls.map((src, i) => (
              <div
                key={src + i}
                className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-alt)]"
              >
                <img
                  src={src}
                  alt={`${meta.title} ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ) : meta.cover ? (
        <div className="mx-auto mt-4 max-w-7xl px-6 md:px-10">
          <div className="overflow-hidden bg-[var(--bg-alt)]">
            <img
              src={meta.cover}
              alt={meta.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      {/* Title block */}
      <header className="mx-auto max-w-5xl px-6 pt-20 pb-16 md:px-10 md:pt-28 md:pb-20">
        <div className="flex items-baseline gap-5 font-mono text-[11px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
          <span>{meta.number}</span>
          <span>{meta.year}</span>
          <span>{meta.category}</span>
        </div>
        <h1 className="mt-8 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] font-bold tracking-tight text-[var(--text)]">
          {meta.title}
        </h1>
        {meta.subtitle && (
          <p className="mt-4 text-lg font-medium text-[var(--text-sub)] md:text-xl">
            {meta.subtitle}
          </p>
        )}
        <p className="mt-10 max-w-3xl text-base leading-loose text-[var(--text-body)] md:text-lg">
          {meta.tagline}
        </p>
      </header>

      {/* Video */}
      {meta.videoUrl && (
        <section className="bg-[var(--bg-alt)]">
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead num={nextNum()} label="Video" />
            <Video src={meta.videoUrl} title={meta.title} />
          </div>
        </section>
      )}

      {/* Sub-projects */}
      {meta.subProjects && meta.subProjects.length > 0 && (
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead num={nextNum()} label="Sub Projects" />
            <div className="space-y-12">
              {meta.subProjects.map((sub) => (
                <div key={sub.title}>
                  <p className="text-[11px] font-mono tracking-[0.2em] text-[var(--text-mute)] uppercase">
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

      {/* Team */}
      {meta.team && (
        <section className="border-t border-[var(--border)] bg-[var(--bg-alt)]">
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead num={nextNum()} label="制作体制" />
            <p className="max-w-2xl whitespace-pre-line text-lg leading-relaxed text-[var(--text-body)]">
              {meta.team}
            </p>
          </div>
        </section>
      )}

      {/* Gallery */}
      {meta.gallery && meta.gallery.length > 0 && (
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-5xl px-6 pt-16 md:px-10 md:pt-20">
            <SectionHead num={nextNum()} label="Gallery" />
          </div>
          <div className="mx-auto max-w-7xl space-y-3 px-6 pb-16 md:px-10 md:pb-20">
            {meta.gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${meta.title} - ${i + 1}`}
                className="w-full"
              />
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {meta.achievements && meta.achievements.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--bg-alt)]">
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead num={nextNum()} label="導入・展示実績" />
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
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead num={nextNum()} label="書誌情報" />
            <ol className="list-decimal space-y-4 pl-6 text-[var(--text-body)]">
              {meta.references?.map((r, i) => (
                <li key={i} className="leading-relaxed">
                  {r}
                </li>
              ))}
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
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead num={nextNum()} label="その他" />
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
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
            <SectionHead num={nextNum()} label="使用ツール" />
            <div className="flex flex-wrap gap-2">
              {meta.tools.map((t) => (
                <ToolBadge key={t} name={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <nav className="border-t border-[var(--border)]">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 py-16 md:grid-cols-3 md:px-10">
          <Link href={`/works/${prev.slug}/`} className="group block">
            <p className="text-[11px] font-mono tracking-[0.25em] text-[var(--text-mute)] uppercase">
              ← Prev
            </p>
            <p className="mt-3 text-base font-bold text-[var(--text)] group-hover:underline">
              {prev.title}
            </p>
          </Link>
          <Link
            href="/#works"
            className="hidden self-center text-center md:block"
          >
            <p className="text-[11px] font-mono tracking-[0.25em] text-[var(--text-mute)] uppercase hover:text-[var(--text)]">
              All Works
            </p>
          </Link>
          <Link
            href={`/works/${next.slug}/`}
            className="group block text-right"
          >
            <p className="text-[11px] font-mono tracking-[0.25em] text-[var(--text-mute)] uppercase">
              Next →
            </p>
            <p className="mt-3 text-base font-bold text-[var(--text)] group-hover:underline">
              {next.title}
            </p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
