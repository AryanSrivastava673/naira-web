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
  async rewrites() {
    return {
      // Run BEFORE the filesystem/app-router check, so these take precedence over
      // the Next pages that also live at these paths (app/page.tsx, app/tap, app/
      // billing, app/growth). Those components are intentionally left in the repo —
      // removing this block restores the previous site, and scripts/check-ssr.mjs
      // still validates them. The redesigned pages are self-contained static files
      // (public/site/*.html) with their own CSS, so they must not be wrapped in the
      // app layout.
      beforeFiles: [
        { source: '/', destination: '/site/index.html' },
        { source: '/tap', destination: '/site/tap.html' },
        { source: '/billing', destination: '/site/billing.html' },
        { source: '/growth', destination: '/site/growth.html' },
      ],
      afterFiles: [
        // Serves the static public/privacy-policy.html file at a clean, extension-less
        // URL. This is a rewrite (URL bar stays /privacy-policy), not a redirect — the
        // .html file remains reachable directly too, so nothing that already links to
        // it breaks.
        {
          source: '/privacy-policy',
          destination: '/privacy-policy.html',
        },
        // Quick Solutions product page — a self-contained static page
        // (public/quick-solutions.html, assets under public/quick-solutions/).
        {
          source: '/quick-solutions',
          destination: '/quick-solutions.html',
        },
      ],
    };
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
