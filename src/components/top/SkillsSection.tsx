import { skills } from "@/data/skills";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolBadge } from "@/components/shared/ToolBadge";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading num="03" jp="技術・ツール">
        Skills
      </SectionHeading>
      <div className="space-y-10">
        {skills.map((category) => (
          <div
            key={category.label}
            className="grid gap-4 md:grid-cols-[1fr_3fr] md:gap-12"
          >
            <h3 className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <ToolBadge key={item} name={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
