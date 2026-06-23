import type { MetadataRoute } from "next";
import { getAllProjects, getAllArticles } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://miraihoshikawa.github.io";
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/about/`, priority: 0.8 },
    { url: `${base}/works/`, priority: 0.8 },
    { url: `${base}/skills/`, priority: 0.6 },
    { url: `${base}/articles/`, priority: 0.4 },
    ...getAllProjects().map((p) => ({
      url: `${base}/works/${p.slug}/`,
      priority: 0.7,
    })),
    ...getAllArticles().map((a) => ({
      url: `${base}/articles/${a.slug}/`,
      priority: 0.4,
    })),
  ];
}
