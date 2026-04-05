import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://media.thefutureacademy.co.za/**")],
  },
  allowedDevOrigins: ["*"],
  transpilePackages: ["@aws-sdk/client-s3"],
}

export default nextConfig;
