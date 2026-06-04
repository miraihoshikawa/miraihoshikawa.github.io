/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-center pt-14">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          {/* Left: Text */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Portfolio · 2026
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-bold tracking-tight text-[var(--text)]">
              {profile.nameEn}
            </h1>
            <p className="mt-2 text-sm tracking-wide text-[var(--text-sub)]">
              {profile.name} · {profile.university}
            </p>
            <p className="mt-10 max-w-xl text-base leading-loose text-[var(--text-sub)]">
              {profile.tagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {profile.axes.map((a) => (
                <span
                  key={a.label}
                  className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-mute)] uppercase"
                >
                  / {a.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="hidden md:block">
            <img
              src="/images/profile/portrait.jpeg"
              alt={profile.name}
              className="aspect-[4/5] w-full object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
