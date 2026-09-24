'use client'

import { useState } from 'react'
import styles from '@/app/growth/growth.module.css'

export default function ClosingCTA() {
  const [form, setForm] = useState({ name: '', business: '', area: '', phone: '' })

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { name, business, area, phone } = form
    if (!name.trim() || !business.trim() || !phone.trim()) return

    const msg =
      'Hi Naira Growth, I would like the free visibility check.\n\n' +
      `Name: ${name}\n` +
      `Business: ${business}\n` +
      (area.trim() ? `Area: ${area}\n` : '') +
      `Phone: ${phone}`

    window.open(`https://wa.me/919225344169?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <section id="talk" className={`${styles.spread} ${styles.dark} ${styles.darkRoundT}`} style={{ paddingBottom: 'clamp(28px,3vw,44px)' }}>
      <div className={`${styles.inner} ${styles.onDark}`}>
        <div className={styles.ctaGrid}>
          <div>
            <span className={`${styles.pill} ${styles.pillPink}`} style={{ marginBottom: 22 }}>
              <span className={`${styles.dot} ${styles.dotLive}`}></span>Only limited slots open
            </span>
            <h2 className={styles.h1} style={{ color: '#fff' }}>
              Start with a free look at where you stand <span className={styles.accent}>today.</span>
            </h2>
            <p className={`${styles.lead} ${styles.leadDark}`}>
              We research every business by hand before we take it on, and we quote only after that. No fixed
              packages, and no rush.
            </p>
          </div>
          <div>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.fieldWide}>
                <label htmlFor="lf-name">Your name</label>
                <input id="lf-name" name="name" type="text" autoComplete="name" placeholder="Ravi Kulkarni" required value={form.name} onChange={update('name')} />
              </div>
              <div className={styles.field}>
                <label htmlFor="lf-biz">Business name</label>
                <input id="lf-biz" name="business" type="text" autoComplete="organization" placeholder="Southbond Cafe" required value={form.business} onChange={update('business')} />
              </div>
              <div className={styles.field}>
                <label htmlFor="lf-area">Area</label>
                <input id="lf-area" name="area" type="text" placeholder="Baner, Pune" value={form.area} onChange={update('area')} />
              </div>
              <div className={styles.fieldWide}>
                <label htmlFor="lf-phone">Phone or WhatsApp number</label>
                <input id="lf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 90000 00000" required value={form.phone} onChange={update('phone')} />
              </div>
              <button className={`${styles.btn} ${styles.btnPink} ${styles.btnLg}`} type="submit">
                Get my free check
              </button>
            </form>
            <p className={styles.altcontact}>
              Would rather not fill a form?{' '}
              <a
                href="https://wa.me/919225344169?text=Hi%20Naira%20Growth%2C%20I%27d%20like%20a%20free%20look%20at%20where%20my%20business%20stands%20on%20Google."
                target="_blank"
                rel="noopener"
              >
                Message us on WhatsApp
              </a>{' '}
              or <a href="mailto:support@nairamenus.in?subject=Free%20visibility%20check">send an email</a>.
            </p>

            <div className={styles.contact}>
              <a href="https://wa.me/919225344169" target="_blank" rel="noopener">
                <span className={styles.ci}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91a9.85 9.85 0 0 0-9.91-9.93Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24s8.24 3.7 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Z" />
                  </svg>
                </span>
                <span><small>WhatsApp</small>92253 44169</span>
              </a>
              <a href="tel:+919225344169">
                <span className={styles.ci}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1Z" />
                  </svg>
                </span>
                <span><small>Call</small>+91 92253 44169</span>
              </a>
              <a href="mailto:support@nairamenus.in">
                <span className={styles.ci}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6L22 7" />
                  </svg>
                </span>
                <span><small>Email</small>support@nairamenus.in</span>
              </a>
            </div>
            <p className={styles.cap} style={{ marginTop: 18, color: 'var(--on-dark-dim)' }}>
              We reply on WhatsApp within a few hours, 9 am to 9 pm IST.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
