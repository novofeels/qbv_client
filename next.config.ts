import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  trailingSlash: true, // This forces Next.js to output directories with trailing slashes
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
