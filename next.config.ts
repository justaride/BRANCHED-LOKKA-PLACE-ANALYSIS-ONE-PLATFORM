import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85, 90], // Support multiple image quality levels
  },
};

export default nextConfig;
