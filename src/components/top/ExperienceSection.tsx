import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading>Experience</SectionHeading>
      <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {profile.experiences.map((exp) => (
          <li
            key={exp.company}
            className="flex flex-col gap-1 py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-[var(--text)]">
                {exp.company}
              </h3>
              <p className="mt-0.5 text-sm text-[var(--text-sub)]">{exp.role}</p>
            </div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-mute)] uppercase">
              {exp.type}
            </span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
