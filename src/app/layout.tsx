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
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://meu-portfolio-robsonrodrigues.vercel.app";

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
        url: "/opengraph-image",
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
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" translate="no" className="notranslate" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Protect React against Google Translate and browser extensions mutating DOM nodes
              if (typeof window !== "undefined" && typeof Node !== "undefined") {
                var origRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function (child) {
                  if (child && child.parentNode && child.parentNode !== this) {
                    return child.parentNode.removeChild(child);
                  }
                  return origRemoveChild.call(this, child);
                };
                var origInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function (newNode, refNode) {
                  if (refNode && refNode.parentNode && refNode.parentNode !== this) {
                    return refNode.parentNode.insertBefore(newNode, refNode);
                  }
                  return origInsertBefore.call(this, newNode, refNode);
                };
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} notranslate`} translate="no">
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
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}