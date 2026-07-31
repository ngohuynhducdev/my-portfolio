import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* All images are local to /public — no remotePatterns needed. */
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
