import { getAllProjects } from "@/lib/content";
import { HeroCarousel } from "@/components/shared/HeroCarousel";

export function HeroSection() {
  const projects = getAllProjects();
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Brand mark */}
        <div className="mb-10 flex items-baseline justify-between fade-up">
          <p className="font-mono text-[10px] tracking-[0.4em] text-[var(--text-mute)] uppercase">
            Portfolio · 2026
          </p>
          <p className="font-mono text-[10px] tracking-[0.4em] text-[var(--text-mute)] uppercase hidden sm:block">
            Research · Entertainment · Implementation
          </p>
        </div>
        {/* Carousel */}
        <div className="mx-auto max-w-5xl fade-up fade-up-d1">
          <HeroCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
}
