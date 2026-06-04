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

function readContentDir(sub: "projects" | "articles") {
  const dir = path.join(ROOT, sub);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx?$/, "");
      return { slug, data, content };
    });
}

export function getAllProjects(): ProjectMeta[] {
  return readContentDir("projects")
    .map(({ slug, data }) => ({ slug, ...data } as ProjectMeta))
    .sort((a, b) => a.number.localeCompare(b.number));
}

export function getProject(
  slug: string
): { meta: ProjectMeta; body: string } | null {
  const dir = path.join(ROOT, "projects");
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const name of candidates) {
    const fp = path.join(dir, name);
    if (fs.existsSync(fp)) {
      const { data, content } = matter(fs.readFileSync(fp, "utf-8"));
      return { meta: { slug, ...data } as ProjectMeta, body: content };
    }
  }
  return null;
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
  return readContentDir("articles")
    .map(({ slug, data }) => ({ slug, ...data } as ArticleMeta))
    .filter((a) => includeDrafts || !a.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(
  slug: string
): { meta: ArticleMeta; body: string } | null {
  const dir = path.join(ROOT, "articles");
  for (const name of [`${slug}.mdx`, `${slug}.md`]) {
    const fp = path.join(dir, name);
    if (fs.existsSync(fp)) {
      const { data, content } = matter(fs.readFileSync(fp, "utf-8"));
      return { meta: { slug, ...data } as ArticleMeta, body: content };
    }
  }
  return null;
}
