"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * `.reveal` クラスを持つ要素が画面に入ったら `.is-visible` を付与する。
 * 一度表示したら監視解除（再生は1回）。
 * SPA遷移（Linkでのページ切替）でもレイアウトは再マウントされないため、
 * pathname を依存にして遷移ごとに新ページの未表示要素を再監視する。
 */
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
    );
    if (els.length === 0) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
