import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "大塚 遙 - yohtsuka.com",
  description:
    "関西在住のソフトウェアエンジニア、大塚遙（Yoh Otsuka）のポートフォリオサイトです。プロジェクト実績、経歴、趣味などを紹介しています。",
  keywords: [
    "大塚遙",
    "Yoh Otsuka",
    "yohtsuka",
    "otsuka yoh",
    "大塚",
    "ソフトウェアエンジニア",
    "ポートフォリオ",
    "エンジニア",
    "プログラミング",
    "関西",
    "大阪",
    "Web開発",
    "アプリ開発",
  ],
  authors: [{ name: "大塚遙", url: "https://github.com/yoh-siba" }],
  creator: "大塚遙",
  publisher: "大塚遙",
  robots: "index, follow",
  alternates: {
    canonical: "https://yohtsuka.com",
  },
  openGraph: {
    title: "大塚遙 (Yoh Otsuka) | ソフトウェアエンジニアのポートフォリオ",
    description:
      "関西在住のソフトウェアエンジニア、大塚遙（Yoh Otsuka）のポートフォリオサイトです。プロジェクト実績、経歴、趣味などを紹介しています。",
    type: "website",
    locale: "ja_JP",
    siteName: "大塚遙 - Portfolio",
    url: "https://yohtsuka.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "大塚遙 (Yoh Otsuka) | ソフトウェアエンジニアのポートフォリオ",
    description:
      "関西在住のソフトウェアエンジニア、大塚遙（Yoh Otsuka）のポートフォリオサイトです。",
    creator: "@yohtsuka",
  },
  verification: {
    google: "google-site-verification-code", // Google Search Consoleの検証コードを追加
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
