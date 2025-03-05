import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/qbv_client',
  assetPrefix: '/qbv_client/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Add experimental support for hash routing
  experimental: {
    scrollRestoration: true,
  }
};

export default nextConfig;
