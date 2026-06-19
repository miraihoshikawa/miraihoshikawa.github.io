import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WaterBackground } from "@/components/layout/WaterBackground";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jp",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miraihoshikawa.github.io"),
  title: {
    default: "干川未来 | Portfolio",
    template: "%s | 干川未来",
  },
  description:
    "干川未来のポートフォリオ。生体情報で動く支援ロボットの研究、インタラクティブアート・XR体験、イベント配信統合システムの実運用——Research / Entertainment / Implementation を横断する制作記録。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Mirai Hoshikawa Portfolio",
    images: ["/images/profile/portrait.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mirai Hoshikawa",
  alternateName: "干川未来",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Tsukuba",
  },
  url: "https://miraihoshikawa.github.io/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <body className="text-[var(--text)] antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-on')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <WaterBackground />
        <ScrollReveal />
        <Header />
        <main className="relative z-[1]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
