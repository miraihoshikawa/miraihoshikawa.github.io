export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
          © 2026 Mirai Hoshikawa
        </p>
        <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
