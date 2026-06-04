export function PlaceholderImage({
  aspectRatio = "16/9",
  label,
  className = "",
}: {
  aspectRatio?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-200 text-gray-400 ${className}`}
      style={{ aspectRatio }}
    >
      <div className="text-center">
        <svg
          className="mx-auto h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
          />
        </svg>
        {label && <p className="mt-1 text-xs">{label}</p>}
      </div>
    </div>
  );
}
