import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Suppress useLayoutEffect warnings in development
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': require.resolve('react'),
      };
    }
    return config;
  },
  // Suppress specific console warnings in development
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
