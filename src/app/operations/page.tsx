import { OperationsSection } from "@/components/top/AboutSection";

export const metadata = {
  title: "Operations",
  description:
    "干川未来の配信・現場運用の記録。スタートアップ系イベントを中心に、配信現場の映像・音響・照明を担当し、自作の演出統合インターフェースで運用している。",
  alternates: { canonical: "/operations/" },
};

export default function OperationsPage() {
  return (
    <div className="pt-14">
      <OperationsSection />
    </div>
  );
}
