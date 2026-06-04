export function ToolBadge({ name }: { name: string }) {
  return (
    <span className="inline-block rounded border border-[#2a5aaa50] px-3 py-1 text-sm text-[#2a5aaa]">
      {name}
    </span>
  );
}
