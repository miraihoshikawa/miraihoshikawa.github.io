export const profile = {
  name: "干川 未来",
  nameEn: "Mirai Hoshikawa",
  bio: "高専で電子メディア工学を学んだのち筑波大学に編入、現在は同大学院でサイバニクス研究室に所属。マルチモーダル生体情報を用いた支援ロボットの研究を行いながら、インタラクティブアートやライブ演出、配信統合システムなど、研究と表現を横断する制作を続けている。",
  university: "筑波大学大学院 知能機能システム学位プログラム 2年",
  labs: [
    "サイバニクス研究室（システム情報系）",
    "日本財団HUMAIプログラム GS枠採択（Sメンバー）",
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
   * 会社・組織との関わり。Affiliation ブロック内に小さく併記する。
   * detail は About 詳細ページ（/about）でのみ表示する活動内容。
   */
  experiences: [
    {
      company: "株式会社Abstract Engine - Rhizomatiks",
      role: "R&D アルバイト",
      detail:
        "メディアアートやライブ演出のR&D補助として、プロダクトの組み立て・回路製作から、イベントの設営・運営までを担当。",
    },
    {
      company: "CYBERDYNE株式会社",
      role: "R&D アルバイト",
      detail:
        "ロボットを中心としたR&D補助として、CAD設計・回路設計から開発環境の構築までを担当。",
    },
    {
      company: "株式会社しびっくぱわー",
      role: "配信テクニカル（長期インターン）",
      detail:
        "つくば拠点のイベント企画・ハイブリッド配信会社で、配信現場のテクニカルを担当。映像・音響・照明をまとめて受け持ち、スタートアップ系イベントの配信運用を継続的に支えている。",
    },
    {
      company: "戦略的イノベーション創造プログラム（SIP）",
      role: "HCPS融合システム化基礎技術開発 リサーチアシスタント",
      detail: "",
    },
  ],
  /** 所属企業（About詳細ページにロゴ入りリンクカードで表示） */
  companies: [
    {
      name: "Rhizomatiks",
      role: "R&D アルバイト",
      url: "https://rhizomatiks.com/",
      image: "/images/companies/rhizomatiks.png",
    },
    {
      name: "CYBERDYNE",
      role: "R&D アルバイト",
      url: "https://www.cyberdyne.jp/",
      image: "/images/companies/cyberdyne.png",
    },
    {
      name: "しびっくぱわー",
      role: "配信テクニカル（長期インターン）",
      url: "https://civicpower.jp/",
      image: "/images/companies/civicpower-logo.png",
    },
  ],
  /**
   * カテゴリ別の経歴・実績。
   */
  history: {
    // 学歴（日付なし・新→旧）
    education: [
      "筑波大学大学院 知能機能システム学位プログラム 在学",
      "筑波大学 工学システム学類 卒業（工学）",
      "筑波大学 工学システム学類 編入学",
      "群馬工業高等専門学校 電子メディア工学科 卒業",
    ],
    // 受賞・奨学・採択（新→旧）
    honors: [
      {
        date: "2026.07",
        text: "アート＆テクノロジー東北 2026 最優秀賞（Relational Coral・インタラクティブ作品部門）",
      },
      {
        date: "2026.07",
        text: "アート＆テクノロジー東北 2026 優秀賞（Augmented Hanahuda）",
      },
      {
        date: "2026.06–",
        text: "日本財団 HUMAIプログラム GS枠（Giant Step）Sメンバー",
        url: "https://zen.ac.jp/humai",
      },
      {
        date: "2019–2021",
        text: "公益財団法人 川村育英会 奨学生 採択",
        url: "https://kawamura-ikueikai.or.jp/",
      },
    ],
    // 研究発表（引用形式・任意でリンク）
    publications: [
      {
        text: "Akira Uehara, Mirai Hoshikawa, Kazutomo Baba, Andrey Mikhailov, Hiroaki Kawamoto, Yoshiyuki Sankai, “Study on Robotic Cell Culture Systems for Autonomous Cultivation of Fibroblast Cells,” Proceedings of the 2024 IEEE/SICE International Symposium on System Integrations (SII), pp.259–264, 2025.",
        url: "https://ieeexplore.ieee.org/document/10870591",
      },
      {
        text: "干川未来, 上原皓, “少人数体制での配信操作を支援する演出統合インターフェースの開発と評価,” 第30回 日本バーチャルリアリティ学会大会, 2025年9月.",
        url: "https://conference.vrsj.org/ac2025/program/doc/2B2-07.pdf",
      },
      {
        text: "一倉弘毅, 清水紘輔, 干川未来, 池辺莉々, “没入型技術とAIを活用した妖怪のインタラクティブなデジタルプラットフォーム『ばけばけXR』の取り組み,” デジタルアーカイブ学会誌, 9巻, 2025.",
        url: "https://www.jstage.jst.go.jp/article/jsda/9/s2/9_s226/_article/-char/ja",
      },
      { text: "日本バーチャルリアリティ学会大会 2026（投稿予定）" },
      { text: "SIGGRAPH Asia 2026（投稿中）" },
    ],
    // 展示（新→旧）
    exhibitions: [
      {
        date: "2026.07",
        text: "アート＆テクノロジー東北 2026（Relational Coral・最優秀賞）",
      },
      {
        date: "2026.07",
        text: "アート＆テクノロジー東北 2026（Augmented Hanahuda・優秀賞）",
      },
      {
        date: "2026.02",
        text: "妖怪EXPO 2026（ばけばけXR）",
        url: "https://www.yokaiexpo.com/#booth",
      },
      { date: "2025.12", text: "XR Kaigi 2025（ばけばけXR）" },
      { date: "2025.11", text: "XR meet up aichi（ばけばけXR）" },
      { date: "2025.08", text: "TOKYO NODE XRハッカソン（ばけばけXR）" },
      { date: "2025.07", text: "Tsukuba connect #79（Vital Room / ばけばけXR）" },
      {
        date: "2023",
        text: "干川未来「音浮」J-WAVE INNOVATION WORLD FESTA 2023",
        url: "https://www.j-wave.co.jp/iwf2023/",
      },
    ],
    // 配信・現場運用
    operations: {
      summaryCount: "180+",
      summaryNote: "配信現場数（2026/06/19時点）",
      // 継続・定期で運用している配信現場
      venues: [
        { text: "毎週水曜 つくばスタートアップパーク イベント", url: "https://tsukuba-stapa.jp/" },
        { text: "毎週木曜 Venture Café Tokyo Thursday Gathering", url: "https://venturecafetokyo.org/programs/thursday-gathering/" },
        { text: "産総研 オープンイノベーションの社会実装戦略", url: "https://www.aist-solutions.co.jp/events_webinars/page000196/" },
        { text: "防災科研（NIED）セミナー配信" },
        { text: "GTIE イベント配信 @CiC Tokyo" },
        { text: "水夜サイエンスカフェ 2024", url: "https://co-en.space/co-event/1689/" },
        { text: "Business Challenge Program（県北BCP）", url: "https://civicpower.jp/bcp/" },
        { text: "県北 Business Start School（県北BSS）" },
      ],
      // 自作の配信システムを運用した主なイベント（新→旧）
      highlights: [
        { date: "2025.12", text: "Business Challenge Program（県北BCP）最終発表" },
        { date: "2025.10", text: "Hello, Business Summit 2025 Autumn" },
        { date: "2025.05", text: "ROCKET PITCH NIGHT ULTIMATE", url: "https://prtimes.jp/main/html/rd/p/000000045.000060032.html" },
        { date: "2025.03", text: "NEP事業ピッチイベント「NEP-Lab（ねぷらぼ）2025」", url: "https://www.nedo.go.jp/events/CA_100288.html" },
        { date: "2025.01", text: "ROCKET PITCH NIGHT IBARAKI 2025", url: "https://prtimes.jp/main/html/rd/p/000000039.000060032.html" },
        { date: "2025.01", text: "Business Challenge Program（県北BCP）最終発表" },
      ],
    },
  },
};
