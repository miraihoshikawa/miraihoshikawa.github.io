import { HeroFluid } from "@/components/top/HeroFluid";

export function HeroSection() {
  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
      {/* Fluid background */}
      <HeroFluid />
      {/* 下端のなじませグラデーション */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg)]" />

      {/* Center content */}
      <div className="relative z-[1] px-6 text-center fade-up">
        <p className="font-mono text-[10px] tracking-[0.5em] text-[var(--accent)] uppercase">
          Portfolio
        </p>
        <h1 className="mt-6 text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-white">
          Mirai Hoshikawa
        </h1>
        <p className="mt-6 text-pretty text-sm leading-relaxed text-[var(--text-sub)] md:text-base">
          研究と表現のあいだで、人と環境をつなぐものをつくる。
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-[1] -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-mute)] transition-colors hover:text-[var(--text)]"
        aria-label="下へスクロール"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </a>
    </section>
  );
}
