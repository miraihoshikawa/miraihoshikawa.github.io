import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jp",
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
    <html lang="ja" className={notoSansJP.variable}>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
