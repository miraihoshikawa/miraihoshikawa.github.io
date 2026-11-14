/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { emphasizeSelf } from "@/components/shared/emphasizeSelf";

export function AboutSection({
  noBorder = false,
  headingAs = "h2",
  num = "01",
}: {
  noBorder?: boolean;
  headingAs?: "h1" | "h2";
  num?: string | null;
}) {
  return (
    <SectionWrapper id="about" noBorder={noBorder}>
      <SectionHeading
        num={num}
        jp="About / 自己紹介"
        serif
        as={headingAs}
        titleClassName="text-[clamp(1.65rem,4vw,2.9rem)]"
      >
        干川未来
        <span className="hidden sm:inline"> / </span>
        <br className="sm:hidden" />
        Mirai Hoshikawa
      </SectionHeading>

      {/* 何をしている人かを最初の画面で伝える自己紹介文（名前の直下） */}
      <p className="reveal -mt-4 mb-14 max-w-[40em] text-[17px] leading-[1.9] text-[var(--text-body)] md:-mt-6 md:mb-16 md:text-lg">
        {profile.bio}
      </p>

      {/* Top: portrait + content */}
      <div className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
        <div>
          <img
            src="/images/profile/portrait.jpeg"
            alt={profile.name}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full max-w-[220px] object-cover grayscale md:max-w-xs"
          />
        </div>

        <div className="space-y-10">
          {/* Affiliation block (上) */}
          <div className="border-l-2 border-[var(--accent)] pl-6">
            <p className="font-mono text-[13px] tracking-[0.15em] text-[var(--text-sub)] uppercase">
              Current Affiliation
            </p>
            <p className="mt-2 text-lg text-[var(--text-body)] md:text-xl">
              {profile.university}
            </p>
            <ul className="mt-2 space-y-1 text-base text-[var(--text-sub)] md:space-y-0.5 md:text-lg">
              {profile.labs.map((lab) => (
                <li key={lab}>— {lab}</li>
              ))}
            </ul>

            {/* Experience を小さく併記 */}
            <p className="mt-5 font-mono text-[13px] tracking-[0.15em] text-[var(--text-sub)] uppercase">
              Experience
            </p>
            <ul className="mt-2 space-y-1 text-[15px] text-[var(--text-body)] md:space-y-0.5 md:text-lg">
              {profile.experiences.map((exp) => (
                <li key={exp.company}>
                  — {exp.company}　{exp.role}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </SectionWrapper>
  );
}

/** /about の一番下：活動内容（企業・団体での役割）と所属企業のリンク */
export function ActivitiesSection() {
  return (
    <SectionWrapper id="activities">
      <SectionHeading num={null} jp="活動内容・所属企業">
        Experience
      </SectionHeading>
      <p className="mb-4 font-mono text-[12px] tracking-[0.15em] text-[var(--text-sub)] uppercase">
        Activities / 活動内容
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
              <p className="mt-0.5 font-mono text-[12px] tracking-wider text-[var(--text-mute)] uppercase">
                {exp.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">
                {exp.detail}
              </p>
            </div>
          ))}
      </div>
      <div className="mt-14 border-t border-[var(--border)] pt-10">
        <p className="font-mono text-[13px] tracking-[0.15em] text-[var(--text-sub)] uppercase">
          Affiliated Companies / 所属企業
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {profile.companies.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden border border-[var(--border)] bg-[var(--bg-alt)] transition-colors hover:border-[var(--accent)]"
            >
              <div className="flex aspect-video items-center justify-center overflow-hidden bg-white p-6">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-sm font-bold text-[var(--text)] transition-colors group-hover:text-[var(--accent-ink)]">
                  {c.name}
                </p>
                <p className="mt-1 font-mono text-[12px] tracking-wider text-[var(--text-mute)] uppercase">
                  {c.role}
                </p>
                <p className="mt-3 font-mono text-[12px] tracking-wider text-[var(--accent-ink)]">
                  {new URL(c.url).host.replace(/^www\./, "")} ↗
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/** 経歴・実績（/about）。学歴 → 研究発表 → 受賞 → 展示の順 */
export function RecordsSection({
  num = "03",
  headingAs = "h2",
}: {
  num?: string | null;
  headingAs?: "h1" | "h2";
}) {
  return (
    <SectionWrapper id="records">
      <SectionHeading num={num} jp="経歴・実績" as={headingAs}>
        Records
      </SectionHeading>
      <div className="space-y-16">
        {/* Education */}
        <HistoryBlock title="Education" jp="学歴">
          <ul className="divide-y divide-[var(--border)]">
            {profile.history.education.map((e) => (
              <li
                key={e}
                className="py-3.5 text-[15px] leading-relaxed text-[var(--text-body)]"
              >
                {e}
              </li>
            ))}
          </ul>
        </HistoryBlock>

        {/* Publications */}
        <HistoryBlock title="Publications" jp="研究発表">
          <ul className="divide-y divide-[var(--border)]">
            {profile.history.publications.map((p) => (
              <li
                key={p.text}
                className="grid gap-1 py-3.5 text-[15px] leading-relaxed sm:grid-cols-[84px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[13px] text-[var(--text-sub)]">
                  {p.date}
                </span>
                <span className="text-[var(--text-body)]">
                  {emphasizeSelf(p.text)}
                  {p.url && (
                    <>
                      {" "}
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-ink)] underline underline-offset-2 hover:opacity-70"
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

        {/* Honors */}
        <HistoryBlock title="Honors" jp="受賞・奨学・採択">
          <ul className="divide-y divide-[var(--border)]">
            {profile.history.honors.map((item) => (
              <li
                key={item.date + item.text}
                className="grid gap-1 py-3.5 text-[15px] leading-relaxed sm:grid-cols-[84px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[13px] text-[var(--text-sub)]">
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
                        className="text-[var(--accent-ink)] underline underline-offset-2 hover:opacity-70"
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

        {/* Exhibitions */}
        <HistoryBlock title="Exhibitions" jp="展示">
          <ul className="divide-y divide-[var(--border)]">
            {profile.history.exhibitions.map((item) => (
              <li
                key={item.date + item.text}
                className="grid gap-1 py-3.5 text-[15px] leading-relaxed sm:grid-cols-[84px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[13px] text-[var(--text-sub)]">
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

/** 配信・現場運用（/operations ページ）。トップからは外し、右上のタブから来る */
export function OperationsSection() {
  return (
    <SectionWrapper id="operations">
      <SectionHeading
        jp="配信・現場運用"
        as="h1"
        sub="スタートアップ系イベントを中心に、配信現場の映像・音響・照明をまとめて担当している。演出と進行を1人で扱うための統合インターフェースも自作し、現場で運用している。"
      >
        Operations
      </SectionHeading>
      <div className="max-w-4xl">
          {/* Big number */}
        <div className="mb-8 flex items-baseline gap-4">
          <span className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tight text-[var(--accent-ink)]">
            {profile.history.operations.summaryCount}
          </span>
          <span className="text-xs text-[var(--text-mute)]">
            {profile.history.operations.summaryNote}
          </span>
        </div>

        {/* 配信オペレーション写真（2枚並べて横を埋める） */}
        <div className="mb-12 grid gap-5 sm:grid-cols-2">
          <figure>
            <img
              src="/images/projects/02-streaming-interface/Fig_onsite.jpg"
              alt="自作の演出統合インターフェースによる配信オペレーション"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full border border-[var(--border)] object-cover"
            />
            <figcaption className="mt-1.5 text-[12px] leading-tight text-[var(--text-mute)]">
              自作の演出統合インターフェースを用いた配信オペレーション卓
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/projects/02-streaming-interface/Fig_setup.jpg"
              alt="実イベント会場での配信オペレーション準備"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full border border-[var(--border)] object-cover"
            />
            <figcaption className="mt-1.5 text-[12px] leading-tight text-[var(--text-mute)]">
              実イベント会場での配信オペレーション準備
            </figcaption>
          </figure>
        </div>

        {/* Venues */}
        <p className="mb-3 font-mono text-[12px] tracking-[0.12em] text-[var(--text-mute)] uppercase">
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
        <p className="mb-3 font-mono text-[12px] tracking-[0.12em] text-[var(--text-mute)] uppercase">
          自作の配信システムを運用した主なイベント
        </p>
        <ul className="divide-y divide-[var(--border)]">
          {profile.history.operations.highlights.map((item) => (
            <li
              key={item.date + item.text}
              className="grid gap-1 py-3.5 text-[15px] leading-relaxed sm:grid-cols-[84px_1fr] sm:gap-6"
            >
              <span className="font-mono text-[13px] text-[var(--text-sub)]">
                {item.date}
              </span>
              <span className="text-[var(--text-body)]">
                {item.text}
                {"url" in item && item.url && <ExtLink href={item.url} />}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-[15px]">
          <a
            href="/works/02-streaming-interface/"
            className="inline-flex items-center gap-2 border-b border-[var(--accent-ink)] pb-1 text-[var(--text)] transition-colors hover:text-[var(--accent-ink)]"
          >
            自作の演出統合インターフェース（作品ページ）
            <span aria-hidden="true">→</span>
          </a>
        </p>
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
        className="text-[var(--accent-ink)] underline underline-offset-2 hover:opacity-70"
      >
        [link]
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
        <p className="text-[13px] text-[var(--text-sub)] md:mt-1">{jp}</p>
      </div>
      <div className="max-w-3xl">{children}</div>
    </div>
  );
}
