/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading num="02" jp="自己紹介" sub="研究と表現の境界で、人と環境のあいだに立つシステムを考える。">
        About
      </SectionHeading>

      {/* Top: portrait + bio */}
      <div className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
        <div>
          <img
            src="/images/profile/portrait.jpeg"
            alt={profile.name}
            className="aspect-[4/5] w-full max-w-xs object-cover grayscale"
          />
          <div className="mt-6">
            <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
              {profile.name}
            </h3>
            <p className="mt-1 text-sm tracking-wide text-[var(--text-mute)]">
              {profile.nameEn}
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {/* Bio */}
          <p className="text-base leading-loose text-[var(--text-body)] md:text-lg">
            {profile.bio}
          </p>

          {/* Affiliation block */}
          <div className="border-l-2 border-[var(--accent)] pl-6">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Current Affiliation
            </p>
            <p className="mt-2 text-sm text-[var(--text-body)]">
              {profile.university}
            </p>
            <ul className="mt-2 space-y-0.5 text-sm text-[var(--text-sub)]">
              {profile.labs.map((lab) => (
                <li key={lab}>— {lab}</li>
              ))}
            </ul>
          </div>

          {/* 3 axes */}
          <div>
            <p className="mb-5 font-mono text-[10px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Three Fields
            </p>
            <div className="grid gap-px bg-[var(--border)] sm:grid-cols-3">
              {profile.axes.map((axis) => (
                <div key={axis.label} className="bg-[var(--bg)] p-5">
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

          {/* Meta */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-[var(--text-sub)]">
            <span>
              <span className="font-mono uppercase tracking-wider text-[var(--text-mute)]">
                Hometown /{" "}
              </span>
              {profile.hometown}
            </span>
            <span>
              <span className="font-mono uppercase tracking-wider text-[var(--text-mute)]">
                Hobbies /{" "}
              </span>
              {profile.hobbies.join("、")}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-24 border-t border-[var(--border)] pt-16">
        <p className="mb-10 font-mono text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
          Timeline · 年表
        </p>
        <div className="space-y-10">
          {profile.timeline.map((entry) => (
            <div
              key={entry.year}
              className="grid gap-3 md:grid-cols-[120px_1fr] md:gap-12"
            >
              <p className="font-mono text-xl font-bold tracking-tight text-[var(--text)]">
                {entry.year}
              </p>
              <ul className="space-y-2">
                {entry.events.map((e) => (
                  <li
                    key={e}
                    className="text-sm leading-relaxed text-[var(--text-body)]"
                  >
                    — {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
