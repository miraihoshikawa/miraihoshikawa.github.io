import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        {/* Big mark */}
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-10">
          {/* Identity */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] text-[var(--text-mute)] uppercase">
              Portfolio · 2026
            </p>
            <p className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] leading-none font-bold tracking-tight text-[var(--text)]">
              Mirai Hoshikawa
            </p>
            <p className="mt-1 text-sm text-[var(--text-sub)]">
              {profile.name}
            </p>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-[var(--text-sub)]">
              {profile.university}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
              Navigate
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-sub)]">
              <li>
                <Link href="/#works" className="transition-colors hover:text-[var(--text)]">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/articles" className="transition-colors hover:text-[var(--text)]">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/#about" className="transition-colors hover:text-[var(--text)]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="transition-colors hover:text-[var(--text)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Focus */}
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
              Focus
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-sub)]">
              <li>Research</li>
              <li>Entertainment</li>
              <li>Implementation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
              Contact
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="break-all text-sm text-[var(--text-sub)] transition-colors hover:text-[var(--text)]"
            >
              {profile.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--border)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
            © 2026 Mirai Hoshikawa. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
            Built with Next.js · Hosted on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
