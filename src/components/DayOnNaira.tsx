'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'

const timeline = [
  {
    n: '01',
    title: 'Guests order in seconds',
    body: 'A tap or scan opens your smart menu. Better browsing, bigger baskets, happier tables.',
  },
  {
    n: '02',
    title: 'Billing keeps pace',
    body: 'Orders flow straight to your POS. Staff spend time on guests, not paperwork.',
  },
  {
    n: '03',
    title: 'Insights write themselves',
    body: 'Bestsellers, peak hours, and revenue trends update automatically — no spreadsheets.',
  },
  {
    n: '04',
    title: 'Your presence compounds',
    body: 'Every visit and review strengthens your ranking on Google and AI search.',
  },
  {
    n: '05',
    title: 'New guests find you first',
    body: 'The next hungry person nearby discovers you, taps in, and the loop begins again.',
  },
]

export default function DayOnNaira() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 lg:py-28 px-6 relative" style={{ background: '#ffffff' }}>
      <div ref={ref} className="max-w-[900px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px" style={{ background: PINK }} />
            <span
              className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase"
              style={{ color: PINK }}
            >
              A day on Naira
            </span>
          </div>
          <h2
            className="font-sans font-black tracking-[-0.02em] leading-[1.08]"
            style={{ fontSize: 'clamp(2rem,4.6vw,3.4rem)', color: '#1a1a1a' }}
          >
            From first tap to <span style={{ color: PINK }}>loyal regular.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting rail */}
          <div
            aria-hidden
            className="absolute top-3 bottom-3 w-px"
            style={{ left: 19, background: 'rgba(0,0,0,0.10)' }}
          />

          <div className="space-y-11">
            {timeline.map((item, i) => (
              <motion.div
                key={item.n}
                className="relative flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.11 }}
              >
                {/* Node */}
                <div
                  className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.12)',
                    color: '#9ca3af',
                  }}
                >
                  {item.n}
                </div>

                <div className="pt-1.5">
                  <h3
                    className="font-sans font-bold text-xl lg:text-[1.4rem] tracking-[-0.01em] mb-2"
                    style={{ color: '#1a1a1a' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed max-w-xl" style={{ color: '#6b7280' }}>
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
