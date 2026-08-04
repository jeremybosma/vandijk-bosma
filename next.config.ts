import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["symbols-react"],
  },
};

export default nextConfig;
