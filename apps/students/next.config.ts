import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://media.thefutureacademy.co.za/**")],
  },
  allowedDevOrigins: ["*"],
}
export default nextConfig;
