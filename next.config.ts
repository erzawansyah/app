import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Sesuaikan dengan domain gambar
      },
    ],
  },
};

export default nextConfig;
