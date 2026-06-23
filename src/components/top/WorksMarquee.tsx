import { getAllProjects } from "@/lib/content";
import { WorksMarqueeClient, type MarqueeItem } from "./WorksMarqueeClient";

/**
 * 作品カバー＋追加の代表画像を、ページ最上部で右→左へゆっくり流すマーキー。
 * 並び順はクライアント側で初回ロード時に一度シャッフルして確定し、1巡内で重複しない。
 */
export function WorksMarquee() {
  const covers: MarqueeItem[] = getAllProjects()
    .filter((p) => p.cover)
    .map((p) => ({
      src: (p.marqueeImage ?? p.cover) as string,
      alt: p.title,
      key: p.slug,
      slug: p.slug,
    }));

  // カバー以外に流したい代表画像
  const extras: MarqueeItem[] = [
    {
      src: "/images/projects/02-streaming-interface/Fig_stage.jpg",
      alt: "ピッチイベントでの映像・照明演出",
      key: "extra-pitch-stage",
      slug: "02-streaming-interface",
    },
    {
      src: "/images/projects/08-relational-coral/Fig_touch.png",
      alt: "触れると白化するインタラクション（Relational Coral）",
      key: "extra-coral-touch",
      slug: "08-relational-coral",
    },
  ];

  const items = [...covers, ...extras];
  if (items.length === 0) return null;

  return <WorksMarqueeClient items={items} />;
}
