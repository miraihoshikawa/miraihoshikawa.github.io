export const profile = {
  name: "干川 未来",
  nameEn: "Mirai Hoshikawa",
  bio: "群馬県草津町出身。高専で電子工学を学んだのち筑波大学に編入、現在は同大学院でサイバニクス研究室に所属。マルチモーダル生体情報を用いた支援ロボットの研究を行いながら、インタラクティブアートやライブ演出、配信統合システムなど、研究と表現を横断する制作を続けている。",
  university:
    "筑波大学大学院 システム情報工学研究群 知能機能システム学位プログラム 2年",
  labs: [
    "サイバニクス研究室（システム情報系）",
    "日本財団HUMAIプログラム Sメンバー",
  ],
  email: "hoshikawa.153@gmail.com",
  hometown: "群馬県草津町",
  hobbies: ["アニメ鑑賞", "カメラ", "旅行", "物作り"],
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
  /**
   * カテゴリ別の経歴・実績（新→旧）。
   * 「年月 — 内容（場所）」形式の静かなリストで表示される。
   */
  history: {
    education: [
      { date: "現在", text: "筑波大学大学院 知能機能システム学位プログラム 在籍（博士前期課程2年・サイバニクス研究室）" },
      { date: "2024.03", text: "筑波大学 卒業（卒業研究：ロボット化細胞培養装置）" },
      { date: "2022.04", text: "筑波大学 編入学" },
      { date: "2022.03", text: "高専 卒業（卒業研究：手書き回路図からのネットリスト生成・回路シミュレーション）" },
    ],
    publications: [
      { date: "準備中", text: "国際会議論文（マスター・リモートシステム）投稿準備中" },
      { date: "2026.05", text: "「マルチモーダル生体情報を用いたハイブリッド制御によるマスター・リモートシステムに関する研究」2026年度 大学院セミナー" },
      { date: "2025.09", text: "「少人数体制での配信操作を支援する演出統合インターフェースの開発と評価」第30回 日本バーチャルリアリティ学会大会" },
      { date: "2024.03", text: "「線維芽細胞を自動培養するためのロボット化細胞培養装置に関する基礎的研究」筑波大学 卒業論文" },
    ],
    exhibitions: [
      { date: "2026.02", text: "妖怪EXPO 2026（ばけばけXR）" },
      { date: "2025.12", text: "XR Kaigi 2025（ばけばけXR）" },
      { date: "2025.11", text: "XR meet up aichi（ばけばけXR）" },
      { date: "2025.08", text: "TOKYO NODE XRハッカソン（ばけばけXR）" },
      { date: "2025.07", text: "Tsukuba connect #79（Vital Room / ばけばけXR）" },
      { date: "2023.10", text: "J-WAVE INNOVATION WORLD FESTA 2023（ライブ映像演出・音響浮揚作品「音浮」）" },
      { date: "2021.11", text: "高専文化祭（LED Cube Kaleido / 静脈）" },
    ],
    operations: [
      { date: "2025", text: "ROCKET PITCH NIGHT IBARAKI / ULTIMATE、NEP-Lab 2025、Hello, Business Summit 2025 Spring・Autumn ほか — 配信統合システムの実運用" },
    ],
  },
  /**
   * 経験：会社・組織との関わり（個別に表示）
   */
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
};
