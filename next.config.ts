import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co", // Libera as imagens oficiais das capas do Spotify
      },
    ],
  },
};

export default nextConfig;