import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // {
      //   source: '/about',
      //   destination: '/',
      //   permanent: false,
      // },
      {
        source: '/services/:path*',
        destination: '/',
        permanent: false,
      },
      // {
      //   source: '/kundli',
      //   destination: '/',
      //   permanent: false,
      // },
      // {
      //   source: '/horoscope',
      //   destination: '/',
      //   permanent: false,
      // },
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
      // {
      //   source: '/booking',
      //   destination: '/',
      //   permanent: false,
      // },
    ];
  },
};

export default nextConfig;
