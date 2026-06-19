/* eslint-disable @next/next/no-img-element */
export function ToolBadge({ name, logo }: { name: string; logo?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-[var(--border)] py-1 pr-3 pl-2 text-xs tracking-wide text-[var(--text-sub)]">
      {logo && (
        <img
          src={`/images/logos/${logo}`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-4 w-4 shrink-0 rounded-[2px] object-contain"
        />
      )}
      {name}
    </span>
  );
}
