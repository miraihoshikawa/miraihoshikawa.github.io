/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  const imgSrc = project.cover;

  return (
    <Link
      href={`/works/${project.slug}`}
      className="group block overflow-hidden rounded-md border border-[#2a2a2a] bg-[#161616] transition-colors hover:border-[#2a5aaa]"
    >
      <div className="relative h-[180px] overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={project.title}
            className="h-full w-full object-cover brightness-50 transition-all group-hover:brightness-[0.6]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#1e1e1e]">
            <svg className="h-6 w-6 text-[#5a5a5a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1" />
              <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1" />
              <path d="m21 15-5-5L5 21" strokeWidth="1" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="font-mono text-[10px] text-[#2a5aaa]">{project.number}</span>
        <h3 className="mt-1 text-sm font-semibold text-[#e8e8e8] group-hover:text-[#e8e8e8]">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-[#5a5a5a] line-clamp-2">
          {project.tagline}
        </p>
        {project.category === "research" && (
          <span className="mt-2 inline-block rounded border border-[#2a5aaa50] px-1.5 py-0.5 text-[9px] text-[#2a5aaa]">
            Research
          </span>
        )}
      </div>
    </Link>
  );
}
