/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticle } from "@/lib/content";

export function generateStaticParams() {
  return getAllArticles(true).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  return {
    title: a ? `${a.meta.title} | 干川未来` : "干川未来 | Portfolio",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getArticle(slug);
  if (!data) notFound();
  const { meta, body } = data;

  return (
    <article className="pt-14">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">
        {/* Header */}
        <header className="border-b border-[var(--border)] pb-10">
          <div className="flex flex-wrap items-baseline gap-4">
            <time className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              {meta.date}
            </time>
            {meta.tags?.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono tracking-wider text-[var(--text-mute)] uppercase"
              >
                / {t}
              </span>
            ))}
          </div>
          <h1 className="mt-6 text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.2] font-bold tracking-tight text-[var(--text)]">
            {meta.title}
          </h1>
          {meta.summary && (
            <p className="mt-4 text-base text-[var(--text-sub)]">
              {meta.summary}
            </p>
          )}
        </header>

        {/* Cover */}
        {meta.cover && (
          <img
            src={meta.cover}
            alt={meta.title}
            className="mt-12 w-full"
          />
        )}

        {/* Body */}
        <div className="mdx-body mt-12 text-base text-[var(--text-sub)]">
          <MDXRemote source={body} />
        </div>

        {/* Footer nav */}
        <nav className="mt-20 border-t border-[var(--border)] pt-8">
          <Link
            href="/articles/"
            className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase hover:text-[var(--text)]"
          >
            ← All Articles
          </Link>
        </nav>
      </div>
    </article>
  );
}
