import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://miraihoshikawa.github.io";
  return [
    { url: `${base}/` },
    ...getAllProjects().map((p) => ({ url: `${base}/works/${p.slug}/` })),
  ];
}
