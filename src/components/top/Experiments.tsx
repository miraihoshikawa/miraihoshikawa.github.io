import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LoopVideo } from "@/components/shared/LoopVideo";

/** 作品ページを持たない、制作中の実験（短い縦長の動画と一言） */
const EXPERIMENTS = [
  {
    key: "arms",
    title: "VR で動かす双腕ロボット",
    caption:
      "VR のコントローラを持った腕の動きどおりに、2本のロボットアームを動かす遠隔操作の実験。",
    tags: ["ロボットアーム", "VR"],
  },
  {
    key: "vj",
    title: "映像の前のロボットアーム",
    caption:
      "投影した映像の前でロボットアームを動かす実験。VJ のシステムと同時に走らせている。",
    tags: ["ロボットアーム", "TouchDesigner"],
  },
  {
    key: "lantern",
    title: "火の玉のランタン",
    caption:
      "ばけばけXR の火の玉をかたどったランタン。M5Stack CoreS3 の画面に目を描き、内側の LED の色を移り変わらせる。",
    tags: ["M5Stack", "3Dプリント"],
  },
];

export function Experiments() {
  return (
    <SectionWrapper id="experiments">
      <SectionHeading
        jp="実験"
        sub="作品になる前の実験や、制作途中の記録。"
      >
        Experiments
      </SectionHeading>
      {/* スマホは横にスワイプ、PC は3列 */}
      <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
        {EXPERIMENTS.map((e) => (
          <li key={e.key} className="w-[72%] shrink-0 snap-start md:w-auto">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-alt)]">
              <LoopVideo
                src={`/videos/experiments/exp-${e.key}.mp4`}
                poster={`/videos/experiments/exp-${e.key}.jpg`}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg leading-snug font-bold tracking-tight text-[var(--text)]">
              {e.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-sub)]">
              {e.caption}
            </p>
            <p className="mt-2 font-mono text-[12px] tracking-[0.06em] text-[var(--text-mute)]">
              {e.tags.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
