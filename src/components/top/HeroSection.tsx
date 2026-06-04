import { profile } from "@/data/profile";
import { getAllProjects } from "@/lib/content";
import { HeroCarousel } from "@/components/shared/HeroCarousel";

export function HeroSection() {
  const projects = getAllProjects();
  return (
    <section className="relative flex min-h-[88vh] items-center pt-14">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          {/* Left: Text */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Portfolio · 2026
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-tight text-[var(--text)]">
              {profile.nameEn}
            </h1>
            <p className="mt-2 text-sm tracking-wide text-[var(--text-sub)]">
              {profile.name}
            </p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--text-sub)]">
              {profile.university}
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

          {/* Right: Project Carousel */}
          <div>
            <HeroCarousel projects={projects} />
          </div>
        </div>
      </div>
    </section>
  );
}
