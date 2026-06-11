import { getAllProjects } from "@/lib/content";
import { HeroCarousel } from "@/components/shared/HeroCarousel";

export function HeroSection() {
  const projects = getAllProjects();
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Brand mark */}
        <div className="mb-10 flex items-baseline justify-between fade-up">
          <p className="font-mono text-[10px] tracking-[0.4em] text-[var(--text-mute)] uppercase">
            Portfolio · 2026
          </p>
          <p className="hidden font-mono text-[10px] tracking-[0.4em] text-[var(--text-mute)] uppercase sm:block">
            Research · Entertainment · Implementation
          </p>
        </div>

        {/* Statement */}
        <h1 className="mb-14 fade-up fade-up-d1">
          <span className="block text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-tight text-[var(--text)]">
            Mirai Hoshikawa
          </span>
          <span className="mt-5 block max-w-2xl text-base leading-relaxed text-[var(--text-sub)] md:text-lg">
            生体情報で動く支援ロボットの研究から、心拍で変わるVR空間、
            イベント配信の統合システムまで——研究・表現・実装を一人で往復します。
          </span>
          <span className="mt-3 block font-mono text-[11px] tracking-[0.2em] text-[var(--text-mute)] uppercase">
            干川未来 / 筑波大学大学院 サイバニクス研究室 M2
          </span>
        </h1>

        {/* Carousel */}
        <div className="mx-auto max-w-5xl fade-up fade-up-d2">
          <HeroCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
}
