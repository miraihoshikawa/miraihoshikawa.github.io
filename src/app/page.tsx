import { Hero, FieldIndex } from "@/components/top/Hero";
import { WorksByField } from "@/components/shared/WorksByField";
import { AboutSummary, SkillsSummary } from "@/components/top/HomeSummaries";
import { ContactSection } from "@/components/top/ContactSection";
import { Experiments } from "@/components/top/Experiments";

/**
 * トップ：作品映像の冒頭 → 3フィールドの入口 → フィールドごとの作品 →
 * 実験（作品ページを持たない短い動画）→ プロフィール要約 → Skills 要約 → 連絡先。
 * 経歴・論文・展示は /about、配信・現場運用は /operations に置く。
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FieldIndex />
      <section id="works" className="scroll-mt-14">
        <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-20">
          <WorksByField />
        </div>
      </section>
      <Experiments />
      <AboutSummary />
      <SkillsSummary />
      <ContactSection num={null} />
    </>
  );
}
