export type SkillCategory = {
  label: string;
  jp?: string;
  items: string[];
};

/** ソフトウェア・フレームワーク */
export const tools: SkillCategory[] = [
  { label: "Programming", items: ["Python", "TypeScript", "C++"] },
  {
    label: "Creative",
    items: [
      "TouchDesigner",
      "Unity",
      "After Effects",
      "Premiere Pro",
      "Photoshop",
      "Lightroom",
    ],
  },
  { label: "Robotics / Embedded", items: ["ROS2", "Arduino", "KiCAD"] },
  { label: "CAD", items: ["SolidWorks", "Fusion 360"] },
];

/** 扱える機材・設備（写真は後日追加） */
export const equipment: SkillCategory[] = [
  {
    label: "Electrical / Measurement",
    jp: "電気・計測",
    items: ["オシロスコープ", "スペクトラムアナライザ", "ファンクションジェネレータ"],
  },
  {
    label: "Fabrication",
    jp: "機械・造形",
    items: [
      "3Dプリンタ（家庭用〜業務用 Fortus / J35pro）",
      "レーザーカッター",
      "真空注型機",
      "基板加工機",
      "工作機械各種",
    ],
  },
  {
    label: "XR / Motion",
    jp: "XR・モーション",
    items: ["HMD・ARグラス", "モーションキャプチャ"],
  },
  {
    label: "Cell Culture",
    jp: "細胞培養",
    items: ["安全キャビネット", "位相差顕微鏡", "オートクレーブ", "遠心分離機"],
  },
  {
    label: "Streaming / AV",
    jp: "配信・映像音響",
    items: ["映像スイッチャー", "DMX照明", "音響設備"],
  },
];
