import { SectionHeading } from "@/components/shared/SectionHeading";
import { WorksByField } from "@/components/shared/WorksByField";

/** 作品一覧（/works）。研究・エンタメ・実装のフィールドごとに並べる */
export function WorksSection({
  headingAs = "h2",
  num = null,
}: {
  headingAs?: "h1" | "h2";
  num?: string | null;
}) {
  return (
    <section id="works" className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          num={num}
          jp="作品"
          as={headingAs}
          sub="研究・エンタメ・実装の3フィールドを横断するプロジェクト。"
        >
          Works
        </SectionHeading>
        <WorksByField headingAs="h2" />
      </div>
    </section>
  );
}
