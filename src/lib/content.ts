import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");

export type ProjectCategory = "research" | "entertainment" | "implementation";

export type ProjectMeta = {
  slug: string;
  number: string;
  hidden?: boolean; // trueで一覧・マーキー・詳細・sitemapから除外（一時非表示）
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  categories?: ProjectCategory[]; // フィルタで複数カテゴリに出したい場合（任意）
  year: string;
  tagline: string;
  abstract?: string; // 詳細ページ冒頭の要約（左画像・右テキスト）。無ければ tagline を使う
  team?: string;
  keyPoints?: { label: string; text: string }[]; // 詳細冒頭のスキャン用要点（課題/アプローチ/成果 等）。あればabstract段落の代わりに表示
  teamType?: "個人" | "チーム"; // 一覧カード・詳細に出すタグ。制作体制の概略
  tags?: string[]; // 文脈タグ（修士課程研究 / 長期インターン 等）。制作体制タグの隣に表示
  aiUsage?: string; // AI利用の明記（どの工程・範囲でAIを使ったか）。あれば詳細ページに表示
  repoUrl?: string; // コード/リポジトリへのリンク。あればタイトル直下に表示
  achievements?: string[];
  tools?: string[];
  imageCount?: number;
  academicRef?: string;
  references?: (string | { text: string; url?: string })[];
  media?: { title: string; url?: string }[];
  videoUrl?: string;
  heroImages?: string[]; // frontmatterで指定した場合、ヒーロー4枚ストリップに使用（ファイル名）
  cover?: string;
  gallery?: string[];
  galleryLayout?: "grid" | "full"; // "grid"で小さめのカラム表示。既定はfull（全幅）
  marqueeImage?: string; // トップのマーキー表示だけ差し替える画像。frontmatterはファイル名、読み込み時にURL化
  cardImages?: string[]; // 一覧カード画像の上書き。2枚=重ね表示（[前面/左下, 背面/右上]）、1枚=単一差し替え。frontmatterはファイル名、読み込み時にURL化
  cardFit?: "cover" | "contain"; // 単一cardImages時の表示。containで横を切らず全体表示。既定cover
  subProjects?: { title: string; year: string; description: string }[];
};

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  summary?: string;
  cover?: string;
  draft?: boolean;
};

type Kind = "projects" | "articles";

const COVER_RE = /^cover\.(jpg|jpeg|png|webp|avif|gif)$/i;
// 数字の直後が区切り文字(-_.スペース)か拡張子のもののみ。94C48B1D-…のようなUUID風は除外
const GALLERY_RE = /^\d+([-_.\s].*)?\.(jpg|jpeg|png|webp|avif|gif)$/i;

function listContentEntries(kind: Kind) {
  const dir = path.join(ROOT, kind);
  if (!fs.existsSync(dir)) return [] as { slug: string; mdxPath: string; folder: string }[];

  const entries: { slug: string; mdxPath: string; folder: string }[] = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      // フォルダ構造: {slug}/index.mdx
      const idx = path.join(full, "index.mdx");
      const idxMd = path.join(full, "index.md");
      if (fs.existsSync(idx)) entries.push({ slug: name, mdxPath: idx, folder: full });
      else if (fs.existsSync(idxMd)) entries.push({ slug: name, mdxPath: idxMd, folder: full });
    } else if (stat.isFile() && /\.mdx?$/.test(name)) {
      // フラット構造（後方互換）: {slug}.mdx
      const slug = name.replace(/\.mdx?$/, "");
      entries.push({ slug, mdxPath: full, folder: "" });
    }
  }
  return entries;
}

const PURE_NUMERIC_RE =
  /^\d+\.(jpg|jpeg|png|webp|avif|gif)$/i;

function leadingNumber(name: string) {
  const m = name.match(/^0*(\d+)/);
  return m ? parseInt(m[1], 10) : Infinity;
}

