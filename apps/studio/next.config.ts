import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://media.thefutureacademy.co.za/**")],
  },
  allowedDevOrigins: ["*"],
  serverExternalPackages: [
    "@aws-sdk/client-s3",
    "@aws-sdk/s3-request-presigner",
  ],
}

export default nextConfig;
