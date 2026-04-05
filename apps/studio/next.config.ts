import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://media.thefutureacademy.co.za/**")],
  },
  allowedDevOrigins: ["*"],
  output: "standalone",
  outputFileTracingIncludes: {
    "/api/upload": ["./node_modules/@aws-sdk/**"],
  },
  experimental: {
    // 2. Force the AWS SDK to be bundled rather than treated as an external module
    serverComponentsExternalPackages: [],
  },
  serverExternalPackages: [
    "@aws-sdk/client-s3",
    "@aws-sdk/s3-request-presigner",
  ],
}

export default nextConfig;
