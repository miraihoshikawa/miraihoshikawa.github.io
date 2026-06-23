export function SectionHeading({
  children,
  jp,
  sub,
  num,
  serif = false,
  as: Heading = "h2",
  titleClassName = "text-[clamp(2rem,4.5vw,3.25rem)]",
}: {
  children: React.ReactNode;
  jp?: string;
  sub?: string;
  num?: string;
  serif?: boolean;
  as?: "h1" | "h2" | "h3";
  titleClassName?: string;
}) {
  return (
    <div className="mb-16 reveal">
      {num && (
        <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
          [{num}]
        </p>
      )}
      <div className="flex items-baseline gap-6">
        <Heading
          className={`${titleClassName} leading-none font-bold tracking-tight text-[var(--text)]`}
          style={
            serif
              ? {
                  fontFamily:
                    'var(--font-serif), "Hiragino Mincho ProN", "Yu Mincho", serif',
                }
              : undefined
          }
        >
          {children}
        </Heading>
        {jp && (
          <span className="text-base font-medium text-[var(--text-mute)] tracking-wider">
            {jp}
          </span>
        )}
      </div>
      {sub && (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--text-sub)]">
          {sub}
        </p>
      )}
    </div>
  );
}
