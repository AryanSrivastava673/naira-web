'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const iphonePoints = [
  { bold: 'iPhone XS / XR and newer:', text: 'hold the phone near the coaster and the menu link appears on screen. Nothing to install.' },
  { bold: 'Same chip as Apple Pay.', text: 'If they\'ve ever tapped to pay, NFC is on and working.' },
  { bold: 'Older iPhones', text: 'use the QR printed on the same coaster. One scan, same menu.' },
]

const androidPoints = [
  { bold: 'Tap with the screen on', text: 'and the menu link appears instantly. No settings hunt on most phones.' },
  { bold: 'If Google Pay tap-to-pay works, Naira works.', text: 'It\'s the same NFC radio.' },
  { bold: 'Entry-level phone without NFC?', text: 'The QR on the coaster covers it.' },
]

function Timeline({ from, pivot, label }: { from: string; pivot: string; label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <span className="text-white/35 text-[11px] font-mono">{from}</span>
      <div className="flex-1 relative h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, rgba(${PINK_RGB},0.4), ${PINK})`,
            width: '72%',
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2"
          style={{ left: '72%', background: PINK, borderColor: '#0a0a0a' }}
        />
      </div>
      <span className="text-white/35 text-[11px] font-mono">Today</span>
    </div>
  )
}

export default function NfcDeepDive() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6" style={{ background: '#0c0c0c' }}>
      <div ref={ref} className="max-w-[1200px] mx-auto">

        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase mb-3" style={{ color: PINK }}>
            iOS &amp; Android
          </p>
          <h2
            className="text-white font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-0.02em' }}
          >
            Standard hardware for over a{' '}
            <span style={{ color: PINK }}>decade</span>
          </h2>
          <p className="text-white/55 text-base max-w-xl mx-auto">
            NFC isn&apos;t a new gadget feature. Both platforms have shipped it as standard for years.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* iPhone column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-7"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-white font-bold text-xl">iPhone</div>
                <div className="text-white/40 text-xs mt-0.5">NFC since iPhone 6 · 2014</div>
              </div>
              <div
                className="font-mono text-[10px] px-2.5 py-1 rounded-lg font-semibold"
                style={{ background: `rgba(${PINK_RGB},0.10)`, color: PINK }}
              >
                ~95%
              </div>
            </div>

            <p className="text-white/50 text-xs mb-1">of iPhones from the last 8 years open the menu with zero setup</p>
            <Timeline from="2014" pivot="2018" label="Native" />

            <p className="text-white/45 text-xs mb-4">From 2018 onward the tap works natively, no app at all.</p>
            <ul className="space-y-3">
              {iphonePoints.map(p => (
                <li key={p.bold} className="flex items-start gap-2.5 text-sm text-white/65">
                  <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: PINK }} />
                  <span><span className="text-white/90 font-medium">{p.bold}</span> {p.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Android column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-7"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-white font-bold text-xl">Android</div>
                <div className="text-white/40 text-xs mt-0.5">NFC since Android 4.0 · 2011</div>
              </div>
              <div
                className="font-mono text-[10px] px-2.5 py-1 rounded-lg font-semibold"
                style={{ background: `rgba(${PINK_RGB},0.10)`, color: PINK }}
              >
                10+ yrs
              </div>
            </div>

            <p className="text-white/50 text-xs mb-1">of NFC as standard hardware across Samsung, OnePlus, Pixel, Vivo and Oppo</p>
            <Timeline from="2011" pivot="2018" label="Standard" />

            <p className="text-white/45 text-xs mb-4">Reads NFC natively from day one, screen on.</p>
            <ul className="space-y-3">
              {androidPoints.map(p => (
                <li key={p.bold} className="flex items-start gap-2.5 text-sm text-white/65">
                  <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: PINK }} />
                  <span><span className="text-white/90 font-medium">{p.bold}</span> {p.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 100% guarantee note */}
        <motion.div
          className="mt-6 rounded-xl px-6 py-4 text-sm text-white/60 leading-relaxed"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span className="text-white/80 font-semibold">The 100% guarantee:</span> every coaster carries a printed QR code next to the tap zone. Tap it or scan it — the same menu opens. No guest is ever left out, and you never have to think about it.
        </motion.div>
      </div>
    </section>
  )
}
