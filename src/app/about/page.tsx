import { AboutSection, RecordsSection } from "@/components/top/AboutSection";

export const metadata = {
  title: "About | 干川未来",
};

export default function AboutPage() {
  return (
    <div className="pt-14">
      <AboutSection />
      <RecordsSection />
    </div>
  );
}
