/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      // Renamed blog slugs → current URL (301). Append future renames here so
      // the old URL 301s to the new post instead of serving a stale duplicate.
      {
        source: '/blog/5-reasons-why-changing-your-restaurant-menu-matters',
        destination: '/blog/5-reasons-why-changing-your-restaurant-menu-matters-reddit',
        statusCode: 301,
      },
      // www → apex
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.nairamenus.in' }],
        destination: 'https://nairamenus.in/:path*',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
