import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/collections/face-care",
        destination: "/shop?category=face-care",
        permanent: true,
      },
      {
        source: "/collections/hair-care",
        destination: "/shop?category=hair-care",
        permanent: true,
      },
      {
        source: "/collections/combos",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/pages/acne-care",
        destination: "/pages/acne-pimples",
        permanent: true,
      },
      {
        source: "/pages/glow-routine",
        destination: "/pages/dull-skin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
