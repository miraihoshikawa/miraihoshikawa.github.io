import { AboutSection, RecordsSection } from "@/components/top/AboutSection";

export const metadata = {
  title: "About",
  description:
    "干川未来のプロフィール・経歴・所属。筑波大学大学院サイバニクス研究室で生体情報を用いた支援ロボットを研究しつつ、インタラクティブアートや配信テクニカルにも携わる。",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="pt-14">
      <AboutSection detailed headingAs="h1" />
      <RecordsSection />
    </div>
  );
}
