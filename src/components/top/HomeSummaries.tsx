/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { profile } from "@/data/profile";
import { capabilities } from "@/data/skills";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** トップ用のプロフィール要約。詳細（経歴・論文・受賞・展示）は /about へ */
export function AboutSummary() {
  return (
    <SectionWrapper id="about">
      <SectionHeading jp="自己紹介">About</SectionHeading>
      <div className="grid gap-10 md:grid-cols-[240px_1fr] md:gap-16">
        <img
          src="/images/profile/portrait.jpeg"
          alt={profile.name}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full max-w-[200px] object-cover grayscale md:max-w-none"
        />
        <div>
          <p className="max-w-[40em] text-[17px] leading-[1.9] text-[var(--text-body)]">
            {profile.bio}
          </p>
          <dl className="mt-10 grid gap-8 border-t border-[var(--border)] pt-8 lg:grid-cols-2">
            <div>
              <dt className="font-mono text-[12px] tracking-[0.12em] text-[var(--text-sub)] uppercase">
                Current Affiliation
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-[var(--text-body)]">
                <p className="text-[var(--text)]">{profile.university}</p>
                <ul className="mt-1.5 space-y-1 text-[var(--text-sub)]">
                  {profile.labs.map((lab) => (
                    <li key={lab}>— {lab}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] tracking-[0.12em] text-[var(--text-sub)] uppercase">
                Experience
              </dt>
              <dd className="mt-3">
                <ul className="space-y-2 text-[15px] leading-snug text-[var(--text-body)]">
                  {profile.experiences.map((exp) => (
                    <li key={exp.company}>
                      <span className="text-[var(--text)]">{exp.company}</span>
                      <span className="mt-0.5 block text-[13px] text-[var(--text-sub)]">
                        {exp.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            <TextLink href="/about/">プロフィールと活動の詳細</TextLink>
            <TextLink href="/about/#records">論文・受賞・展示の一覧</TextLink>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/** トップ用の Skills 要約。4つの領域のタイルから /skills の該当箇所へ */
export function SkillsSummary() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        jp="技術・機材"
        sub="設計・製作から、インタラクションの実装、展示・配信の現場運用まで。"
      >
        Skills
      </SectionHeading>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap, i) => (
          <li key={cap.label}>
            <Link
              href={`/skills/#cap-${i + 1}`}
              className="group relative block aspect-[4/3] overflow-hidden bg-[var(--bg-alt)]"
            >
              <img
                src={cap.image}
                alt={cap.imageAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-75 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-90"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[13px] text-white/80">{cap.jp}</p>
                <p className="mt-0.5 text-lg leading-tight font-bold tracking-tight text-white">
                  {cap.label}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-[15px]">
        <TextLink href="/skills/">ツール・機材を含む詳細</TextLink>
      </div>
    </SectionWrapper>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 border-b border-[var(--accent-ink)] pb-1 text-[var(--text)] transition-colors hover:text-[var(--accent-ink)]"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
