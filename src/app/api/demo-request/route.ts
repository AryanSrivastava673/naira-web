import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function POST(req: Request) {
  try {
    const { name, phone, restaurantName, message } = await req.json()

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'demoRequest',
      businessName: restaurantName || name,
      city: '',
      pincode: '',
      phone,
      note: message || '',
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}
