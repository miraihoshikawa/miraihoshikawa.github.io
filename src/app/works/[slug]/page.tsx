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

  return (
    <article className="pt-14">
      {/* Hero image (full-width) */}
      {meta.cover && (
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-[var(--bg-alt)]">
          <img
            src={meta.cover}
            alt={meta.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Title block */}
      <header className="mx-auto max-w-4xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <div className="flex items-baseline gap-4 text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
          <span>{meta.number}</span>
          <span>{meta.year}</span>
          <span>{meta.category}</span>
        </div>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-[var(--text)]">
          {meta.title}
        </h1>
        {meta.subtitle && (
          <p className="mt-2 text-base text-[var(--text-sub)]">
            {meta.subtitle}
          </p>
        )}
        <p className="mt-8 max-w-2xl text-base leading-loose text-[var(--text-sub)]">
          {meta.tagline}
        </p>
      </header>

      <div className="mx-auto max-w-4xl px-6 md:px-10">
        {/* Video (if provided) */}
        {meta.videoUrl && (
          <section className="border-t border-[var(--border)] py-12">
            <Video src={meta.videoUrl} title={meta.title} />
          </section>
        )}

        {/* Sub-projects */}
        {meta.subProjects && meta.subProjects.length > 0 && (
          <section className="border-t border-[var(--border)] py-12">
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Sub Projects
            </h2>
            <div className="mt-8 space-y-12">
              {meta.subProjects.map((sub) => (
                <div key={sub.title}>
                  <p className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-mute)] uppercase">
                    {sub.year}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[var(--text)]">
                    {sub.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-sub)]">
                    {sub.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MDX body */}
        {body.trim() && (
          <section className="border-t border-[var(--border)] py-12">
            <div className="mdx-body text-base text-[var(--text-sub)]">
              <MDXRemote source={body} components={components} />
            </div>
          </section>
        )}

        {/* Team */}
        {meta.team && (
          <section className="border-t border-[var(--border)] py-12">
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              制作体制
            </h2>
            <p className="mt-8 max-w-2xl whitespace-pre-line text-base text-[var(--text-sub)]">
              {meta.team}
            </p>
          </section>
        )}
      </div>

      {/* Gallery — full-width */}
      {meta.gallery && meta.gallery.length > 0 && (
        <section className="border-t border-[var(--border)] py-12">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Gallery
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-7xl space-y-4 px-6 md:px-10">
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

      <div className="mx-auto max-w-4xl px-6 md:px-10">
        {/* Achievements */}
        {meta.achievements && meta.achievements.length > 0 && (
          <section className="border-t border-[var(--border)] py-12">
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              導入・展示実績
            </h2>
            <ul className="mt-8 space-y-2">
              {meta.achievements.map((a) => (
                <li
                  key={a}
                  className="text-base text-[var(--text-sub)]"
                >
                  — {a}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* References — 書誌情報 */}
        {(meta.references && meta.references.length > 0) ||
        meta.academicRef ? (
          <section className="border-t border-[var(--border)] py-12">
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              書誌情報
            </h2>
            <ol className="mt-8 list-decimal space-y-3 pl-5 text-sm text-[var(--text-sub)]">
              {meta.references?.map((r, i) => (
                <li key={i} className="leading-relaxed">
                  {r}
                </li>
              ))}
              {meta.academicRef && !meta.references && (
                <li className="leading-relaxed">{meta.academicRef}</li>
              )}
            </ol>
          </section>
        ) : null}

        {/* Media — その他 */}
        {meta.media && meta.media.length > 0 && (
          <section className="border-t border-[var(--border)] py-12">
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              その他
            </h2>
            <ul className="mt-8 space-y-2">
              {meta.media.map((m, i) => (
                <li key={i} className="text-sm text-[var(--text-sub)]">
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
          </section>
        )}

        {/* Tools */}
        {meta.tools && meta.tools.length > 0 && (
          <section className="border-t border-[var(--border)] py-12">
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              使用ツール
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {meta.tools.map((t) => (
                <ToolBadge key={t} name={t} />
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <nav className="grid border-t border-[var(--border)] py-12 md:grid-cols-3 md:gap-6">
          <Link href={`/works/${prev.slug}/`} className="group block">
            <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              ← Prev
            </p>
            <p className="mt-2 text-sm font-bold text-[var(--text)] group-hover:underline">
              {prev.title}
            </p>
          </Link>
          <Link
            href="/#works"
            className="hidden text-center md:block"
          >
            <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase hover:text-[var(--text)]">
              All Works
            </p>
          </Link>
          <Link
            href={`/works/${next.slug}/`}
            className="group block text-right"
          >
            <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Next →
            </p>
            <p className="mt-2 text-sm font-bold text-[var(--text)] group-hover:underline">
              {next.title}
            </p>
          </Link>
        </nav>
      </div>
    </article>
  );
}
