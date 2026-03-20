import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function POST(req: Request) {
  try {
    const { businessName, city, pincode, phone } = await req.json()

    if (!businessName || !city || !pincode || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'demoRequest',
      businessName,
      city,
      pincode,
      phone,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}
