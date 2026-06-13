import { tools, equipment, type SkillCategory } from "@/data/skills";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolBadge } from "@/components/shared/ToolBadge";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading num="03" jp="技術・機材">
        Skills
      </SectionHeading>

      {/* Software & Tools */}
      <SkillGroup
        title="Software & Tools"
        jp="ソフトウェア"
        categories={tools}
      />

      {/* Equipment */}
      <div className="mt-20">
        <SkillGroup
          title="Equipment & Facilities"
          jp="扱える機材・設備"
          categories={equipment}
        />
      </div>
    </SectionWrapper>
  );
}

function SkillGroup({
  title,
  jp,
  categories,
}: {
  title: string;
  jp: string;
  categories: SkillCategory[];
}) {
  return (
    <div>
      <div className="mb-10 flex items-baseline gap-4">
        <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
          {title}
        </h3>
        <span className="text-xs text-[var(--text-mute)]">{jp}</span>
      </div>
      <div className="space-y-8">
        {categories.map((category) => (
          <div
            key={category.label}
            className="grid gap-4 md:grid-cols-[1fr_3fr] md:gap-12"
          >
            <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
              <span>{category.label}</span>
              {category.jp && (
                <span className="ml-2 normal-case tracking-normal text-[var(--text-mute)]">
                  {category.jp}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <ToolBadge key={item} name={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
