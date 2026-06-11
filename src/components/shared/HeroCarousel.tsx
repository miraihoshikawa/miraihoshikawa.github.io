"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function HeroCarousel({ projects }: { projects: ProjectMeta[] }) {
  const slides = projects.filter((p) => p.cover);
  const prefersReduced = usePrefersReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false, align: "start" },
    prefersReduced
      ? []
      : [
          Autoplay({
            delay: 6000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured works"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((p, i) => (
            <Link
              key={p.slug}
              href={`/works/${p.slug}/`}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}: ${p.title}`}
              className="relative block min-w-0 flex-[0_0_100%] overflow-hidden bg-[var(--bg-alt)]"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <img
                  src={p.cover}
                  alt={p.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {/* Bottom gradient + caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 md:p-8">
                  <div className="flex items-baseline gap-3 font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase">
                    <span>{p.number}</span>
                    <span>{p.year}</span>
                    <span>{p.category}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold leading-tight text-white md:text-2xl">
                    {p.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Progress dots — py-3 でタップ領域確保 */}
      <div className="mt-2 flex items-center gap-2">
        {slides.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}: ${p.title}`}
            aria-current={i === selectedIndex ? "true" : undefined}
            className="group flex-1 py-3"
          >
            <span
              className={`block h-[2px] transition-colors ${
                i === selectedIndex
                  ? "bg-[var(--accent)]"
                  : "bg-[var(--border)] group-hover:bg-[var(--text-mute)]"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="flex items-baseline justify-between font-mono text-[10px] tracking-[0.2em] text-[var(--text-mute)] uppercase">
        <span>
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
