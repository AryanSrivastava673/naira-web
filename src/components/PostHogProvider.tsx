'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ph = usePostHog()
  const lastUrl = useRef('')

  useEffect(() => {
    if (!pathname || !ph) return
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    if (url !== lastUrl.current) {
      lastUrl.current = url
      ph.capture('$pageview', { $current_url: window.origin + url })
    }
  }, [pathname, searchParams, ph])

  return null
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: true,
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') ph.debug()
        },
      })
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}
