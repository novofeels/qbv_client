import type { NextConfig } from "next";

// Check if we're in Vercel environment
const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  output: 'export',
  // Only use basePath and assetPrefix for GitHub Pages, not for Vercel
  ...(isVercel ? {} : {
    basePath: '/qbv_client',
    assetPrefix: '/qbv_client/',
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;