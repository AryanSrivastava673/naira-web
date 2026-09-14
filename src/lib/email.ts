import nodemailer from 'nodemailer'

const DEFAULT_RECIPIENTS = [
  'naira.menus@gmail.com',
  'Aryan <aryansrivastava673@gmail.com>',
  'ashay gohad <ashay1138@gmail.com>',
]

type SendEmailOptions = {
  subject: string
  html: string
  replyTo?: string
}

/**
 * Fire-and-forget notification email to the Naira inbox.
 * Never throws — form submissions must not fail because email delivery did.
 */
export async function sendNotificationEmail({ subject, html, replyTo }: SendEmailOptions) {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const port = Number(process.env.SMTP_PORT || 587)
  const from = process.env.CONTACT_EMAIL_FROM || 'Naira Menus <support@nairamenus.in>'
  const to = (process.env.CONTACT_EMAIL_TO || DEFAULT_RECIPIENTS.join(','))
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)

  if (!host || !user || !pass) {
    console.warn('[email] SMTP_HOST / SMTP_USER / SMTP_PASS not set — skipping email')
    return
  }

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implicit TLS; 587 upgrades via STARTTLS
      auth: { user, pass },
    })

    await transport.sendMail({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    })
  } catch (err) {
    console.error('[email] Failed to send notification', err)
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
