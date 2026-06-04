"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Works", href: "/#works" },
  { label: "Articles", href: "/articles" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#2a2a2a] bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-sm font-bold text-[#e8e8e8]">
          干川 未来
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#5a5a5a] transition-colors hover:text-[#e8e8e8]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-[#5a5a5a]"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-[#2a2a2a] bg-[#0a0a0a] px-4 py-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-[#5a5a5a] hover:text-[#e8e8e8]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
