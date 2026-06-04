export type SkillCategory = {
  label: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    label: "Programming",
    items: ["Python", "TypeScript", "C++"],
  },
  {
    label: "Creative Tools",
    items: [
      "TouchDesigner",
      "Unity",
      "Adobe AfterEffects",
      "Premiere Pro",
      "Lightroom",
      "Photoshop",
    ],
  },
  {
    label: "Hardware",
    items: ["Arduino", "ROS2", "DMX照明", "KiCAD"],
  },
  {
    label: "CAD / 3D",
    items: ["SolidWorks", "Fusion360"],
  },
];
