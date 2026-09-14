import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'
import { escapeHtml, sendNotificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, phone, restaurantName, interest, message, email } = body as Record<string, string>

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
  }

  // Sanity and email are independent: a failure in one must not prevent the other.
  const [sanityResult, emailResult] = await Promise.allSettled([
    writeClient.create({
      _type: 'demoRequest',
      businessName: restaurantName || name,
      city: '',
      pincode: '',
      phone,
      note: message || '',
      submittedAt: new Date().toISOString(),
    }),
    sendNotificationEmail({
      subject: `New enquiry from ${name}${restaurantName ? ` — ${restaurantName}` : ''}`,
      replyTo: typeof email === 'string' && email.includes('@') ? email : undefined,
      html: buildHtml({ name, phone, restaurantName, interest, email, message }),
    }),
  ])

  const savedToSanity = sanityResult.status === 'fulfilled'
  const emailSent = emailResult.status === 'fulfilled'

  if (!savedToSanity) {
    console.error('[demo-request] Sanity write failed', sanityResult.reason)
  }
  if (!emailSent) {
    console.error('[demo-request] Email send failed', emailResult.reason)
  }

  // Only fail the request if the submission was lost entirely.
  if (!savedToSanity && !emailSent) {
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }

  return NextResponse.json({ success: true, savedToSanity, emailSent })
}

function buildHtml(fields: Record<string, string | undefined>) {
  const rows: [string, string][] = [
    ['Name', fields.name || '—'],
    ['Phone', fields.phone || '—'],
    ['Restaurant', fields.restaurantName || '—'],
    ['Interest', fields.interest || '—'],
    ['Email', fields.email || '—'],
    ['Message', fields.message || '—'],
  ]

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.6">
      <h2 style="margin:0 0 16px">New "Drop us a message" submission</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#666;vertical-align:top"><strong>${label}</strong></td><td>${escapeHtml(
                String(value)
              )}</td></tr>`
          )
          .join('')}
      </table>
      <p style="color:#888;font-size:12px;margin-top:20px">Sent from nairamenus.com contact form</p>
    </div>
  `
}
