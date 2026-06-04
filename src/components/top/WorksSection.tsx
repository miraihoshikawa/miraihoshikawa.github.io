import { getAllProjects } from "@/lib/content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";

export function WorksSection() {
  const projects = getAllProjects();
  return (
    <section id="works" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionHeading sub="研究・エンタメ・実装の3フィールドを横断するプロジェクト">
        Works
      </SectionHeading>
      {/* Offset 2-column grid (Plan 9 style) */}
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <div key={project.slug} style={{ marginTop: i % 2 === 1 ? 60 : 0 }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
