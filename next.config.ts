import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: '/qbv_client/',
  trailingSlash: true, // This forces Next.js to output directories with trailing slashes
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
