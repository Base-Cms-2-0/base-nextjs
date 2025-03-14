import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api-docs",
        destination: "/api/swagger",
      },
    ];
  },
};

export default nextConfig;
