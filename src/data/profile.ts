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
   * 年表（新→旧）。年ごとに events を配列で持つ。
   * 「年 / 内容」「年 / 内容」形式で時系列表示される。
   */
  timeline: [
    {
      year: "2026",
      events: [
        "日本財団HUMAIプログラム Sメンバー",
        "2026年度 大学院セミナー 発表（マスター・リモートシステム）",
        "妖怪EXPO 2026 出展（ばけばけXR）",
      ],
    },
    {
      year: "2025",
      events: [
        "ROCKET PITCH NIGHT 2025 ULTIMATE / Hello, Business Summit 配信運用",
        "TOKYO NODE XRハッカソン / XR meet up aichi / XR kaigi（ばけばけXR）",
        "Vital Room（VR感覚ルーム）/ Tsukuba connect #79 出展",
        "第30回 日本バーチャルリアリティ学会大会 発表（配信統合インターフェース）",
      ],
    },
    {
      year: "2024",
      events: [
        "筑波大学 学士卒業論文「線維芽細胞自動培養のためのロボット化細胞培養装置」",
        "筑波大学大学院 入学（システム情報工学研究群）",
      ],
    },
    {
      year: "2023",
      events: [
        "J-WAVE INNOVATION WORLD FESTA 2023（Da-iCEライブ演出・音響浮揚作品『音浮』）",
        "Nu ink. 学生運営チームに参加",
      ],
    },
    {
      year: "2022",
      events: [
        "高専 卒業研究「手書き回路図からのネットリスト生成・電子回路シミュレーション」",
        "筑波大学 編入学",
      ],
    },
    {
      year: "2021",
      events: [
        "LED Cube Kaleido / 静脈 文化祭展示",
      ],
    },
  ],
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
