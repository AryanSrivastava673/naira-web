import { NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return NextResponse.json({ error: 'URL must start with http:// or https://' }, { status: 400 })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 25000)

    try {
      const key = process.env.GOOGLE_PAGESPEED_API_KEY
      const keyParam = key ? `&key=${key}` : ''
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile${keyParam}`
      const res = await fetch(apiUrl, { signal: controller.signal })
      clearTimeout(timeout)

      if (!res.ok) {
        return NextResponse.json({ pageSpeedScore: null, error: 'Could not fetch page speed' })
      }

      const data = await res.json()
      const raw = data?.lighthouseResult?.categories?.performance?.score
      const pageSpeedScore =
        raw !== undefined && raw !== null ? Math.round((raw as number) * 100) : null

      return NextResponse.json({ pageSpeedScore, url })
    } catch {
      clearTimeout(timeout)
      return NextResponse.json({ pageSpeedScore: null, error: 'Could not fetch page speed' })
    }
  } catch {
    return NextResponse.json({ pageSpeedScore: null, error: 'Could not fetch page speed' })
  }
}
