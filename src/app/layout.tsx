import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { SoundProvider } from "@/components/SoundContext";
import SoundToggle from "@/components/SoundToggle";
import { LanguageProvider } from "@/components/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://robsondev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Robson Rodrigues | Software Engineer & Fullstack Developer",
    template: "%s | Robson Rodrigues",
  },
  description:
    "Software Engineer based in Brasília, DF. Specialized in Next.js, React, TypeScript, Node.js, and fullstack development. View projects, skills, and experience.",
  keywords: [
    "Software Engineer",
    "Fullstack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Brasilia",
    "Robson Rodrigues",
  ],
  authors: [{ name: "Robson Rodrigues", url: "https://github.com/RobsonRodriguess" }],
  creator: "Robson Rodrigues",
  publisher: "Robson Rodrigues",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Robson Rodrigues Portfolio",
    title: "Robson Rodrigues | Software Engineer & Fullstack Developer",
    description:
      "Software Engineer based in Brasília, DF. Specialized in Next.js, React, TypeScript, Node.js, and fullstack development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Robson Rodrigues - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robson Rodrigues | Software Engineer",
    description: "Software Engineer specialized in Next.js, React, TypeScript, and fullstack development.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SoundProvider>
            <LanguageProvider>
              <ThemeToggle />
              <SoundToggle />
              <LanguageToggle />
              {children}
            </LanguageProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}