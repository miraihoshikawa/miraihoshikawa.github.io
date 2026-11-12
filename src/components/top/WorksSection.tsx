import { getAllProjects } from "@/lib/content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WorksList } from "@/components/shared/WorksList";

export function WorksSection({
  headingAs = "h2",
  num = "02",
}: {
  headingAs?: "h1" | "h2";
  num?: string | null;
}) {
  const projects = getAllProjects();
  return (
    <section
      id="works"
      className="border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          num={num}
          jp="作品"
          as={headingAs}
          sub="研究・エンタメ・実装の3フィールドを横断するプロジェクト。"
        >
          Works
        </SectionHeading>
        <WorksList projects={projects} />
      </div>
    </section>
  );
}
