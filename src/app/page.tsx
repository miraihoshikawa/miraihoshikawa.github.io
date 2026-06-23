import { WorksMarquee } from "@/components/top/WorksMarquee";
import { AboutSection, RecordsSection } from "@/components/top/AboutSection";
import { WorksSection } from "@/components/top/WorksSection";
import { SkillsSection } from "@/components/top/SkillsSection";
import { ContactSection } from "@/components/top/ContactSection";

export default function Home() {
  return (
    <>
      <WorksMarquee />
      <AboutSection noBorder headingAs="h1" />
      <WorksSection />
      <RecordsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
