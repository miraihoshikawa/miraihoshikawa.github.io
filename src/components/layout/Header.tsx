"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Works", href: "/works/" },
  { label: "Skills", href: "/skills/" },
  { label: "Operations", href: "/operations/" },
  { label: "Contact", href: "/#contact" },
];

/** 作品画像の帯と背景の泡を止める（WCAG 2.2.2）。状態は次回も引き継ぐ */
function useMotionPaused() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    setPaused(document.documentElement.classList.contains("motion-paused"));
  }, []);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.documentElement.classList.toggle("motion-paused", next);
    try {
      localStorage.setItem("motion-paused", next ? "1" : "0");
    } catch {}
  };
  return [paused, toggle] as const;
}

function MotionIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5z" />
    </svg>
  ) : (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5h2.5v11H4zM9.5 2.5H12v11H9.5z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [paused, toggleMotion] = useMotionPaused();
  const motionLabel = paused ? "動きを再生" : "動きを一時停止";
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="text-[13px] font-bold tracking-wider text-[var(--text)] uppercase"
        >
          Mirai Hoshikawa
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const cls = `text-[12px] tracking-wider uppercase transition-colors ${
              isActive(item.href)
                ? "text-[var(--accent-ink)]"
                : "text-[var(--text-sub)] hover:text-[var(--text)]"
            }`;
            return item.href.startsWith("/#") ? (
              <a key={item.href} href={item.href} className={cls}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={cls}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={toggleMotion}
          aria-pressed={paused}
          aria-label={motionLabel}
          title={motionLabel}
          className="flex h-8 w-8 items-center justify-center text-[var(--text-sub)] transition-colors hover:text-[var(--text)]"
        >
          <MotionIcon paused={paused} />
        </button>
        <button
          className="md:hidden p-2 text-[var(--text)]"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-4 md:hidden"
        >
          {navItems.map((item) => {
            const cls = `block py-2 text-[12px] tracking-wider uppercase ${
              isActive(item.href)
                ? "text-[var(--accent-ink)]"
                : "text-[var(--text-sub)] hover:text-[var(--text)]"
            }`;
            return item.href.startsWith("/#") ? (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cls}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cls}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={paused}
            className="mt-2 flex items-center gap-2 border-t border-[var(--border)] pt-4 text-[13px] text-[var(--text-sub)] hover:text-[var(--text)]"
          >
            <MotionIcon paused={paused} />
            {paused ? "背景の動きを再生" : "背景の動きを一時停止"}
          </button>
        </nav>
      )}
    </header>
  );
}
