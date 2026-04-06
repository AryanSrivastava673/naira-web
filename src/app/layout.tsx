import type { Metadata } from 'next'
import { Suspense } from 'react'
import PostHogProvider from '@/components/PostHogProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Naira Menus — The Future of Restaurant Operations',
  description:
    'NFC-powered digital menus, smart POS, and growth tools for modern restaurants. Say goodbye to paper menus.',
  keywords: 'NFC menu, digital menu, restaurant POS, QR menu, restaurant management',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Naira Menus',
    description: 'NFC-powered digital menus, smart POS, and growth tools for modern restaurants.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-naira-black text-naira-text antialiased" suppressHydrationWarning>
        <Suspense fallback={null}>
          <PostHogProvider>{children}</PostHogProvider>
        </Suspense>
      </body>
    </html>
  )
}
