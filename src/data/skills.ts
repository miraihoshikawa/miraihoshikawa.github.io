export type SkillCategory = {
  label: string;
  jp?: string;
  items: string[];
};

/** 実務でできること（設計〜製作〜現場運用までの領域別） */
export const capabilities: SkillCategory[] = [
  {
    label: "Hardware Development",
    jp: "ハードウェア開発",
    items: [
      "CAD設計（SolidWorks / Fusion 360）",
      "3Dプリンタによる試作・筐体プロトタイピング",
      "ロボドリル・工作機械による金属加工",
      "真空注型機を用いたシリコン成形",
    ],
  },
  {
    label: "Electronics & Embedded",
    jp: "電子回路・組み込み",
    items: [
      "KiCADによる回路・基板設計",
      "基板加工・実装・デバッグ",
      "センサ統合と筐体への組み込み",
      "Arduino / ESP32 / Raspberry Pi / NVIDIA Jetson",
    ],
  },
  {
    label: "Interactive / Spatial Computing",
    jp: "インタラクション・空間演出",
    items: [
      "TouchDesignerによるインタラクション設計",
      "DMX / Art-Net による照明制御",
      "Computer Vision・AI・ロボティクスの応用",
      "XR・フィジカルコンピューティング開発",
    ],
  },
  {
    label: "Installation & Operation",
    jp: "設営・テクニカルオペレーション",
    items: [
      "配信現場での映像・音響・照明オペレーション",
      "インスタレーション作品の設営・運用",
      "空間演出システムの実装・調整",
      "展示現場でのトラブルシューティング",
    ],
  },
];

/** ソフトウェア・フレームワーク */
export const tools: SkillCategory[] = [
  { label: "Programming", items: ["Python", "C", "C++", "C#"] },
  {
    label: "Creative",
    items: [
      "TouchDesigner",
      "Unity",
      "NVIDIA Omniverse",
      "After Effects",
      "Premiere Pro",
      "Photoshop",
      "Lightroom",
    ],
  },
  { label: "Robotics / Embedded", items: ["ROS2", "Arduino", "KiCAD"] },
  { label: "CAD", items: ["SolidWorks", "Fusion 360"] },
];

/** ツール名 → ロゴ画像（public/images/logos/）。無いものはテキストのみ表示 */
export const toolLogos: Record<string, string> = {
  Python: "python.webp",
  C: "c.jpg",
  "C++": "cpp.png",
  "C#": "csharp.png",
  TouchDesigner: "touchdesigner.jpg",
  Unity: "unity.jpg",
  "NVIDIA Omniverse": "omniverse.png",
  "After Effects": "after-effects.png",
  "Premiere Pro": "premiere-pro.png",
  Photoshop: "photoshop.png",
  Lightroom: "lightroom.png",
  ROS2: "ros2.png",
  Arduino: "arduino.jpg",
  KiCAD: "kicad.jpg",
  SolidWorks: "solidworks.jpg",
  "Fusion 360": "fusion360.png",
};

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
