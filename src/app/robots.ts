import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // 機材の写真とソフトのロゴは本人の作品ではないので、画像検索に出さない（11/14 本人）
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/images/skills/", "/images/logos/"],
    },
    sitemap: "https://miraihoshikawa.github.io/sitemap.xml",
  };
}
