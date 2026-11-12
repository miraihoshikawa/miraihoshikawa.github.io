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
  num?: string | null;
  serif?: boolean;
  as?: "h1" | "h2" | "h3";
  titleClassName?: string;
}) {
  return (
    <div className="mb-12 reveal md:mb-16">
      {num && (
        <p className="mb-4 font-mono text-[12px] tracking-[0.12em] text-[var(--accent-ink)] uppercase">
          [{num}]
        </p>
      )}
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <Heading
          className={`${titleClassName} leading-[1.15] font-bold tracking-tight text-[var(--text)] md:leading-none`}
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
