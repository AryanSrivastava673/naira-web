'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  {
    value: '700M+',
    label: "smartphone users in India, most already carrying NFC. Contactless dining technology is already how they pay — now it's how they order.",
    source: { text: 'Statista, 2026', href: 'https://www.statista.com/statistics/467163/forecast-of-smartphone-users-in-india/' },
  },
  {
    value: '<1s',
    label: 'seconds for a Naira Tap menu to open. QR takes 3 to 6 seconds, sometimes more.',
    source: { text: 'Naira Tap live benchmarks', href: 'https://nairamenus.in/blog/nfc-menu-restaurants-india-naira-tap' },
  },
  {
    value: '+20%',
    label: 'higher average order value. Photos and pairings at the moment of decision. Simple.',
    source: { text: 'Restaurant digital menu benchmarks', href: 'https://nairamenus.in/blog/nfc-menu-restaurants-india-naira-tap' },
  },
  {
    value: '100%',
    label: "paperless. India's only NFC menu platform that doesn't print a single sheet.",
    source: { text: 'Naira Menus product spec', href: 'https://nairamenus.in/' },
  },
]

function StatSource({ text, href }: { text: string; href: string | null }) {
  const [hovered, setHovered] = useState(false)

  const baseStyle: React.CSSProperties = {
    fontStyle: 'italic',
    fontSize: '0.72rem',
    color: hovered && href ? '#ff2ba3' : 'rgba(255,255,255,0.35)',
    marginTop: '6px',
    display: 'inline-block',
    transition: 'color 0.15s ease',
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...baseStyle,
          textDecoration: 'none',
          borderBottom: `1px dotted ${hovered ? '#ff2ba3' : 'rgba(255,255,255,0.25)'}`,
          cursor: 'pointer',
          transition: 'color 0.15s ease, border-bottom-color 0.15s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {text}
      </a>
    )
  }

  return <span style={baseStyle}>{text}</span>
}

export default function TapStats() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          '#0a0a0a',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-bold text-naira-text text-center mb-12 max-w-2xl mx-auto">
          Restaurant new technology: the standard for Indian dining in 2026.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div
                className="font-mono font-medium text-naira-gold mb-3"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}
              >
                {s.value}
              </div>
              <p className="text-naira-text-muted text-sm leading-snug">{s.label}</p>
              <StatSource text={s.source.text} href={s.source.href} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
