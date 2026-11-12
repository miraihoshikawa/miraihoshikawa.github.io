/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";
import { LoopVideo } from "@/components/shared/LoopVideo";
import { FIELDS } from "@/components/shared/WorksByField";

const LEAD = (profile.bio.split("。")[1] ?? "").trim() + "。";

/**
 * トップの冒頭。作品映像を全面に流し、右側に本人の写真を輪郭をぼかして溶け込ませ、
 * 名前・所属・自己紹介文の1文を重ねる。
 * 映像は一時停止ボタン・「視差効果を減らす」設定で止まり、ポスター画像になる。
 */
export function Hero() {
  return (
    <section
      aria-label="干川未来のポートフォリオ"
      className="relative flex h-[74svh] min-h-[520px] w-full items-end overflow-hidden bg-black md:h-[86svh] md:min-h-[560px]"
    >
      <LoopVideo
        src="/videos/hero.mp4"
        srcSmall="/videos/hero-sm.mp4"
        poster="/videos/hero.jpg"
        eager
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* 文字を読ませるための暗がり（下と左を濃く） */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-black/30 to-black/10 md:via-black/35 md:to-black/45"
        aria-hidden="true"
      />
      {/* 本人の写真：白黒にして、輪郭を楕円状にぼかし映像になじませる */}
      <img
        src="/images/profile/hero-portrait.jpg"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="pointer-events-none absolute top-14 right-0 h-[62%] w-[78%] object-cover object-[50%_25%] opacity-85 grayscale md:top-auto md:bottom-0 md:h-[94%] md:w-[44%] md:opacity-90"
        style={{
          maskImage:
            "radial-gradient(ellipse 58% 62% at 58% 48%, #000 38%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 58% 62% at 58% 48%, #000 38%, transparent 76%)",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
        <h1
          className="text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.15] font-bold tracking-tight text-white"
          style={{
            fontFamily:
              'var(--font-serif), "Hiragino Mincho ProN", "Yu Mincho", serif',
            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          }}
        >
          干川未来
          <span className="mt-1.5 block text-[0.52em] font-semibold tracking-normal text-white/90 md:mt-2">
            Mirai Hoshikawa
          </span>
        </h1>
        <p
          className="jp-phrase mt-6 text-[15px] leading-relaxed text-white/85 md:text-base"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}
        >
          {/* 「プログラム 2年」が行をまたがないよう、学年の前は改行しない空白にする */}
          {profile.university.replace(/ (\d+年)$/, "\u00a0$1")}
          <span className="mx-2 hidden text-white/50 sm:inline" aria-hidden="true">
            ／
          </span>
          <span className="block sm:inline">{profile.labs[0]}</span>
        </p>
        {/* 何をしている人か（自己紹介文の2文目をそのまま使う） */}
        <p
          className="jp-phrase mt-4 max-w-[36em] text-[15px] leading-[1.9] text-white/85 md:text-base"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.75)" }}
        >
          {LEAD}
        </p>
        <a
          href="#fields"
          className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] text-white/70 uppercase transition-colors hover:text-white"
        >
          Scroll
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

/** 3つのフィールドの入口。代表写真のタイルから、そのフィールドの作品へ移る */
export function FieldIndex() {
  return (
    <section
      id="fields"
      aria-label="3つのフィールド"
      className="scroll-mt-14 border-b border-[var(--border)]"
    >
      <div className="mx-auto grid max-w-7xl gap-4 px-6 pt-4 pb-16 sm:grid-cols-3 md:px-10 md:pb-20">
        {FIELDS.map((f) => (
          <a
            key={f.key}
            href={`#${f.key}`}
            className="group relative block aspect-[16/10] overflow-hidden bg-[var(--bg-alt)]"
          >
            <img
              src={f.image}
              alt={f.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-75 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-90"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-mono text-[12px] tracking-[0.12em] text-[var(--accent-ink)]">
                {f.num}
              </p>
              <p className="mt-1 text-xl font-bold tracking-tight text-white">
                {f.en}
                <span className="ml-2 text-[14px] font-medium text-white/80">
                  {f.jp}
                </span>
              </p>
              <p className="jp-phrase mt-1 text-[13px] leading-snug text-white/80">
                {FIELD_DESC[f.key]}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const FIELD_DESC: Record<string, string> = Object.fromEntries(
  FIELDS.map((f) => [f.key, profile.axes[f.axis].description])
);
