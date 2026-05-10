import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure webpack is used instead of Turbopack for production builds
  // Turbopack is disabled via environment variable in netlify.toml
  async redirects() {
    return [
      { source: "/wirteups", destination: "/writeups", permanent: true },
      { source: "/wirteups/:path*", destination: "/writeups/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
