import Image from 'next/image'
import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

const FIELDS = [
  {
    title: 'Business information',
    body: 'Name, category, description and attributes',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9h18l-1.5-4.5A2 2 0 0 0 17.6 3H6.4a2 2 0 0 0-1.9 1.5Z" />
        <path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
      </svg>
    ),
  },
  {
    title: 'Address & service areas',
    body: 'Map pin, service areas and directions that land at your door',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Hours',
    body: 'Open, close, festival and special hours',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'Contact',
    body: 'Phone number, WhatsApp and website link',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1Z" />
      </svg>
    ),
  },
  {
    title: 'Photos',
    body: 'Food, interiors, the team and the storefront, refreshed monthly',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m21 16-5-5L5 20" />
      </svg>
    ),
  },
  {
    title: 'Reviews',
    body: 'Requests to happy customers, replies to everyone',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2-5.4-2.9-5.4 2.9 1-6.2L3.2 9.5l6.1-.9Z" />
      </svg>
    ),
  },
  {
    title: 'Performance',
    body: 'How customers found you, and what they did next',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10M10 20V4m6 16v-7m6 7V8" />
      </svg>
    ),
  },
]

const CHIPS = [
  'WhatsApp integration through our API',
  'Website building',
  'SEO optimisation',
  'Reviews and ratings system',
  'Hyper local newsletter',
  'Google policy updates',
  'Zomato & Swiggy page cleanup',
  'Festival and event calendar',
]

const POPULAR_TIMES = [14, 20, 30, 42, 55, 70, 86, 100, 92, 78, 62, 48, 34, 22, 12]

export default function ProfileAnatomy() {
  return (
    <section id="profile" className={`${styles.spread} ${styles.paperDeep}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>
            Your Google profile is your business&rsquo;s first impression. We review everything.
          </h2>
          <p className={styles.lead}>
            Before anything else we study your location, your surroundings, the competition close to you and the
            kind of business you are. Then we work through every field a customer sees.
          </p>
        </Reveal>

        <Reveal className={styles.gbpWrap}>
          <div>
            <svg width="196" height="20" viewBox="0 0 196 20" aria-label="Google Business Profile">
              <text x="0" y="15" fontFamily="Inter,sans-serif" fontSize="15" fontWeight="500">
                <tspan fill="#4285F4">G</tspan>
                <tspan fill="#EA4335">o</tspan>
                <tspan fill="#FBBC05">o</tspan>
                <tspan fill="#4285F4">g</tspan>
                <tspan fill="#34A853">l</tspan>
                <tspan fill="#EA4335">e</tspan>
                <tspan fill="#5f6368" dx="6">Business Profile</tspan>
              </text>
            </svg>
            <h3 className={styles.gbpTitle}>
              Fixing your
              <br />
              Google Business Profile
            </h3>
            <p style={{ margin: 0, fontSize: 14.5, color: 'var(--body)', lineHeight: 1.55 }}>
              We review and update the key information customers see on Google, then keep it current.
            </p>

            <ul className={styles.fields}>
              {FIELDS.map((f) => (
                <li key={f.title}>
                  <span className={styles.fi}>{f.icon}</span>
                  <span>
                    <h4>{f.title}</h4>
                    <p>{f.body}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.gbp} role="img" aria-label="Illustration of a Google Business Profile listing for a sample café">
            <div className={styles.gbpPhotos}>
              <div className={styles.gbpPh} style={{ background: '#4a3b2f' }}>
                <Image src="/growth/cafe-interior.jpg" alt="" width={640} height={340} />
                <span>See photos</span>
              </div>
              <div className={styles.gbpPh} style={{ background: 'linear-gradient(155deg,#dfe6d8,#b9c9ae)' }}>
                <svg viewBox="0 0 120 132" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
                  <rect width="120" height="132" fill="#eaf0e4" />
                  <path d="M0 44h120M0 92h120M38 0v132M84 0v132" stroke="#d5dfcd" strokeWidth="5" />
                  <path d="M0 22h120" stroke="#fff" strokeWidth="3" />
                  <ellipse cx="60" cy="80" rx="7" ry="2.5" fill="rgba(0,0,0,.18)" />
                  <path d="M60 46a11 11 0 0 0-11 11c0 8 11 22 11 22s11-14 11-22a11 11 0 0 0-11-11Z" fill="#ea4335" />
                  <circle cx="60" cy="57" r="4" fill="#fff" />
                </svg>
                <span style={{ zIndex: 1 }}>Riverwood Rd</span>
              </div>
            </div>
            <div className={styles.gbpBody}>
              <p className={styles.gbpName}>Riverwood Café</p>
              <p className={styles.gbpSub}>
                <span className={styles.starsR}>★★★★</span>☆ 4.6 (128) · Coffee shop · ₹₹
              </p>

              <div className={styles.gbpActions}>
                <div>
                  <i><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" /></svg></i>
                  Website
                </div>
                <div>
                  <i><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="m12 3 9 9-9 9-9-9Z" /><path d="M10 15v-3h4v2" strokeLinecap="round" /></svg></i>
                  Directions
                </div>
                <div>
                  <i><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M6 3h12v18l-6-4.5L6 21Z" /></svg></i>
                  Save
                </div>
                <div>
                  <i><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1Z" /></svg></i>
                  Call
                </div>
                <div>
                  <i><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg></i>
                  Share
                </div>
              </div>

              <div className={styles.gbpRows}>
                <div className={styles.gbpRow}>
                  <span className={styles.ic}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  Shop 4, Riverwood Rd, Baner, Pune 411045
                </div>
                <div className={styles.gbpRow}>
                  <span className={styles.ic}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  <span className={styles.open}>Open</span>&nbsp;· Closes 10 pm
                </div>
                <div className={styles.gbpRow}>
                  <span className={styles.ic}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1Z" />
                    </svg>
                  </span>
                  +91 92253 44169
                </div>
              </div>

              <div className={styles.pt}>
                <div className={styles.ptH}>
                  <span>Popular times</span>
                  <span>Tuesdays ▾</span>
                </div>
                <div className={styles.bars} aria-hidden="true">
                  {POPULAR_TIMES.map((h, i) => (
                    <i key={i} className={i === 7 ? styles.barsNow : ''} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className={styles.ptX}>
                  <span>6a</span>
                  <span>9a</span>
                  <span>12p</span>
                  <span>3p</span>
                  <span>6p</span>
                  <span>9p</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal style={{ marginTop: 'clamp(38px,5vw,56px)' }}>
          <h3 className={styles.h2}>Everything your business needs</h3>
          <div className={styles.chips}>
            {CHIPS.map((c) => (
              <span className={styles.chip} key={c}>{c}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
