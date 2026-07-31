'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

export default function BuildTogether() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center px-6 py-28 lg:py-36"
      style={{ background: 'transparent' }}
    >
      {/* Concentric halo — a soft core with two faint rings breathing around it */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: 'min(760px, 150vw)',
            aspectRatio: '1',
            background: `radial-gradient(circle, rgba(${PINK_RGB},0.20) 0%, rgba(${PINK_RGB},0.07) 42%, transparent 68%)`,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'min(560px, 115vw)',
            aspectRatio: '1',
            border: `1px solid rgba(${PINK_RGB},0.16)`,
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.35, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'min(760px, 150vw)',
            aspectRatio: '1',
            border: `1px solid rgba(${PINK_RGB},0.10)`,
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="w-8 h-px" style={{ background: PINK }} />
          <span
            className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase"
            style={{ color: PINK }}
          >
            Let&apos;s build together
          </span>
        </motion.div>

        <motion.h2
          className="font-sans font-black tracking-[-0.02em] leading-[1.08] text-white mb-6"
          style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          Stop juggling tools. Start running a <span style={{ color: PINK }}>restaurant.</span>
        </motion.h2>

        <motion.p
          className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          See how the full Naira stack works for your restaurant. No pressure, no jargon — just a
          clear picture of what changes.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-[15px] font-bold transition-transform hover:scale-[1.02]"
            style={{ background: PINK, color: '#ffffff', boxShadow: `0 0 34px rgba(${PINK_RGB},0.35)` }}
          >
            Let&apos;s Talk
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link
            href="/#products"
            className="inline-flex items-center px-7 py-4 rounded-2xl text-[15px] font-bold text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Explore the products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
