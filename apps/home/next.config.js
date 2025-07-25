/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  trailingSlash: true,
  transpilePackages: ['shared'],
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: 'http://localhost:3001/cart/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com']
  },
};

module.exports = nextConfig;