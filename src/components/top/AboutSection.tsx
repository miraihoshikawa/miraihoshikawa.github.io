/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading>About</SectionHeading>

      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <img
            src="/images/profile/portrait.jpeg"
            alt={profile.name}
            className="aspect-[4/5] w-full max-w-xs object-cover grayscale"
          />
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-[var(--text)]">
              {profile.name}
            </h3>
            <p className="mt-1 text-sm tracking-wide text-[var(--text-sub)]">
              {profile.nameEn}
            </p>
            <p className="mt-4 text-sm text-[var(--text-sub)]">
              {profile.university}
            </p>
            <ul className="mt-2 space-y-0.5 text-sm text-[var(--text-sub)]">
              {profile.labs.map((lab) => (
                <li key={lab}>— {lab}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
              3つの活動軸
            </p>
            <div className="mt-4 grid gap-px bg-[var(--border)] sm:grid-cols-3">
              {profile.axes.map((axis) => (
                <div
                  key={axis.label}
                  className="bg-[var(--bg)] p-5"
                >
                  <p className="text-sm font-bold text-[var(--text)]">
                    {axis.label}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-sub)]">
                    {axis.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-[var(--text-sub)]">
            <span>
              <span className="text-[var(--text-mute)] uppercase tracking-wider">出身 / </span>
              {profile.hometown}
            </span>
            <span>
              <span className="text-[var(--text-mute)] uppercase tracking-wider">趣味 / </span>
              {profile.hobbies.join("、")}
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
