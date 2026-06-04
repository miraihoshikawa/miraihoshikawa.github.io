import { getAllProjects } from "@/lib/content";
import { WorksList } from "@/components/shared/WorksList";

export function WorksSection() {
  const projects = getAllProjects();
  return (
    <section
      id="works"
      className="border-t border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <header className="mb-16 flex items-baseline justify-between">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            Works
          </h2>
          <p className="hidden text-xs tracking-wider text-[var(--text-sub)] uppercase md:block">
            {projects.length} projects
          </p>
        </header>

        <WorksList projects={projects} />
      </div>
    </section>
  );
}
