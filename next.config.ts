import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 builds a static copy for previewing outside Vercel.
const isPreviewExport = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = isPreviewExport
  ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
  : {};

export default nextConfig;
