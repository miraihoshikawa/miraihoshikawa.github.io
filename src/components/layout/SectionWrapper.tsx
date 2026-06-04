export function SectionWrapper({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-16 md:px-6 ${className}`}>
      {children}
    </section>
  );
}
