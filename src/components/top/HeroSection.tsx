import { getAllProjects } from "@/lib/content";
import { HeroCarousel } from "@/components/shared/HeroCarousel";

export function HeroSection() {
  const projects = getAllProjects();
  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <HeroCarousel projects={projects} />
      </div>
    </section>
  );
}
