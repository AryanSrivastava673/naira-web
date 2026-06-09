import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const PostHogInit = dynamic(() => import('@/components/PostHogInit'), { ssr: false })

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'optional',
})

export const metadata: Metadata = {
  title: 'Naira Menus — The Future of Restaurant Operations',
  description:
    'NFC-powered digital menus for Indian restaurants. Replace paper menus with smart QR/NFC menus, manage orders, and grow your business with Naira.',
  keywords: 'NFC menu, digital menu, restaurant POS, QR menu, restaurant management',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Naira Menus',
    description: 'NFC-powered digital menus for Indian restaurants. Replace paper menus with smart QR/NFC menus, manage orders, and grow your business with Naira.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://eu.i.posthog.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://nairamenus.in/#organization',
                  name: 'Naira Menus',
                  url: 'https://nairamenus.in',
                  logo: 'https://nairamenus.in/icon.png',
                  description:
                    'NFC-powered digital menus for Indian restaurants. Replace paper menus with smart QR/NFC menus, manage orders, and grow your business.',
                  sameAs: [],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://nairamenus.in/#website',
                  url: 'https://nairamenus.in',
                  name: 'Naira Menus',
                  publisher: { '@id': 'https://nairamenus.in/#organization' },
                },
              ],
            }),
          }}
        />
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MXN7T65Q');`}
        </Script>
      </head>
      <body className="bg-naira-black text-naira-text antialiased" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXN7T65Q"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Suspense fallback={null}>
          <PostHogInit />
        </Suspense>
      </body>
    </html>
  )
}
