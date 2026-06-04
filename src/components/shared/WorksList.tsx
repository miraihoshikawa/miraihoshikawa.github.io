"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react";
import Link from "next/link";
import type { ProjectMeta, ProjectCategory } from "@/lib/content";

const FILTERS: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "research", label: "Research" },
  { key: "entertainment", label: "Entertainment" },
  { key: "implementation", label: "Implementation" },
];

export function WorksList({ projects }: { projects: ProjectMeta[] }) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [projects, active]
  );

  return (
    <>
      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--border)] pb-6">
        {FILTERS.map((f) => {
          const count =
            f.key === "all"
              ? projects.length
              : projects.filter((p) => p.category === f.key).length;
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`group flex items-baseline gap-1.5 text-[12px] tracking-wider uppercase transition-colors ${
                isActive
                  ? "text-[var(--text)]"
                  : "text-[var(--text-mute)] hover:text-[var(--text-sub)]"
              }`}
            >
              <span className={isActive ? "border-b border-[var(--text)] pb-1" : "pb-1"}>
                {f.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-mute)]">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <ul className="divide-y divide-[var(--border)]">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/works/${p.slug}/`}
              className="group grid grid-cols-1 gap-6 py-10 md:grid-cols-[1fr_2fr] md:gap-10 md:py-14"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-alt)]">
                {p.cover ? (
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-2xl text-[var(--text-mute)]">
                      {p.number}
                    </span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-4 text-[10px] font-mono tracking-[0.2em] text-[var(--text-mute)] uppercase">
                    <span>{p.number}</span>
                    <span>{p.year}</span>
                    <span>{p.category}</span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-tight tracking-tight text-[var(--text)] transition-colors group-hover:underline">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className="mt-1 text-sm text-[var(--text-sub)]">
                      {p.subtitle}
                    </p>
                  )}
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-sub)]">
                    {p.tagline}
                  </p>
                </div>
                {p.tools && p.tools.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
                    {p.tools.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono tracking-wider text-[var(--text-mute)] uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-[var(--text-sub)]">
          該当するプロジェクトがありません。
        </p>
      )}
    </>
  );
}
