import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

function generateId(email: string, plan: string): string {
  const key = `${email.toLowerCase().trim()}-${plan}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0
  }
  return `pricingNotify-${Math.abs(hash).toString(36)}`
}

export async function POST(req: Request) {
  try {
    const { email, plan } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const normalizedPlan = plan || 'unknown'
    const id = generateId(email, normalizedPlan)

    await writeClient.createIfNotExists({
      _id: id,
      _type: 'pricingNotify',
      email: email.toLowerCase().trim(),
      plan: normalizedPlan,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
