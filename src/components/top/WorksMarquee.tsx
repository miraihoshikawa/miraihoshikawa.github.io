/* eslint-disable @next/next/no-img-element */
import { getAllProjects } from "@/lib/content";

/**
 * 作品カバー画像を左から右へゆっくり流す横スライド（マーキー）。
 * ページ最上部（About 見出しの上）に置く。高さは自己紹介ポートレートの横幅程度。
 * シームレスループのため同じ並びを 2 周分つなげて -50% → 0 でアニメーションさせる。
 */
export function WorksMarquee() {
  const projects = getAllProjects().filter((p) => p.cover);
  if (projects.length === 0) return null;

  const items = [...projects, ...projects];

  return (
    <div className="relative w-full overflow-hidden pt-14">
      <div className="works-marquee-track flex">
        {items.map((p, i) => (
          <div
            key={`${p.slug}-${i}`}
            aria-hidden={i >= projects.length}
            className="mr-4 aspect-[4/3] h-[clamp(150px,24vw,280px)] shrink-0 overflow-hidden bg-[var(--bg-alt)]"
          >
            <img
              src={p.cover}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
