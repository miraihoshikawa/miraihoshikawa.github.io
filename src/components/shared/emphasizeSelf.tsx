/** 論文の著者表記のうち、自分の名前だけを太字にする */
export function emphasizeSelf(text: string) {
  return text.split(/(Mirai Hoshikawa|干川未来)/).map((part, i) =>
    part === "Mirai Hoshikawa" || part === "干川未来" ? (
      <strong key={i} className="font-bold text-[var(--text)]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}
