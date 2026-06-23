import { SkillsSection } from "@/components/top/SkillsSection";

export const metadata = {
  title: "Skills",
  description:
    "干川未来のスキルと扱える機材。CAD・回路設計・3Dプリント・金属加工から、TouchDesigner・ROS2・XR、配信・現場運用まで。",
  alternates: { canonical: "/skills/" },
};

export default function SkillsPage() {
  return (
    <div className="pt-14">
      <SkillsSection headingAs="h1" />
    </div>
  );
}
