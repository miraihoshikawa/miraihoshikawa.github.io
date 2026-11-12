"use client";

import { useEffect, useRef } from "react";

/**
 * 無音でループする短い動画（作品のサムネイル・トップの映像）。
 * 画面に入っている間だけ再生し、ヘッダーの一時停止（html.motion-paused）や
 * OS の「視差効果を減らす」設定のときはポスター画像のまま止める。
 */
export function LoopVideo({
  src,
  srcSmall,
  poster,
  className = "",
  eager = false,
}: {
  src: string;
  srcSmall?: string;
  poster?: string;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      const stop = reduce.matches || root.classList.contains("motion-paused");
      if (visible && !stop) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    const mo = new MutationObserver(update);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    reduce.addEventListener("change", update);
    return () => {
      io.disconnect();
      mo.disconnect();
      reduce.removeEventListener("change", update);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    >
      {srcSmall ? (
        <>
          <source src={src} type="video/mp4" media="(min-width: 768px)" />
          <source src={srcSmall} type="video/mp4" />
        </>
      ) : (
        <source src={src} type="video/mp4" />
      )}
    </video>
  );
}
