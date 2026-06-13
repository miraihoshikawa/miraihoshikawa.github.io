"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Works", href: "/#works" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="text-[13px] font-bold tracking-wider text-[var(--text)] uppercase"
        >
          Mirai Hoshikawa
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[12px] tracking-wider text-[var(--text-sub)] uppercase transition-colors hover:text-[var(--text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-[var(--text)]"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
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

      {open && (
        <nav className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-[12px] tracking-wider text-[var(--text-sub)] uppercase hover:text-[var(--text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
