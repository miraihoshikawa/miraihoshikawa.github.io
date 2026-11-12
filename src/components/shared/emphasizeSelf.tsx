/** 論文の著者表記のうち、自分の名前だけを太字＋下線にする */
export function emphasizeSelf(text: string) {
  return text.split(/(Mirai Hoshikawa|干川未来)/).map((part, i) =>
    part === "Mirai Hoshikawa" || part === "干川未来" ? (
      <strong
        key={i}
        className="font-bold text-[var(--text)] underline decoration-[var(--accent-ink)] decoration-1 underline-offset-[3px]"
      >
        {part}
      </strong>
    ) : (
      part
    )
  );
}
