import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");

export type ProjectCategory = "research" | "entertainment" | "implementation";

export type ProjectMeta = {
  slug: string;
  number: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  year: string;
  tagline: string;
  team?: string;
  achievements?: string[];
  tools?: string[];
  imageCount?: number;
  academicRef?: string;
  cover?: string;
  gallery?: string[];
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
const GALLERY_RE = /^\d+.*\.(jpg|jpeg|png|webp|avif|gif)$/i;

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

function autoCoverAndGallery(kind: Kind, slug: string, folder: string) {
  if (!folder) return { cover: undefined, gallery: [] as string[] };
  const imagesDir = path.join(folder, "images");
  if (!fs.existsSync(imagesDir)) return { cover: undefined, gallery: [] };

  const files = fs.readdirSync(imagesDir).filter((f) => !f.startsWith("."));
  const coverFile = files.find((f) => COVER_RE.test(f));
  const galleryFiles = files
    .filter((f) => GALLERY_RE.test(f))
    .sort((a, b) => a.localeCompare(b));

  const urlBase = `/images/${kind}/${slug}`;
  return {
    cover: coverFile ? `${urlBase}/${coverFile}` : undefined,
    gallery: galleryFiles.map((f) => `${urlBase}/${f}`),
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
