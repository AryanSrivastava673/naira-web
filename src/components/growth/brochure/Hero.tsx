'use client'

import { Check } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from '@/app/growth/growth.module.css'
import TypedSearch from './TypedSearch'

const WA_LINK =
  'https://wa.me/919225344169?text=Hi%20Naira%20Growth%2C%20I%27d%20like%20a%20free%20look%20at%20where%20my%20business%20stands%20on%20Google.'

const BENEFITS = [
  'Show up in the top three on Maps',
  'More calls and direction requests',
  'A website built and included',
  'Blog posts and keywords from the start',
  'Every review answered in your voice',
  'One person on WhatsApp, not a ticket',
]

const TRUST = [
  'Free first look, no payment upfront',
  'No lock-in, cancel any month',
  'GST invoice, pay by UPI or transfer',
  'English, हिंदी or मराठी',
]

export default function Hero() {
  return (
    <section id="top" className={`${styles.spread} ${styles.dark}`}>
      <div className={styles.inner}>
        <div className={styles.heroTop}>
          <span className={styles.wordmark} style={{ fontSize: 23 }}>
            <span className={styles.n}>Naira</span> Growth<span className={styles.wm}>&bull;</span>
          </span>
          <span className={`${styles.pill} ${styles.pillDark}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff2ba3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Local online presence, managed for you
          </span>
        </div>

        <div className={styles.heroGrid}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className={styles.display}>
              Someone nearby is searching for a business like yours right now. Let&rsquo;s make sure{' '}
              <span className={styles.accent}>they find you.</span>
            </h1>
            <p className={`${styles.lead} ${styles.leadDark}`}>
              Most customers decide where to go from Google Search and Google Maps, long before they walk in or call.
              We look after that side of your business for you, in plain language, with no jargon and nothing hidden.
            </p>

            <div className={styles.promise}>
              <b>First fixes live in 14 days.</b>
              <span>Then steady work, month by month.</span>
            </div>
            <p className={styles.fine}>
              Fixes means your profile, map pin, hours, categories and photos &mdash; the things we control directly.
              Ranking and review growth build over 4 to 8 weeks.
            </p>

            <ul className={styles.benefits}>
              {BENEFITS.map((b) => (
                <li key={b}>
                  <Check size={17} strokeWidth={2.4} />
                  {b}
                </li>
              ))}
            </ul>

            <div className={styles.priceline}>
              <span className={styles.amt}>&#8377;25,000 &ndash; &#8377;30,000</span>
              <span className={styles.unit}>for the first two months &mdash; website included</span>
            </div>
            <p className={styles.fine} style={{ marginTop: 8 }}>
              Then <b style={{ color: '#fff', fontWeight: 600 }}>from &#8377;2,500 a month</b> to keep it running, and
              only if you want to. <span className={styles.free}>The first look is free.</span>
            </p>

            <div className={styles.heroCta}>
              <a className={`${styles.btn} ${styles.btnPink}`} href={WA_LINK} target="_blank" rel="noopener">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.15.16-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31s-.86.84-.86 2.05.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
                </svg>
                WhatsApp us
              </a>
              <a className={`${styles.btn} ${styles.btnGhostDark}`} href="#talk">
                Get my free check
              </a>
              <a className={`${styles.btn} ${styles.btnGhostDark}`} href="/growth/audit">
                Run a free instant audit
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.mockcard}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <div className={styles.gsearch}>
              <div className={styles.gsearchBar}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <TypedSearch />
              </div>
              <div className={styles.gtabs}>
                <span>All</span>
                <span>Maps</span>
                <span>Images</span>
                <span>News</span>
                <span>Videos</span>
              </div>
              <div className={styles.glist}>
                <div className={`${styles.grow} ${styles.growYou}`}>
                  <span className={`${styles.rank} ${styles.rankUp}`}>1</span>
                  <Image className={styles.gthumb} src="/growth/thumb-coffee.jpg" alt="" width={44} height={44} />
                  <span className={styles.ginfo}>
                    <span className={styles.gname}>Your café</span>
                    <span className={styles.gmeta}>
                      <span className={styles.starsR}>★★★★★</span> 4.7 (214) · 0.4 km · Open
                    </span>
                  </span>
                  <span className={styles.youtag}>You</span>
                </div>
                <div className={styles.grow}>
                  <span className={styles.rank}>2</span>
                  <Image className={styles.gthumb} src="/growth/thumb-interior.jpg" alt="" width={44} height={44} />
                  <span className={styles.ginfo}>
                    <span className={styles.gname}>The Daily Grind</span>
                    <span className={styles.gmeta}>
                      <span className={styles.starsR}>★★★★</span>☆ 4.4 (95) · 0.6 km · Open
                    </span>
                  </span>
                </div>
                <div className={styles.grow}>
                  <span className={styles.rank}>3</span>
                  <Image className={styles.gthumb} src="/growth/thumb-table.jpg" alt="" width={44} height={44} />
                  <span className={styles.ginfo}>
                    <span className={styles.gname}>Cafe Arista</span>
                    <span className={styles.gmeta}>
                      <span className={styles.starsR}>★★★★</span>☆ 4.3 (76) · 0.7 km · Closes 9 pm
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <p className={styles.cap} style={{ margin: '14px 2px 2px', color: 'var(--muted)' }}>
              The top three listings on Maps take most of the calls and directions. That block is what we work on.
            </p>
          </motion.div>
        </div>

        <ul className={styles.heroTrust}>
          {TRUST.map((t) => (
            <li key={t}>
              <Check className={styles.tick} size={17} strokeWidth={2.4} />
              {t}
            </li>
          ))}
        </ul>

        <div className={styles.heroFoot}>
          <span className={`${styles.pill} ${styles.pillPink}`}>
            <span className={`${styles.dot} ${styles.dotLive}`}></span>Only limited slots open
          </span>
          <span className={styles.capMono} style={{ color: 'var(--on-dark-dim)' }}>
            nairamenus.in/growth
          </span>
        </div>
      </div>
    </section>
  )
}
