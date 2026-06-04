import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata = {
  title: "Articles | 干川未来",
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="pt-14">
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <SectionHeading sub="制作メモ・展示レポート・覚え書き">
          Articles
        </SectionHeading>

        {articles.length === 0 ? (
          <p className="mt-12 text-sm text-[#5a5a5a]">
            まだ記事はありません。
          </p>
        ) : (
          <ul className="mt-12 space-y-6">
            {articles.map((a) => (
              <li
                key={a.slug}
                className="border-b border-[#2a2a2a] pb-6 last:border-0"
              >
                <Link
                  href={`/articles/${a.slug}`}
                  className="group block"
                >
                  <div className="flex items-baseline gap-3">
                    <time className="font-mono text-[10px] text-[#2a5aaa]">
                      {a.date}
                    </time>
                    {a.tags?.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#2a2a2a] px-1.5 py-0.5 text-[9px] text-[#5a5a5a]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-[#e8e8e8] group-hover:text-[#2a5aaa]">
                    {a.title}
                  </h3>
                  {a.summary && (
                    <p className="mt-1 text-xs text-[#5a5a5a]">{a.summary}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
