/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { profile } from "@/data/profile";
import { capabilities } from "@/data/skills";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

/**
 * トップの About。作品映像のすぐ下に置き、最初の画面で少し見えるようにする。
 * 小さな写真・名前・所属・自己紹介だけにし、経歴の詳細は /about へ。
 */
export function AboutIntro() {
  return (
    <section id="about" className="scroll-mt-14">
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-14 md:px-10 md:pt-10 md:pb-16">
        <div className="flex items-start gap-5 md:gap-10">
          <img
            src="/images/profile/portrait.jpeg"
            alt={profile.name}
            decoding="async"
            className="aspect-[4/5] w-20 shrink-0 object-cover grayscale sm:w-28 md:w-36"
          />
          <div className="min-w-0">
            <p className="font-mono text-[12px] tracking-[0.12em] text-[var(--accent-ink)] uppercase">
              About
            </p>
            <h1
              className="mt-2 text-[clamp(1.5rem,2.8vw,2.1rem)] leading-tight font-bold tracking-tight text-[var(--text)]"
              style={{
                fontFamily:
                  'var(--font-serif), "Hiragino Mincho ProN", "Yu Mincho", serif',
              }}
            >
              干川未来
              <span className="ml-3 text-[0.62em] font-semibold whitespace-nowrap text-[var(--text-sub)]">
                Mirai Hoshikawa
              </span>
            </h1>
            <p className="jp-phrase mt-2 text-[14px] leading-relaxed text-[var(--text-sub)] md:text-[15px]">
              {profile.university.replace(/ (\d+年)$/, "\u00a0$1")}
              <span className="mx-2 hidden text-[var(--text-mute)] sm:inline" aria-hidden="true">
                ／
              </span>
              <span className="block sm:inline">{profile.labs[0]}</span>
            </p>
            <p className="mt-5 hidden max-w-[40em] text-[16px] leading-[1.9] text-[var(--text-body)] md:block">
              {profile.bio}
            </p>
          </div>
        </div>
        {/* スマホは写真の横が狭いので、自己紹介は下に回す */}
        <p className="mt-5 text-[15px] leading-[1.9] text-[var(--text-body)] md:hidden">
          {profile.bio}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[15px] md:ml-[11.5rem]">
          <TextLink href="/about/">プロフィールと活動の詳細</TextLink>
          <TextLink href="/about/#records">論文・受賞・展示の一覧</TextLink>
        </div>
      </div>
    </section>
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
