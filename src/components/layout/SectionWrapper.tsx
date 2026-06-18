export function SectionWrapper({
  id,
  children,
  className = "",
  noBorder = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${noBorder ? "" : "border-t border-[var(--border)]"} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        {children}
      </div>
    </section>
  );
}
