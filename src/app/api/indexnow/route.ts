import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const key = process.env.INDEXNOW_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'INDEXNOW_API_KEY not configured' }, { status: 500 })
  }

  const body = await request.json()
  const { urls } = body as { urls: string[] }

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: 'urls array required' }, { status: 400 })
  }

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: 'nairamenus.in',
      key,
      keyLocation: `https://nairamenus.in/${key}.txt`,
      urlList: urls,
    }),
  })

  return NextResponse.json({ success: true, status: response.status })
}
