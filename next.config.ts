import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure webpack is used instead of Turbopack for production builds
  // Turbopack is disabled via environment variable in netlify.toml
};

export default nextConfig;
