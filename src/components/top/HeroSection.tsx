import { getAllProjects } from "@/lib/content";
import { HeroCarousel } from "@/components/shared/HeroCarousel";

export function HeroSection() {
  const projects = getAllProjects();
  return (
    <section className="relative flex min-h-[88vh] items-center pt-14">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <HeroCarousel projects={projects} />
      </div>
    </section>
  );
}
