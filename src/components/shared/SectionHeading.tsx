export function SectionHeading({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-[var(--text)]">
        {children}
      </h2>
      {sub && (
        <p className="mt-3 text-sm text-[var(--text-sub)]">{sub}</p>
      )}
    </div>
  );
}
