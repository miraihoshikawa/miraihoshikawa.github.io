import { AboutSection, RecordsSection } from "@/components/top/AboutSection";
import { WorksSection } from "@/components/top/WorksSection";
import { SkillsSection } from "@/components/top/SkillsSection";
import { ContactSection } from "@/components/top/ContactSection";

export default function Home() {
  return (
    <>
      <AboutSection />
      <WorksSection />
      <RecordsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
