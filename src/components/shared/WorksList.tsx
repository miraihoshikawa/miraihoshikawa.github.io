/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";
import { TeamBadge, Tag } from "@/components/shared/TeamBadge";
import { LoopVideo } from "@/components/shared/LoopVideo";

const CATEGORY_LABEL: Record<string, string> = {
  research: "研究",
  entertainment: "エンタメ",
  implementation: "実装",
};

/** 作品の区分を日本語で（複数あれば / でつなぐ） */
export function categoryText(p: ProjectMeta) {
  const cats = p.categories && p.categories.length ? p.categories : [p.category];
  return cats.map((c) => CATEGORY_LABEL[c] ?? c).join(" / ");
}

type Variant = "default" | "large" | "wide";

/**
 * 作品カード。clip があれば短いループ動画、無ければ画像（2枚重ね・単一・カバー）。
 * wide＝注目作品用の横長（左に大きな映像、右に説明）。
 */
export function WorkCard({
  p,
  variant = "default",
}: {
  p: ProjectMeta;
  variant?: Variant;
}) {
  const wide = variant === "wide";
  const media = (
    <div
      className={`relative overflow-hidden bg-[var(--bg-alt)] ${
        wide ? "aspect-[16/9]" : variant === "large" ? "aspect-[16/10]" : "aspect-[4/3]"
      }`}
    >
      {p.clip ? (
        <LoopVideo
          src={p.clip}
          poster={p.clipPoster ?? p.cover}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <CardImage p={p} />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[var(--accent)] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10" />
    </div>
  );

  const text = (
    <div className={wide ? "md:py-2" : variant === "large" ? "mt-6" : "mt-5"}>
      <p className="text-[13px] tracking-[0.04em] text-[var(--text-sub)]">
        <span className="font-mono">{p.year}</span>
        <span className="mx-2 text-[var(--text-mute)]" aria-hidden="true">
          ·
        </span>
        {categoryText(p)}
      </p>
      <h3
        className={`mt-2 font-bold leading-snug tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent-ink)] ${
          wide
            ? "text-[clamp(1.75rem,3vw,2.25rem)]"
            : variant === "large"
              ? "text-2xl md:text-[1.75rem]"
              : "text-lg md:text-xl"
        }`}
      >
        {p.title}
      </h3>
      {p.subtitle && (
        <p
          className={`jp-phrase mt-1.5 leading-relaxed text-[var(--text-sub)] ${
            wide || variant === "large" ? "text-base" : "text-[15px]"
          }`}
        >
          {p.subtitle}
        </p>
      )}
      {wide && p.tagline && (
        <p className="mt-5 text-[15px] leading-[1.9] text-[var(--text-body)]">
          {p.tagline}
        </p>
      )}
      {p.highlight && (
        <p className="jp-phrase mt-3 flex items-start gap-2 text-[14px] leading-snug text-[var(--text-body)]">
          <span
            className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]"
            aria-hidden="true"
          />
          {p.highlight}
        </p>
      )}
      {(p.teamType || p.tags?.length) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.teamType && <TeamBadge type={p.teamType} />}
          {p.tags?.map((t) => <Tag key={t} label={t} />)}
        </div>
      )}
      {wide && (
        <p className="mt-6 text-[14px] text-[var(--accent-ink)]">作品を見る →</p>
      )}
    </div>
  );

  return (
    <Link
      href={`/works/${p.slug}/`}
      className={`group block ${
        wide ? "grid items-center gap-8 md:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] md:gap-12" : ""
      }`}
    >
      {media}
      {text}
    </Link>
  );
}

export function CardImage({ p }: { p: ProjectMeta }) {
  if (p.cardImages && p.cardImages.length === 2) {
    return (
      <>
        {/* 空いた角を埋める、前面画像のぼかし（暗く沈めて地になじませる） */}
        <img
          src={p.cardImages[0]}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-3xl brightness-50 saturate-150"
        />
        {/* 背面・右上 */}
        <img
          src={p.cardImages[1]}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="absolute top-0 right-0 h-[62%] w-[62%] object-cover transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
        />
        {/* 前面・左下（内側コーナーをフェードして重なりを自然に） */}
        <img
          src={p.cardImages[0]}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="card-duo-blend absolute bottom-0 left-0 z-10 h-[62%] w-[62%] object-cover drop-shadow-md transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:translate-y-1"
        />
      </>
    );
  }
  if (p.cardImages && p.cardImages.length === 1) {
    const contain = p.cardFit === "contain";
    return (
      <>
        {contain && (
          <img
            src={p.cardImages[0]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-3xl brightness-50 saturate-150"
          />
        )}
        <img
          src={p.cardImages[0]}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className={`relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            contain ? "object-contain" : "object-cover"
          }`}
        />
      </>
    );
  }
  if (p.cover) {
    return (
      <img
        src={p.cover}
        alt={p.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <div className="flex h-full items-center justify-center">
      <span className="font-mono text-3xl text-[var(--text-mute)]">
        {p.number}
      </span>
    </div>
  );
}
