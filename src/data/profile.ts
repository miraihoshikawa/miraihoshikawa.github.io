export const profile = {
  name: "干川 未来",
  nameEn: "Mirai Hoshikawa",
  university:
    "筑波大学大学院 システム情報工学研究群 知能機能システム学位プログラム 2年",
  labs: [
    "サイバニクス研究室（システム情報系）",
    "日本財団HUMAIプログラム Sメンバー",
  ],
  email: "hoshikawa.153@gmail.com",
  hometown: "群馬県草津町",
  hobbies: ["アニメ鑑賞", "カメラ", "旅行", "物作り"],
  experiences: [
    {
      company: "株式会社Abstract Engine Rhizomatiks",
      role: "開発補助",
      type: "インターン" as const,
    },
    {
      company: "株式会社しびっくぱわー",
      role: "配信テクニカル",
      type: "長期インターンシップ" as const,
    },
    {
      company: "CYBERDYNE株式会社",
      role: "R&D アルバイト",
      type: "アルバイト" as const,
    },
    {
      company: "戦略的イノベーション創造プログラム（SIP）",
      role: "HCPS融合システム化基礎技術開発 リサーチアシスタント",
      type: "RA" as const,
    },
  ],
  axes: [
    {
      label: "Research / 研究",
      description: "マルチモーダル生体情報 × ロボット、QOL向上",
    },
    {
      label: "Entertainment / エンタメ",
      description: "インタラクティブアート、ライブ演出、XR体験",
    },
    {
      label: "Implementation / 実装",
      description: "配信・演出統合システム、現場運用",
    },
  ],
};
