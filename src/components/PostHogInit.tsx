'use client'

import posthog from 'posthog-js'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PostHogInit() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: true,
      })
    }
  }, [])

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || !posthog.__loaded) return
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    posthog.capture('$pageview', { $current_url: window.origin + url })
  }, [pathname, searchParams])

  return null
}
