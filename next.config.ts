import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/qbv_client',
  assetPrefix: '/qbv_client/', // Add this line with trailing slash
  images: {
    unoptimized: true,
  },
  // Keep any other existing config options you had
};

export default nextConfig;