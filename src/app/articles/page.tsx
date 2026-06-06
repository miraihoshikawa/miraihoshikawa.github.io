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
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionHeading jp="記事" sub="制作メモ・展示レポート・覚え書き。">
          Articles
        </SectionHeading>

        {articles.length === 0 ? (
          <p className="text-sm text-[var(--text-sub)]">
            まだ記事はありません。
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}/`}
                  className="group grid grid-cols-1 gap-2 py-8 md:grid-cols-[200px_1fr] md:gap-10"
                >
                  <div className="flex items-baseline gap-3 md:block">
                    <time className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-mute)] uppercase">
                      {a.date}
                    </time>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {a.tags?.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono tracking-wider text-[var(--text-mute)] uppercase"
                        >
                          / {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text)] group-hover:underline">
                      {a.title}
                    </h3>
                    {a.summary && (
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-sub)]">
                        {a.summary}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
