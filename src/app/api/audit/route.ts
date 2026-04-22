import { NextResponse } from 'next/server'

export const maxDuration = 30

async function fetchPageSpeed(apiUrl: string): Promise<number | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 22000)
  try {
    const res = await fetch(apiUrl, { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) return null
    const data = await res.json()
    const raw = data?.lighthouseResult?.categories?.performance?.score
    return raw !== undefined && raw !== null ? Math.round((raw as number) * 100) : null
  } catch {
    clearTimeout(timeout)
    return null
  }
}

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

    const key = process.env.GOOGLE_PAGESPEED_API_KEY
    const keyParam = key ? `&key=${key}` : ''
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile${keyParam}`

    let pageSpeedScore = await fetchPageSpeed(apiUrl)
    if (pageSpeedScore === null) {
      await new Promise(r => setTimeout(r, 2000))
      pageSpeedScore = await fetchPageSpeed(apiUrl)
    }

    return NextResponse.json({ pageSpeedScore, url })
  } catch {
    return NextResponse.json({ pageSpeedScore: null, error: 'Could not fetch page speed' })
  }
}
