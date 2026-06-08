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
      <div className="mb-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-b border-[var(--border)] pb-6">
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
              className={`group relative flex items-baseline gap-1.5 text-[12px] tracking-wider uppercase transition-colors ${
                isActive
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-mute)] hover:text-[var(--text)]"
              }`}
            >
              <span
                className={`pb-1.5 transition-all ${
                  isActive
                    ? "border-b-2 border-[var(--accent)]"
                    : "border-b-2 border-transparent group-hover:border-[var(--text-mute)]"
                }`}
              >
                {f.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-mute)]">
                ({String(count).padStart(2, "0")})
              </span>
            </button>
          );
        })}
      </div>

      {/* 2-column grid (yamaguchi style) */}
      <ul className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-x-10 md:gap-y-20">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link href={`/works/${p.slug}/`} className="group block">
              {/* Image dominates */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-alt)]">
                {p.cover ? (
                  <img
                    src={p.cover}
                    alt={p.title}
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
                  <span className="text-[var(--accent)]">/ {p.number}</span>
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
