import { Hero } from "@/components/top/Hero";
import { AboutIntro, SkillsSummary } from "@/components/top/HomeSummaries";
import { WorksSection } from "@/components/top/WorksSection";
import { ContactSection } from "@/components/top/ContactSection";

/**
 * トップ：作品映像の帯 → About（小さな写真・名前・自己紹介）→ 作品のグリッド → Skills 要約 → 連絡先。
 * 動画を流すのは冒頭の映像だけ。経歴・論文・展示は /about、配信・現場運用は /operations に置く。
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <WorksSection />
      <SkillsSummary />
      <ContactSection num={null} />
    </>
  );
}
