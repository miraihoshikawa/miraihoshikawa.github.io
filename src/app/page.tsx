import { HeroSection } from "@/components/top/HeroSection";
import { AboutSection } from "@/components/top/AboutSection";
import { WorksSection } from "@/components/top/WorksSection";
import { SkillsSection } from "@/components/top/SkillsSection";
import { ExperienceSection } from "@/components/top/ExperienceSection";
import { ContactSection } from "@/components/top/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
