import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading>Experience</SectionHeading>
      <div className="space-y-4">
        {profile.experiences.map((exp) => (
          <div
            key={exp.company}
            className="flex flex-col gap-1 rounded border border-[#2a2a2a] bg-[#161616] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-sm font-semibold text-[#e8e8e8]">
                {exp.company}
              </h3>
              <p className="text-sm text-[#5a5a5a]">{exp.role}</p>
            </div>
            <span className="inline-block self-start rounded border border-[#2a2a2a] px-2 py-0.5 text-xs text-[#5a5a5a]">
              {exp.type}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
