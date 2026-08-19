import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/hero-sequence/**" },
      { pathname: "/logo-mark.png" },
    ],
  },
};

export default nextConfig;
