/**
 * 制作体制（個人 / チーム）を示す小さなタグ。ToolBadge と同系のピル表示。
 * チームはアクセント色で軽く差別化する。
 */
export function TeamBadge({
  type,
  className = "",
}: {
  type: "個人" | "チーム";
  className?: string;
}) {
  const isTeam = type === "チーム";
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-[11px] tracking-wider ${
        isTeam
          ? "border-[var(--accent)] text-[var(--accent)]"
          : "border-[var(--border)] text-[var(--text-sub)]"
      } ${className}`}
    >
      {type === "個人" ? "個人制作" : "チーム制作"}
    </span>
  );
}

/**
 * 作品の文脈タグ（例: 修士課程研究 / 長期インターン / 採択枠 など）。
 * 制作体制タグと同系のニュートラルなピル表示。
 */
export function Tag({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center border border-[var(--border)] px-2 py-0.5 text-[11px] tracking-wider text-[var(--text-sub)] ${className}`}
    >
      {label}
    </span>
  );
}
