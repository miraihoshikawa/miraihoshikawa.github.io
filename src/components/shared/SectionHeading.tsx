export function SectionHeading({
  children,
  jp,
  sub,
  num,
}: {
  children: React.ReactNode;
  jp?: string;
  sub?: string;
  num?: string;
}) {
  return (
    <div className="mb-16 fade-up">
      {num && (
        <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
          [{num}]
        </p>
      )}
      <div className="flex items-baseline gap-6">
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] leading-none font-bold tracking-tight text-[var(--text)]">
          {children}
        </h2>
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
