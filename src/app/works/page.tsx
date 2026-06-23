import { WorksSection } from "@/components/top/WorksSection";

export const metadata = {
  title: "Works",
  description:
    "干川未来の制作プロジェクト一覧。支援ロボット研究、インタラクティブアート・XR、配信統合システムなど、研究・エンタメ・実装を横断する作品。",
  alternates: { canonical: "/works/" },
};

export default function WorksPage() {
  return (
    <div className="pt-14">
      <WorksSection headingAs="h1" />
    </div>
  );
}
