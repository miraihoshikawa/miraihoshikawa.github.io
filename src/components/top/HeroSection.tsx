/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="flex min-h-screen items-center pt-14">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-0 px-4 md:px-6">
        {/* Left: Text */}
        <div className="flex-1 py-12 md:pl-[6vw]">
          <p className="text-[10px] tracking-[6px] text-[#2a5aaa] uppercase">
            Portfolio
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#e8e8e8] md:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-xs tracking-[4px] text-[#5a5a5a]">
            {profile.nameEn}
          </p>
          <p className="mt-1.5 text-xs text-[#5a5a5a]">
            {profile.university}
          </p>
          <p className="mt-5 max-w-[360px] text-sm leading-8 text-[#5a5a5acc]">
            {profile.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.axes.map((a) => (
              <span
                key={a.label}
                className="rounded border border-[#2a2a2a] px-2.5 py-1 text-[9px] text-[#5a5a5a]"
              >
                {a.label}
              </span>
            ))}
          </div>
        </div>

        {/* Floating blue line */}
        <div className="hidden md:block w-px h-[180px] bg-[#2a5aaa] opacity-40 shrink-0 mx-8" />

        {/* Right: Photo */}
        <div className="hidden md:block relative shrink-0">
          <img
            src="/images/profile/portrait.jpeg"
            alt={profile.name}
            className="w-[200px] h-[260px] object-cover rounded"
          />
          <div className="absolute inset-0 rounded bg-gradient-to-b from-transparent from-60% to-[#1a3a6a66]" />
        </div>
      </div>
    </section>
  );
}
