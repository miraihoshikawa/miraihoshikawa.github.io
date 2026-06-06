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

      {/* List */}
      <ul className="divide-y divide-[var(--border)]">
        {filtered.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/works/${p.slug}/`}
              className="group grid grid-cols-[auto_1fr] gap-4 py-10 md:grid-cols-[60px_1fr_2fr] md:gap-10 md:py-16"
            >
              {/* Number column */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase">
                  / {p.number}
                </span>
              </div>

              {/* Image */}
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden bg-[var(--bg-alt)] md:col-span-1 md:aspect-[4/3]">
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
                {/* hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[var(--accent)] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10" />
              </div>

              {/* Text */}
              <div className="col-span-2 flex flex-col justify-between md:col-span-1">
                <div>
                  <div className="flex items-baseline gap-4 font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
                    <span>{p.year}</span>
                    <span>{p.category}</span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.4rem,2.8vw,2rem)] font-bold leading-[1.15] tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className="mt-2 text-sm text-[var(--text-sub)]">
                      {p.subtitle}
                    </p>
                  )}
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-body)]">
                    {p.tagline}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {p.tools && p.tools.length > 0 ? (
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {p.tools.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] tracking-wider text-[var(--text-mute)] uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span />
                  )}
                  <span className="font-mono text-[11px] tracking-wider text-[var(--text-mute)] uppercase opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-[var(--accent)]">
                    View →
                  </span>
                </div>
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
