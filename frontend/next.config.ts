import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivityPosition: "top-right",
    buildActivity: true,
    appIsrStatus: true,
  },
};

export default nextConfig;