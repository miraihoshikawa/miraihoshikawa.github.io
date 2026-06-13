/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading num="01" jp="自己紹介" sub="研究と表現の境界で、人と環境のあいだに立つシステムを考える。">
        About
      </SectionHeading>

      {/* Top: portrait + content */}
      <div className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
        <div>
          <img
            src="/images/profile/portrait.jpeg"
            alt={profile.name}
            loading="lazy"
            decoding="async"
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
          {/* Affiliation block (上) */}
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

            {/* Experience を小さく併記 */}
            <p className="mt-5 font-mono text-[10px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Experience
            </p>
            <ul className="mt-2 space-y-0.5 text-xs text-[var(--text-sub)]">
              {profile.experiences.map((exp) => (
                <li key={exp.company}>
                  — {exp.company}　{exp.role}
                </li>
              ))}
            </ul>
          </div>

          {/* Bio (下・Affiliationと同じくらいのサイズ) */}
          <p className="text-sm leading-relaxed text-[var(--text-body)]">
            {profile.bio}
          </p>

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

      {/* History */}
      <div className="mt-24 space-y-16 border-t border-[var(--border)] pt-16">
        {/* Education */}
        <HistoryBlock title="Education" jp="学歴">
          <ul className="divide-y divide-[var(--border)]">
            {profile.history.education.map((e) => (
              <li
                key={e}
                className="py-3 text-sm leading-relaxed text-[var(--text-body)]"
              >
                {e}
              </li>
            ))}
          </ul>
        </HistoryBlock>

        {/* Publications */}
        <HistoryBlock title="Publications" jp="研究発表">
          <ol className="space-y-4">
            {profile.history.publications.map((p, i) => (
              <li
                key={p.text}
                className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-[var(--text-body)]"
              >
                <span className="font-mono text-[12px] text-[var(--text-mute)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  {p.text}
                  {p.url && (
                    <>
                      {" "}
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] underline underline-offset-2 hover:opacity-70"
                      >
                        [link]
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </HistoryBlock>

        {/* Exhibitions */}
        <HistoryBlock title="Exhibitions" jp="展示">
          <ul className="divide-y divide-[var(--border)]">
            {profile.history.exhibitions.map((item) => (
              <li
                key={item.date + item.text}
                className="grid gap-1 py-3 text-sm leading-relaxed sm:grid-cols-[80px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[12px] text-[var(--text-mute)]">
                  {item.date}
                </span>
                <span className="text-[var(--text-body)]">{item.text}</span>
              </li>
            ))}
          </ul>
        </HistoryBlock>

        {/* Operations */}
        <HistoryBlock title="Operations" jp="配信・現場運用">
          {/* Big number */}
          <div className="mb-8 flex items-baseline gap-4">
            <span className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tight text-[var(--accent)]">
              {profile.history.operations.summaryCount}
            </span>
            <span className="text-xs text-[var(--text-mute)]">
              {profile.history.operations.summaryNote}
            </span>
          </div>

          {/* Venues */}
          <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
            主な配信現場（自作システム運用を含む）
          </p>
          <ul className="mb-8 grid gap-x-8 gap-y-1.5 text-sm text-[var(--text-body)] sm:grid-cols-2">
            {profile.history.operations.venues.map((v) => (
              <li key={v}>— {v}</li>
            ))}
          </ul>

          {/* Highlights */}
          <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
            主なピッチ・ビジネスイベント
          </p>
          <ul className="divide-y divide-[var(--border)]">
            {profile.history.operations.highlights.map((item) => (
              <li
                key={item.date + item.text}
                className="grid gap-1 py-3 text-sm leading-relaxed sm:grid-cols-[80px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[12px] text-[var(--text-mute)]">
                  {item.date}
                </span>
                <span className="text-[var(--text-body)]">{item.text}</span>
              </li>
            ))}
          </ul>
        </HistoryBlock>
      </div>
    </SectionWrapper>
  );
}

function HistoryBlock({
  title,
  jp,
  children,
}: {
  title: string;
  jp: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
      <div className="flex items-baseline gap-3 md:block">
        <h3 className="text-lg font-bold tracking-tight text-[var(--text)]">
          {title}
        </h3>
        <p className="text-xs text-[var(--text-mute)] md:mt-1">{jp}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
