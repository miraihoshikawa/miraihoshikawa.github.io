/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AboutSection({
  detailed = false,
  noBorder = false,
}: {
  detailed?: boolean;
  noBorder?: boolean;
}) {
  return (
    <SectionWrapper id="about" noBorder={noBorder}>
      <SectionHeading
        num="01"
        jp="About / 自己紹介"
        serif
        titleClassName="text-[clamp(1.65rem,4vw,2.9rem)]"
      >
        干川未来 / Mirai Hoshikawa
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
        </div>

        <div className="space-y-10">
          {/* Affiliation block (上) */}
          <div className="border-l-2 border-[var(--accent)] pl-6">
            <p className="font-mono text-[12px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Current Affiliation
            </p>
            <p className="mt-2 text-xl text-[var(--text-body)]">
              {profile.university}
            </p>
            <ul className="mt-2 space-y-0.5 text-xl text-[var(--text-sub)]">
              {profile.labs.map((lab) => (
                <li key={lab}>— {lab}</li>
              ))}
            </ul>

            {/* Experience を小さく併記 */}
            <p className="mt-5 font-mono text-[12px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
              Experience
            </p>
            <ul className="mt-2 space-y-0.5 text-lg text-[var(--text-body)]">
              {profile.experiences.map((exp) => (
                <li key={exp.company}>
                  — {exp.company}　{exp.role}
                </li>
              ))}
            </ul>
          </div>

          {/* Bio (下・Affiliationと同じくらいのサイズ) */}
          <p className="text-base leading-relaxed text-[var(--text-body)]">
            {profile.bio}
          </p>

          {/* Experience 詳細（/about 詳細ページのみ） */}
          {detailed && (
            <div>
              <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
                Experience / 活動内容
              </p>
              <div className="space-y-6">
                {profile.experiences
                  .filter((exp) => exp.detail)
                  .map((exp) => (
                    <div
                      key={exp.company}
                      className="border-l-2 border-[var(--border)] pl-5"
                    >
                      <p className="text-sm font-bold text-[var(--text)]">
                        {exp.company}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] tracking-wider text-[var(--text-mute)] uppercase">
                        {exp.role}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">
                        {exp.detail}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 所属企業（Aboutの下に3カラム） */}
      <div className="mt-14 border-t border-[var(--border)] pt-10">
        <p className="font-mono text-[12px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
          Affiliated Companies / 所属企業
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {profile.companies.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-[var(--border)] bg-[var(--bg-alt)] p-5 transition-colors hover:border-[var(--accent)]"
            >
              <div>
                <p className="text-lg font-bold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                  {c.name}
                </p>
                <p className="mt-1 font-mono text-[11px] tracking-wider text-[var(--text-mute)] uppercase">
                  {c.role}
                </p>
              </div>
              <p className="mt-5 font-mono text-[11px] tracking-wider text-[var(--accent)]">
                {new URL(c.url).host.replace(/^www\./, "")} ↗
              </p>
            </a>
          ))}
        </div>
      </div>

    </SectionWrapper>
  );
}

/** Works の後に置く、研究発表・展示・配信運用の記録 */
export function RecordsSection() {
  return (
    <SectionWrapper id="records">
      <div className="space-y-16">
        {/* Education（Works の後に表示） */}
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

        {/* Honors */}
        <HistoryBlock title="Honors" jp="奨学・採択">
          <ul className="divide-y divide-[var(--border)]">
            {profile.history.honors.map((item) => (
              <li
                key={item.date + item.text}
                className="grid gap-1 py-3 text-sm leading-relaxed sm:grid-cols-[80px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[12px] text-[var(--text-mute)]">
                  {item.date}
                </span>
                <span className="text-[var(--text-body)]">
                  {item.text}
                  {item.url && (
                    <>
                      {" "}
                      <a
                        href={item.url}
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

          {/* 配信オペレーション写真（小さく） */}
          <figure className="mb-8 max-w-sm">
            <img
              src="/images/projects/02-streaming-interface/Fig_onsite.jpg"
              alt="自作の演出統合インターフェースによる配信オペレーション"
              loading="lazy"
              decoding="async"
              className="w-full border border-[var(--border)] object-cover"
            />
            <figcaption className="mt-1.5 text-[10px] leading-tight text-[var(--text-mute)]">
              自作の演出統合インターフェースを用いた配信オペレーション卓
            </figcaption>
          </figure>

          {/* Venues */}
          <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
            継続・定期で運用している配信現場
          </p>
          <ul className="mb-8 grid gap-x-8 gap-y-1.5 text-sm text-[var(--text-body)] sm:grid-cols-2">
            {profile.history.operations.venues.map((v) => (
              <li key={v.text}>
                — {v.text}
                {v.url && <ExtLink href={v.url} />}
              </li>
            ))}
          </ul>

          {/* Highlights */}
          <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
            自作の配信システムを運用した主なイベント
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
                <span className="text-[var(--text-body)]">
                  {item.text}
                  {"url" in item && item.url && <ExtLink href={item.url} />}
                </span>
              </li>
            ))}
          </ul>
        </HistoryBlock>
      </div>
    </SectionWrapper>
  );
}

function ExtLink({ href }: { href: string }) {
  return (
    <>
      {" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent)] underline underline-offset-2 hover:opacity-70"
      >
        (Link)
      </a>
    </>
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
    <div className="reveal grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
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
