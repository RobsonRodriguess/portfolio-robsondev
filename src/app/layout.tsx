import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importe o seu componente aqui (ajuste o caminho se necessário)
import FloatingSpotify from "@/components/FloatingSpotify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robson | Developer Portfolio",
  description: "Full Stack & Game Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a]`}
      >
        {/* O children é o conteúdo de cada página */}
        {children}

        {/* O Spotify flutuante fica aqui para aparecer em todo o site */}
        <FloatingSpotify />
      </body>
    </html>
  );
}