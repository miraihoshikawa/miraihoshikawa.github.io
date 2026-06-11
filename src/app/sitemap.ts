import type { MetadataRoute } from "next";
import { getAllProjects, getAllArticles } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://miraihoshikawa.github.io";
  return [
    { url: `${base}/` },
    { url: `${base}/articles/` },
    ...getAllProjects().map((p) => ({ url: `${base}/works/${p.slug}/` })),
    ...getAllArticles().map((a) => ({ url: `${base}/articles/${a.slug}/` })),
  ];
}
