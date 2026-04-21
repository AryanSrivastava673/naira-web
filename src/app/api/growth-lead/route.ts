import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function POST(req: Request) {
  try {
    const { restaurantName, name, phone, email, auditScore, quizAnswers, source } = await req.json()

    if (!restaurantName || !name || !phone || !email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'growthLead',
      restaurantName,
      name,
      phone,
      email,
      auditScore: auditScore ?? null,
      quizAnswers: quizAnswers ?? null,
      source: source ?? 'growth-page',
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
