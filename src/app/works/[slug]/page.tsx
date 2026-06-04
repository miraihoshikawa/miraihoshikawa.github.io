/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllProjects,
  getProject,
  getAdjacentProjects,
} from "@/lib/content";
import { PlaceholderImage } from "@/components/shared/PlaceholderImage";
import { ToolBadge } from "@/components/shared/ToolBadge";

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

  return (
    <div className="pt-14">
      {/* Hero */}
      <div className="relative">
        {meta.cover ? (
          <img
            src={meta.cover}
            alt={meta.title}
            className="aspect-[21/9] w-full object-cover"
          />
        ) : (
          <PlaceholderImage
            aspectRatio="21/9"
            label={meta.title}
            className="w-full"
          />
        )}
        <div className="absolute bottom-0 left-0 p-6">
          <span className="text-5xl font-bold text-gray-300/70">
            {meta.number}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {meta.title}
        </h1>
        {meta.subtitle && (
          <p className="mt-1 text-sm text-gray-500">{meta.subtitle}</p>
        )}
        <div className="mt-2 flex items-center gap-3">
          <span className="rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-500">
            {meta.category}
          </span>
          <span className="text-xs text-gray-400">{meta.year}</span>
        </div>
        <p className="mt-4 text-sm text-gray-600">{meta.tagline}</p>

        {/* Sub-projects (for kosen) */}
        {meta.subProjects && (
          <div className="mt-10 space-y-8">
            {meta.subProjects.map((sub) => (
              <div
                key={sub.title}
                className="rounded-lg border border-gray-200 p-6"
              >
                <PlaceholderImage
                  aspectRatio="16/9"
                  label={sub.title}
                  className="mb-4 rounded"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {sub.title}
                </h3>
                <p className="text-xs text-gray-400">{sub.year}</p>
                <p className="mt-2 text-sm text-gray-600">{sub.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Background — MDX body */}
        {body.trim() && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-900">制作背景</h2>
            <div className="mt-1 h-0.5 w-8 bg-gray-300" />
            <div className="mdx-body mt-3 text-sm leading-relaxed text-gray-600">
              <MDXRemote source={body} />
            </div>
          </div>
        )}

        {/* Team */}
        {meta.team && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900">制作体制</h2>
            <div className="mt-1 h-0.5 w-8 bg-gray-300" />
            <p className="mt-3 whitespace-pre-line text-sm text-gray-600">
              {meta.team}
            </p>
          </div>
        )}

        {/* Gallery */}
        {meta.imageCount && meta.imageCount > 0 ? (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900">ギャラリー</h2>
            <div className="mt-1 h-0.5 w-8 bg-gray-300" />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {Array.from({ length: meta.imageCount }).map((_, i) => (
                <PlaceholderImage
                  key={i}
                  aspectRatio="16/9"
                  label={`画像 ${i + 1}`}
                  className="rounded"
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Achievements */}
        {meta.achievements && meta.achievements.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900">
              導入実績 / 展示実績
            </h2>
            <div className="mt-1 h-0.5 w-8 bg-gray-300" />
            <ul className="mt-3 space-y-1">
              {meta.achievements.map((a) => (
                <li key={a} className="text-sm text-gray-600">
                  - {a}
                </li>
              ))}
            </ul>
            {meta.academicRef && (
              <p className="mt-3 text-xs italic text-gray-400">
                {meta.academicRef}
              </p>
            )}
          </div>
        )}

        {/* Tools */}
        {meta.tools && meta.tools.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900">使用ツール</h2>
            <div className="mt-1 h-0.5 w-8 bg-gray-300" />
            <div className="mt-3 flex flex-wrap gap-2">
              {meta.tools.map((t) => (
                <ToolBadge key={t} name={t} />
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-16 flex items-center justify-between border-t border-gray-200 pt-6">
          <Link
            href={`/works/${prev.slug}`}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m15 19-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">{prev.title}</span>
            <span className="sm:hidden">前へ</span>
          </Link>
          <Link
            href="/#works"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            一覧に戻る
          </Link>
          <Link
            href={`/works/${next.slug}`}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <span className="hidden sm:inline">{next.title}</span>
            <span className="sm:hidden">次へ</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m9 5 7 7-7 7"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </div>
  );
}
