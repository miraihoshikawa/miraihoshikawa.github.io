import { WorksMarquee } from "@/components/top/WorksMarquee";
import { AboutSection, RecordsSection } from "@/components/top/AboutSection";
import { WorksSection } from "@/components/top/WorksSection";
import { SkillsSection } from "@/components/top/SkillsSection";
import { ContactSection } from "@/components/top/ContactSection";

export default function Home() {
  return (
    <>
      <WorksMarquee />
      <p
        className="reveal mx-auto max-w-7xl px-6 pt-16 text-[clamp(1.65rem,4vw,2.9rem)] leading-tight font-medium tracking-tight text-[var(--text)] md:px-10 md:pt-20"
        style={{
          fontFamily:
            'var(--font-serif), "Hiragino Mincho ProN", "Yu Mincho", serif',
        }}
      >
        技術を、体験に変える。
      </p>
      <AboutSection noBorder />
      <WorksSection />
      <RecordsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
