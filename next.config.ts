import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly configure Turbopack to silence dev mode warnings
  // Production builds (next build) use webpack by default
  turbopack: {},
};

export default nextConfig;
