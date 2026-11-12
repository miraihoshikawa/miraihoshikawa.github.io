/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getAllProjects, type ProjectCategory } from "@/lib/content";
import { profile } from "@/data/profile";
import { WorkCard } from "@/components/shared/WorksList";

/** 3つのフィールド。label・説明は profile.axes と同じ並び */
export const FIELDS: {
  key: ProjectCategory;
  num: string;
  en: string;
  jp: string;
  axis: number;
  image: string;
  imageAlt: string;
}[] = [
  {
    key: "research",
    num: "01",
    en: "Research",
    jp: "研究",
    axis: 0,
    image: "/images/fields/research.jpg",
    imageAlt: "ベッドの操作者のもとへ、ロボットが机の上の物を取りに行く（マスター・リモートシステム）",
  },
  {
    key: "entertainment",
    num: "02",
    en: "Entertainment",
    jp: "エンタメ",
    axis: 1,
    image: "/images/projects/08-relational-coral/Fig_exhibit.jpg",
    imageAlt: "アート＆テクノロジー東北 2026 での展示（Relational Coral）",
  },
  {
    key: "implementation",
    num: "03",
    en: "Implementation",
    jp: "実装",
    axis: 2,
    image: "/images/projects/02-streaming-interface/Fig_onsite.jpg",
    imageAlt: "自作の演出統合インターフェースを用いた配信オペレーション卓",
  },
];

/**
 * 作品をフィールド（研究・エンタメ・実装）ごとに並べる。
 * 2件以下のフィールドは2列の大きなカード、それより多いフィールドは
 * featured を横長で先頭に置き、残りを3列で並べる。実装には Operations への入口を添える。
 */
export function WorksByField({ headingAs = "h2" }: { headingAs?: "h2" | "h3" }) {
  const projects = getAllProjects();
  const Heading = headingAs;

  return (
    <div>
      {FIELDS.map((f) => {
        const items = projects.filter((p) => p.category === f.key);
        const axis = profile.axes[f.axis];
        const isImpl = f.key === "implementation";
        const featured = items.filter((p) => p.featured);
        const rest = items.filter((p) => !p.featured);
        const fewItems = items.length + (isImpl ? 1 : 0) <= 2;

        return (
          <section
            key={f.key}
            id={f.key}
            className="scroll-mt-20 border-t border-[var(--border)] py-16 first:border-t-0 first:pt-0 md:py-20"
          >
            <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 md:mb-12">
              <div>
                <p className="font-mono text-[12px] tracking-[0.12em] text-[var(--accent-ink)] uppercase">
                  Field {f.num}
                </p>
                <Heading className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[clamp(1.9rem,4vw,2.75rem)] leading-none font-bold tracking-tight text-[var(--text)]">
                  {f.en}
                  <span className="text-base font-medium whitespace-nowrap text-[var(--text-sub)]">
                    {f.jp}
                  </span>
                </Heading>
              </div>
              <p className="jp-phrase text-[15px] text-[var(--text-sub)]">
                {axis.description}
                <span className="mt-1 block font-mono text-[13px] whitespace-nowrap text-[var(--text-mute)] sm:mt-0 sm:ml-3 sm:inline">
                  {items.length} {items.length === 1 ? "work" : "works"}
                </span>
              </p>
            </div>

            {fewItems ? (
              <ul className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
                {items.map((p) => (
                  <li key={p.slug}>
                    <WorkCard p={p} variant="large" />
                  </li>
                ))}
                {isImpl && (
                  <li>
                    <OperationsTeaser />
                  </li>
                )}
              </ul>
            ) : (
              <>
                {featured.map((p) => (
                  <div key={p.slug} className="mb-16">
                    <WorkCard p={p} variant="wide" />
                  </div>
                ))}
                <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-14">
                  {rest.map((p) => (
                    <li key={p.slug}>
                      <WorkCard p={p} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}

/** 実装フィールドに添える、配信・現場運用ページへの入口 */
function OperationsTeaser() {
  const ops = profile.history.operations;
  return (
    <Link href="/operations/" className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-alt)]">
        <img
          src="/images/projects/02-streaming-interface/Fig_setup.jpg"
          alt="実イベント会場での配信オペレーション準備"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="font-mono text-[12px] tracking-[0.12em] text-white/75 uppercase">
            Operations
          </p>
          <p className="mt-2 flex items-baseline gap-3 text-white">
            <span className="text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-bold">
              {ops.summaryCount}
            </span>
            <span className="text-[14px] text-white/80">{ops.summaryNote}</span>
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent-ink)] md:text-[1.75rem]">
          配信・現場運用
        </h3>
        <p className="jp-phrase mt-1.5 text-base leading-relaxed text-[var(--text-sub)]">
          スタートアップ系イベントを中心に、映像・音響・照明をまとめて担う配信テクニカル。
        </p>
        <p className="mt-3 text-[14px] text-[var(--accent-ink)]">
          運用した現場の記録を見る →
        </p>
      </div>
    </Link>
  );
}
