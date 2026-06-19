/* eslint-disable @next/next/no-img-element */
import {
  tools,
  equipment,
  equipmentPhotos,
  toolLogos,
  type SkillCategory,
} from "@/data/skills";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToolBadge } from "@/components/shared/ToolBadge";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading num="03" jp="技術・機材">
        Skills
      </SectionHeading>

      {/* Software & Tools */}
      <SkillGroup
        title="Software & Tools"
        jp="ソフトウェア"
        categories={tools}
      />

      {/* Equipment */}
      <div className="mt-20">
        <SkillGroup
          title="Equipment & Facilities"
          jp="扱える機材・設備"
          categories={equipment}
        />

        {/* 機材写真（小さく） */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {equipmentPhotos.map((p) => (
            <figure key={p.file} className="group">
              <div className="overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--bg-alt)]">
                <img
                  src={`/images/skills/${p.file}`}
                  alt={p.label}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <figcaption className="mt-1.5 text-[10px] leading-tight text-[var(--text-mute)]">
                {p.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function SkillGroup({
  title,
  jp,
  categories,
}: {
  title: string;
  jp: string;
  categories: SkillCategory[];
}) {
  return (
    <div>
      <div className="mb-10 flex items-baseline gap-4">
        <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
          {title}
        </h3>
        <span className="text-xs text-[var(--text-mute)]">{jp}</span>
      </div>
      <div className="space-y-8">
        {categories.map((category) => (
          <div
            key={category.label}
            className="grid gap-4 md:grid-cols-[1fr_3fr] md:gap-12"
          >
            <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
              <span>{category.label}</span>
              {category.jp && (
                <span className="ml-2 normal-case tracking-normal text-[var(--text-mute)]">
                  {category.jp}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <ToolBadge key={item} name={item} logo={toolLogos[item]} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
