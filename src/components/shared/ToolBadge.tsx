export function ToolBadge({ name }: { name: string }) {
  return (
    <span className="inline-block border border-[var(--border)] px-3 py-1 text-xs tracking-wide text-[var(--text-sub)]">
      {name}
    </span>
  );
}
