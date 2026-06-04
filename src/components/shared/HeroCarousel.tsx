"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";

export function HeroCarousel({ projects }: { projects: ProjectMeta[] }) {
  const slides = projects.filter((p) => p.cover);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false, align: "start" },
    [
      Autoplay({
        delay: 4500,
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
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((p) => (
            <Link
              key={p.slug}
              href={`/works/${p.slug}/`}
              className="relative block min-w-0 flex-[0_0_100%] overflow-hidden bg-[var(--bg-alt)]"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {/* Bottom gradient + caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                  <div className="flex items-baseline gap-3 text-[10px] font-mono tracking-[0.2em] text-white/70 uppercase">
                    <span>{p.number}</span>
                    <span>{p.year}</span>
                    <span>{p.category}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold leading-tight text-white">
                    {p.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex items-center gap-2">
        {slides.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}: ${p.title}`}
            className="group flex-1"
          >
            <span
              className={`block h-px transition-colors ${
                i === selectedIndex
                  ? "bg-[var(--accent)]"
                  : "bg-[var(--border)] group-hover:bg-[var(--text-mute)]"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="mt-3 flex items-baseline justify-between text-[10px] font-mono tracking-[0.2em] text-[var(--text-mute)] uppercase">
        <span>
          {String(selectedIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <span className="hidden md:inline">Drag · Auto</span>
      </div>
    </div>
  );
}
