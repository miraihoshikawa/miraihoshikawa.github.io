import { LoopVideo } from "@/components/shared/LoopVideo";

/**
 * トップの冒頭。作品映像だけを高さを抑えた帯で流す（本人の名前や写真は重ねない）。
 * すぐ下に About を置き、最初の画面で少し見えるようにする。
 * 映像は一時停止ボタン・「視差効果を減らす」設定で止まり、ポスター画像になる。
 * 映像を差し替えるときはファイル名を変える（同じ名前だとブラウザ・CDN に古い映像が残る）。
 */
export function Hero() {
  return (
    <section
      aria-label="作品映像"
      className="relative h-[42svh] min-h-[260px] w-full overflow-hidden bg-black md:h-[58svh] md:min-h-[400px] md:max-h-[640px]"
    >
      <LoopVideo
        src="/videos/hero-v5.mp4"
        srcSmall="/videos/hero-v5-sm.mp4"
        poster="/videos/hero-v5.jpg"
        eager
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* 下端をページの地へなじませる */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--bg)] to-transparent"
        aria-hidden="true"
      />
      <p className="absolute bottom-4 left-0 right-0 mx-auto max-w-7xl px-6 font-mono text-[12px] tracking-[0.12em] text-white/70 uppercase md:bottom-6 md:px-10">
        Works Reel
      </p>
    </section>
  );
}
