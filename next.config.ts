import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ✅ Skip type checking at build time
    ignoreBuildErrors: true,
  },

  /* config options here */ images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "edif-pharma-six.vercel.app",
      },
    ],
  },
};

export default nextConfig;