function autoCoverAndGallery(kind: Kind, slug: string, folder: string) {
  if (!folder) return { cover: undefined, gallery: [] as string[] };
  const imagesDir = path.join(folder, "images");
  if (!fs.existsSync(imagesDir)) return { cover: undefined, gallery: [] };

  const files = fs.readdirSync(imagesDir).filter((f) => !f.startsWith("."));
  const urlBase = `/images/${kind}/${slug}`;

  // 数字始まりの画像をソート：番号昇順、同番号なら pure (1.png) を suffixed (01-foo.png) より優先
  const numbered = files
    .filter((f) => GALLERY_RE.test(f))
    .sort((a, b) => {
      const na = leadingNumber(a);
      const nb = leadingNumber(b);
      if (na !== nb) return na - nb;
      const pa = PURE_NUMERIC_RE.test(a);
      const pb = PURE_NUMERIC_RE.test(b);
      if (pa !== pb) return pa ? -1 : 1;
      return a.localeCompare(b);
    });

  // カバー優先度:
  //   1) 1.png / 1.jpg などの数字始まり画像（番号が最小のもの）
  //   2) なければ cover.{ext} を fallback
  const explicitCover = files.find((f) => COVER_RE.test(f));
  let coverFile: string | undefined;
  let galleryList = numbered;
  if (numbered.length > 0) {
    coverFile = numbered[0];
    galleryList = numbered.slice(1);
  } else if (explicitCover) {
    coverFile = explicitCover;
  }

  return {
    cover: coverFile ? `${urlBase}/${coverFile}` : undefined,
    gallery: galleryList.map((f) => `${urlBase}/${f}`),
  };
}

function readProject(entry: { slug: string; mdxPath: string; folder: string }) {
  const { slug, mdxPath, folder } = entry;
  const raw = fs.readFileSync(mdxPath, "utf-8");
  const { data, content } = matter(raw);
  const auto = autoCoverAndGallery("projects", slug, folder);
  const meta: ProjectMeta = {
    slug,
    cover: data.cover ?? auto.cover,
    gallery: data.gallery ?? auto.gallery,
    ...data,
  } as ProjectMeta;
  // dataを後から展開してslug/cover/galleryを上書きしないよう、再度slugを正規化
  meta.slug = slug;
  // cardImages はファイル名指定 → URL に解決
  if (Array.isArray(data.cardImages)) {
    meta.cardImages = data.cardImages.map(
      (f: string) => `/images/projects/${slug}/${f}`
    );
  }
  // marqueeImage もファイル名指定 → URL に解決
  if (typeof data.marqueeImage === "string") {
    meta.marqueeImage = `/images/projects/${slug}/${data.marqueeImage}`;
  }
  return { meta, body: content };
}

function readArticle(entry: { slug: string; mdxPath: string; folder: string }) {
  const { slug, mdxPath, folder } = entry;
  const raw = fs.readFileSync(mdxPath, "utf-8");
  const { data, content } = matter(raw);
  const auto = autoCoverAndGallery("articles", slug, folder);
  const meta: ArticleMeta = {
    slug,
    cover: data.cover ?? auto.cover,
    ...data,
  } as ArticleMeta;
  meta.slug = slug;
  return { meta, body: content };
}

export function getAllProjects(): ProjectMeta[] {
  return listContentEntries("projects")
    .map((e) => readProject(e).meta)
    .filter((m) => !m.hidden) // hidden: true の作品は一覧・マーキー・詳細・sitemapから除外
    .sort((a, b) => a.number.localeCompare(b.number));
}

export function getProject(slug: string) {
  const entry = listContentEntries("projects").find((e) => e.slug === slug);
  return entry ? readProject(entry) : null;
}

export function getAdjacentProjects(slug: string) {
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: all[0], next: all[0] };
  const prev = idx > 0 ? all[idx - 1] : all[all.length - 1];
  const next = idx < all.length - 1 ? all[idx + 1] : all[0];
  return { prev, next };
}

export function getAllArticles(includeDrafts = false): ArticleMeta[] {
  return listContentEntries("articles")
    .map((e) => readArticle(e).meta)
    .filter((a) => includeDrafts || !a.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string) {
  const entry = listContentEntries("articles").find((e) => e.slug === slug);
  return entry ? readArticle(entry) : null;
}
