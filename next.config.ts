import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Replace 'your-repo-name' with your actual GitHub repository name
  basePath: '/qbv_client',
  images: {
    unoptimized: true,
  },
  // Keep any other existing config options you had
};

export default nextConfig;