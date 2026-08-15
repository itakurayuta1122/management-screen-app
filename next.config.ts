import type { NextConfig } from "next";

const repo = "management-screen-app";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // 本番環境（デプロイ時）のみ basePath を有効にする
  basePath: isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;