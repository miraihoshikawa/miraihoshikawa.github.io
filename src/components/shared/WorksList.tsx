/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";
import { TeamBadge, Tag } from "@/components/shared/TeamBadge";

export function WorksList({ projects }: { projects: ProjectMeta[] }) {
  return (
    <>
      {/* 3-column grid */}
      <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/works/${p.slug}/`} className="group block">
              {/* Image dominates */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-alt)]">
                {p.cardImages && p.cardImages.length === 2 ? (
                  <>
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
                ) : p.cardImages && p.cardImages.length === 1 ? (
                  <img
                    src={p.cardImages[0]}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                      p.cardFit === "contain" ? "object-contain" : "object-cover"
                    }`}
                  />
                ) : p.cover ? (
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-3xl text-[var(--text-mute)]">
                      {p.number}
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-[var(--accent)] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10" />
              </div>

              {/* Caption (minimal yamaguchi style) */}
              <div className="mt-5">
                <div className="flex items-baseline gap-3 font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
                  <span>/ {p.number}</span>
                  <span>{p.year}</span>
                  <span>{p.category}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)] md:text-xl">
                  {p.title}
                </h3>
                {p.subtitle && (
                  <p className="mt-1 text-sm text-[var(--text-sub)]">
                    {p.subtitle}
                  </p>
                )}
                {(p.teamType || p.tags?.length) && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.teamType && <TeamBadge type={p.teamType} />}
                    {p.tags?.map((t) => <Tag key={t} label={t} />)}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
