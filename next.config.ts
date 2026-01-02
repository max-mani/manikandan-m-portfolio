import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Turbopack is disabled via NEXT_EXPERIMENTAL_TURBOPACK=false in netlify.toml
  // This ensures webpack is used for production builds on Netlify
};

export default nextConfig;
