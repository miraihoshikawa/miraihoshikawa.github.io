"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";

export type MarqueeItem = {
  src: string;
  alt: string;
  key: string;
  slug: string;
};

export function WorksMarqueeClient({ items }: { items: MarqueeItem[] }) {
  // 初回ロード時に一度だけランダムなキュー順を確定する（= 1巡内で重複しない）。
  // SSR と初回クライアント描画は元順（items）で一致させ、マウント後にシャッフルする
  // ことでハイドレーション不整合を避ける。
  const [order, setOrder] = useState<MarqueeItem[]>(items);

  useEffect(() => {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setOrder(a);
  }, [items]);

  // シームレスループのため、確定した順を 2 周分つなげる
  const loop = [...order, ...order];

  return (
    <div className="relative w-full pt-14 -mb-12 md:-mb-16">
      <div className="works-marquee-strip">
        <div className="works-marquee-track flex">
          {loop.map((it, i) => {
            const dup = i >= order.length;
            return (
              <Link
                key={`${it.key}-${i}`}
                href={`/works/${it.slug}/`}
                aria-hidden={dup || undefined}
                tabIndex={dup ? -1 : undefined}
                className="group relative mr-4 aspect-[4/3] h-[clamp(120px,19vw,224px)] shrink-0 overflow-hidden bg-[var(--bg-alt)]"
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg)]/95 to-transparent p-2 text-[10px] leading-tight font-medium text-[var(--text)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {it.alt}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
