import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="mt-4 text-gray-500">ページが見つかりませんでした</p>
      <Link
        href="/"
        className="mt-6 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        トップに戻る
      </Link>
    </div>
  );
}
