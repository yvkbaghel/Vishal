import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/gallery',
        destination: '/',
        permanent: false,
      },
      {
        source: '/testimonials',
        destination: '/',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
