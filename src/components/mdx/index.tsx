/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

/**
 * MDX 本文内で使えるコンポーネント群。
 * 画像 src はファイル名のみ指定（例: src="Fig1.png"）すると、
 * 親 page から `imageBase` プロパティで補完される URL prefix と結合される。
 */

type ImgProps = {
  src: string;
  alt?: string;
  caption?: ReactNode;
  imageBase?: string;
};

function resolveSrc(src: string, imageBase?: string) {
  if (/^https?:\/\//.test(src) || src.startsWith("/")) return src;
  return imageBase ? `${imageBase}/${src}` : src;
}

/**
 * 1枚の図 + キャプション（中央寄せ、コンテンツ幅）
 * 使い方:
 *   <Fig src="Fig1.png" caption="システム構成図" />
 */
export function Fig({ src, alt, caption, imageBase }: ImgProps) {
  return (
    <figure className="my-10">
      <img
        src={resolveSrc(src, imageBase)}
        alt={alt || (typeof caption === "string" ? caption : "")}
        loading="lazy"
        decoding="async"
        className="w-full"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-[var(--text-mute)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * 横並びの図グリッド（中に Fig を並べる）
 * 使い方:
 *   <FigGrid>
 *     <Fig src="Fig1.png" caption="..." />
 *     <Fig src="Fig2.png" caption="..." />
 *   </FigGrid>
 */
export function FigGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}) {
  const gridClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 md:grid-cols-3",
    4: "sm:grid-cols-2 md:grid-cols-4",
  }[cols];
  return (
    <div className={`my-10 grid gap-6 ${gridClass}`}>{children}</div>
  );
}

/**
 * 図 + テキストの横並び（参考PDFの gutugutu3030 スタイル）
 * 使い方:
 *   <TextImage figure="Fig3.png" caption="..." side="right">
 *     本文...
 *   </TextImage>
 */
export function TextImage({
  children,
  figure,
  caption,
  side = "right",
  imageBase,
}: {
  children: ReactNode;
  figure: string;
  caption?: ReactNode;
  side?: "left" | "right";
  imageBase?: string;
}) {
  const figureBlock = (
    <figure>
      <img
        src={resolveSrc(figure, imageBase)}
        alt={typeof caption === "string" ? caption : ""}
        loading="lazy"
        decoding="async"
        className="w-full"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-[10px] text-[var(--text-mute)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
  return (
    <div className="my-10 grid gap-8 md:grid-cols-2 md:gap-12">
      {side === "left" ? figureBlock : <div>{children}</div>}
      {side === "left" ? <div>{children}</div> : figureBlock}
    </div>
  );
}

/**
 * YouTube/Vimeo 動画埋め込み (16:9)
 * 使い方:
 *   <Video src="https://www.youtube.com/watch?v=XXXX" />
 *   <Video src="XXXX" provider="youtube" />
 */
export function Video({
  src,
  title = "video",
  provider,
}: {
  src: string;
  title?: string;
  provider?: "youtube" | "vimeo";
}) {
  const url = embedUrl(src, provider);
  return (
    <div className="my-10 aspect-video w-full overflow-hidden bg-black">
      <iframe
        src={url}
        title={title}
        loading="lazy"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function embedUrl(src: string, provider?: "youtube" | "vimeo") {
  if (/^https?:\/\//.test(src)) {
    // YouTube full URL → embed URL
    const yt = src.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/
    );
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
    const vm = src.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
    return src;
  }
  if (provider === "vimeo") return `https://player.vimeo.com/video/${src}`;
  return `https://www.youtube.com/embed/${src}`;
}

/**
 * 強調ボックス（ダウンロード・ソースコード等の呼び出し）
 * 使い方:
 *   <Callout>
 *     ソースコード公開中
 *     <a href="...">GitHub</a>
 *   </Callout>
 */
export function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <aside className="my-10 border border-[var(--border)] bg-[var(--bg-alt)] p-5">
      {title && (
        <p className="mb-2 text-[10px] font-mono tracking-[0.2em] text-[var(--text-mute)] uppercase">
          {title}
        </p>
      )}
      <div className="text-sm text-[var(--text-sub)]">{children}</div>
    </aside>
  );
}

/**
 * 画像を掲載できない箇所のプレースホルダ（著作権等で非掲載の作業）。
 * 使い方:
 *   <NoImage caption="Da-iCE ライブ映像演出 — 著作権の関係で非掲載" />
 */
export function NoImage({ caption }: { caption?: ReactNode }) {
  return (
    <figure className="my-10">
      <div className="flex aspect-video w-full items-center justify-center border border-dashed border-[var(--border)] bg-[var(--bg-alt)]">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--text-mute)] uppercase">
          No Image
        </span>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-[var(--text-mute)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * 外部サイトへのリッチリンクカード（記事の埋め込みリンク風）。
 * 使い方:
 *   <LinkCard src="Fig_official.jpg" href="https://..." title="..." description="..." />
 */
export function LinkCard({
  src,
  href,
  title,
  description,
  imageBase,
}: {
  src: string;
  href: string;
  title: string;
  description?: ReactNode;
  imageBase?: string;
}) {
  let host = href;
  try {
    host = new URL(href).host.replace(/^www\./, "");
  } catch {}
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group my-10 flex flex-col overflow-hidden border border-[var(--border)] bg-[var(--bg-alt)] no-underline transition-colors hover:border-[var(--accent)] sm:flex-row"
    >
      <div className="aspect-[1200/630] w-full shrink-0 overflow-hidden bg-[var(--bg)] sm:aspect-auto sm:w-[44%]">
        <img
          src={resolveSrc(src, imageBase)}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 p-5">
        <p className="text-sm font-bold leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {title}
        </p>
        {description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-mute)]">
            {description}
          </p>
        )}
        <p className="mt-1 font-mono text-[10px] tracking-wider text-[var(--text-mute)]">
          {host} ↗
        </p>
      </div>
    </a>
  );
}

/**
 * MDXRemote の components prop に渡すマップ。
 * imageBase を子コンポーネントに自動で注入するため、ラッパーでカリー化する。
 */
export function mdxComponents(imageBase: string) {
  return {
    Fig: (props: ImgProps) => <Fig {...props} imageBase={imageBase} />,
    NoImage,
    LinkCard: (props: {
      src: string;
      href: string;
      title: string;
      description?: ReactNode;
    }) => <LinkCard {...props} imageBase={imageBase} />,
    FigGrid: (props: { children: ReactNode; cols?: 2 | 3 | 4 }) => (
      <FigGrid {...props} />
    ),
    TextImage: (props: {
      children: ReactNode;
      figure: string;
      caption?: ReactNode;
      side?: "left" | "right";
    }) => <TextImage {...props} imageBase={imageBase} />,
    Video,
    Callout,
  };
}
