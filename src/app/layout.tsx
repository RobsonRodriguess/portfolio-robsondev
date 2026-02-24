import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { SoundProvider } from "@/components/SoundContext"; // NOVO IMPORT
import SoundToggle from "@/components/SoundToggle"; // NOVO IMPORT

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Robson | Fullstack Developer",
  description: "Portfólio de Robson Rodrigues - Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SoundProvider> {/* 🔥 ENVOLVEU COM O SOUND PROVIDER */}
            <ThemeToggle />
            <SoundToggle /> {/* 🔥 ADICIONOU O BOTÃO DE SOM */}
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}