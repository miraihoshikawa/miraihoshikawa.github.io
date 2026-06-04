export function SectionHeading({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#e8e8e8] md:text-3xl">
        <span className="text-[#2a5aaa]">/</span> {children}
      </h2>
      {sub && <p className="mt-2 text-sm text-[#5a5a5a]">{sub}</p>}
    </div>
  );
}
