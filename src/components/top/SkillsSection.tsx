import { skills } from "@/data/skills";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolBadge } from "@/components/shared/ToolBadge";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading>Skills &amp; Tools</SectionHeading>
      <div className="space-y-6">
        {skills.map((category) => (
          <div key={category.label}>
            <h3 className="mb-2 text-sm font-semibold text-[#5a5a5a] uppercase tracking-wider">
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
