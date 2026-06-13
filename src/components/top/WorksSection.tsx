import { getAllProjects } from "@/lib/content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WorksList } from "@/components/shared/WorksList";

export function WorksSection() {
  const projects = getAllProjects();
  return (
    <section
      id="works"
      className="border-t border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          num="02"
          jp="作品"
          sub="研究・エンタメ・実装の3フィールドを横断するプロジェクト。"
        >
          Works
        </SectionHeading>
        <WorksList projects={projects} />
      </div>
    </section>
  );
}
