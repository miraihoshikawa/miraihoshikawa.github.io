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
    <div className="pt-14">
      <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        {/* Header */}
        <header className="border-b border-gray-200 pb-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <time className="font-mono text-xs text-[#2a5aaa]">
              {meta.date}
            </time>
            {meta.tags?.map((t) => (
              <span
                key={t}
                className="rounded border border-gray-300 px-1.5 py-0.5 text-[10px] text-gray-500"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
            {meta.title}
          </h1>
          {meta.summary && (
            <p className="mt-2 text-sm text-gray-500">{meta.summary}</p>
          )}
        </header>

        {/* Cover */}
        {meta.cover && (
          <img
            src={meta.cover}
            alt={meta.title}
            className="mt-8 w-full rounded"
          />
        )}

        {/* Body */}
        <div className="mdx-body mt-8 text-sm leading-relaxed text-gray-700">
          <MDXRemote source={body} />
        </div>

        {/* Footer nav */}
        <nav className="mt-16 border-t border-gray-200 pt-6">
          <Link
            href="/articles"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Articles 一覧
          </Link>
        </nav>
      </article>
    </div>
  );
}
