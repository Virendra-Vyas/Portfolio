import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages: every route becomes /route/index.html.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
