/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  capabilities,
  tools,
  equipment,
  equipmentPhotos,
  toolLogos,
  type Capability,
} from "@/data/skills";
import { getAllProjects, type ProjectMeta } from "@/lib/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

/**
 * Skills。経験の領域ごとに「代表写真＋できること＋主なツール＋この技術を使った作品」を並べる。
 * compact（トップ用）では機材・設備を省き、Skills ページへのリンクにする。
 */
export function SkillsSection({
  headingAs = "h2",
  num = "04",
  compact = false,
}: {
  headingAs?: "h1" | "h2";
  num?: string | null;
  compact?: boolean;
}) {
  const projects = getAllProjects();

  return (
    <SectionWrapper id="skills">
      <SectionHeading
        num={num}
        jp="技術・機材"
        as={headingAs}
        sub="設計・製作から、インタラクションの実装、展示・配信の現場運用まで。"
      >
        Skills
      </SectionHeading>

      {/* Capabilities：領域ごとに写真と作品で見せる */}
      <GroupTitle title="Capabilities" jp="経験" />
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {capabilities.map((cap, i) => (
          <CapabilityBlock
            key={cap.label}
            id={`cap-${i + 1}`}
            cap={cap}
            projects={projects}
          />
        ))}
      </div>

      {/* Software & Tools：分類ごとの列 */}
      <div className="mt-24">
        <GroupTitle title="Software & Tools" jp="ソフトウェア" />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((cat) => (
            <div key={cat.label}>
              <p className="border-b border-[var(--border)] pb-2 font-mono text-[12px] tracking-[0.12em] text-[var(--text-sub)] uppercase">
                {cat.label}
              </p>
              <ul className="mt-4 space-y-3">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[15px] text-[var(--text-body)]"
                  >
                    <ToolLogo name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {compact ? (
        <p className="mt-16">
          <Link
            href="/skills/#equipment"
            className="inline-flex items-center gap-2 border-b border-[var(--accent-ink)] pb-1 text-[15px] text-[var(--text)] transition-colors hover:text-[var(--accent-ink)]"
          >
            扱える機材・設備（写真つき）を見る →
          </Link>
        </p>
      ) : (
        <div id="equipment" className="mt-24 scroll-mt-20">
          <GroupTitle title="Equipment & Facilities" jp="扱える機材・設備" />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((cat) => (
              <div key={cat.label}>
                <p className="border-b border-[var(--border)] pb-2 text-[15px] font-bold text-[var(--text)]">
                  {cat.jp ?? cat.label}
                  <span className="ml-2 font-mono text-[11px] font-normal tracking-[0.1em] text-[var(--text-mute)] uppercase">
                    {cat.label}
                  </span>
                </p>
                <ul className="mt-3 space-y-1.5 text-[15px] text-[var(--text-body)]">
                  {cat.items.map((item) => (
                    <li key={item} className="jp-phrase">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 機材の写真 */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {equipmentPhotos.map((p) => (
              <figure key={p.file} className="group">
                <div className="overflow-hidden bg-[var(--bg-alt)]">
                  <img
                    src={`/images/skills/${p.file}`}
                    alt={p.label}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="jp-phrase mt-2 text-[13px] leading-snug text-[var(--text-sub)]">
                  {p.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

function GroupTitle({ title, jp }: { title: string; jp: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h3 className="text-2xl font-bold tracking-tight text-[var(--text)] md:text-[1.75rem]">
        {title}
      </h3>
      <span className="text-base whitespace-nowrap text-[var(--text-sub)]">
        {jp}
      </span>
    </div>
  );
}

/** 作品の tools と照らして、この領域の技術を使った作品を選ぶ */
function relatedWorks(cap: Capability, projects: ProjectMeta[]) {
  if (cap.works) {
    return cap.works
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter((p): p is ProjectMeta => Boolean(p));
  }
  const keys = cap.match ?? [];
  return projects.filter((p) => p.tools?.some((t) => keys.includes(t)));
}

function CapabilityBlock({
  id,
  cap,
  projects,
}: {
  id: string;
  cap: Capability;
  projects: ProjectMeta[];
}) {
  const works = relatedWorks(cap, projects);
  return (
    <article id={id} className="reveal scroll-mt-20">
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-alt)]">
        <img
          src={cap.image}
          alt={cap.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="text-[13px] tracking-[0.06em] text-white/80">{cap.jp}</p>
          <h4 className="mt-1 text-2xl leading-tight font-bold tracking-tight text-white">
            {cap.label}
          </h4>
        </div>
      </div>

      <ul className="mt-6 space-y-2.5">
        {cap.items.map((item) => (
          <li
            key={item}
            className="jp-phrase flex gap-2.5 text-[15px] leading-snug text-[var(--text-body)]"
          >
            <span
              className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-4 border-t border-[var(--border)] pt-5">
        <div className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
          <dt className="text-[13px] text-[var(--text-sub)]">主なツール</dt>
          <dd className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-[var(--text-body)]">
            {cap.tools.map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <ToolLogo name={t} />
                {t}
              </span>
            ))}
          </dd>
        </div>
        {works.length > 0 && (
          <div className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
            <dt className="text-[13px] text-[var(--text-sub)]">使った作品</dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1.5 text-[14px]">
              {works.map((p) => (
                <Link
                  key={p.slug}
                  href={`/works/${p.slug}/`}
                  className="text-[var(--text-body)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--accent-ink)] hover:decoration-[var(--accent-ink)]"
                >
                  {p.title}
                </Link>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}

/** ロゴがあれば小さく、無ければ点で揃える */
function ToolLogo({ name }: { name: string }) {
  const logo = toolLogos[name];
  return logo ? (
    <img
      src={`/images/logos/${logo}`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="h-5 w-5 shrink-0 rounded-[3px] object-contain"
    />
  ) : (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-mute)]" />
    </span>
  );
}
