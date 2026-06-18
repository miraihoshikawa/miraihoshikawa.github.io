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

/** 機材・設備の写真（Skillsに小さく掲載） */
export const equipmentPhotos: { file: string; label: string }[] = [
  { file: "fortus450.jpg", label: "Fortus 450mc（業務用3Dプリンタ）" },
  { file: "fortus170.jpg", label: "Fortus 170（3Dプリンタ）" },
  { file: "vacuum-casting.jpg", label: "真空注型機" },
  { file: "robodrill.jpg", label: "ロボドリル（CNC加工機）" },
  { file: "robot-arm.jpg", label: "7軸ロボットアーム" },
  { file: "mocap.jpg", label: "モーションキャプチャ" },
  { file: "clean-bench.jpg", label: "クリーンベンチ（安全キャビネット）" },
  { file: "microscope.jpg", label: "蛍光顕微鏡" },
  { file: "cell-sorter.jpg", label: "セルソーター" },
];

/** 扱える機材・設備 */
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
