import type { NextConfig } from "next";

import { getRewriteApiUrl } from "./lib/env";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = getRewriteApiUrl();
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
