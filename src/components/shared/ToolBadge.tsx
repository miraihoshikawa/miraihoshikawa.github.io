/* eslint-disable @next/next/no-img-element */
export function ToolBadge({
  name,
  logo,
  large = false,
}: {
  name: string;
  logo?: string;
  large?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-[var(--border)] py-1 pr-3 pl-2 tracking-wide text-[var(--text-sub)] ${
        large ? "text-base" : "text-xs"
      }`}
    >
      {logo && (
        <img
          src={`/images/logos/${logo}`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={`${
            large ? "h-5 w-5" : "h-4 w-4"
          } shrink-0 object-contain`}
        />
      )}
      {name}
    </span>
  );
}
