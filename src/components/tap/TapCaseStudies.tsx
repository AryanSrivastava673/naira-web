'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cases = [
  {
    restaurant: 'Aish Kitchen',
    location: 'Bandra, Mumbai',
    metric: '+22%',
    metricLabel: 'Average order value',
    quote: 'Guests started ordering more when they could see the full menu clearly. The photography made all the difference.',
    owner: 'Priya Sharma, Owner',
  },
  {
    restaurant: 'The Grain Table',
    location: 'Koregaon Park, Pune',
    metric: '₹46k',
    metricLabel: 'Saved annually on reprints',
    quote: 'We used to reprint menus every time we changed a price. Now I update it from my phone in 30 seconds.',
    owner: 'Rahul Mehta, F&B Director',
  },
  {
    restaurant: 'Café Nord',
    location: 'Vagator, Goa',
    metric: '+18%',
    metricLabel: 'Walk-in conversion',
    quote: 'Guests started photographing the coaster and posting it. It became a conversation starter — free marketing.',
    owner: 'Ananya Kulkarni, Manager',
  },
]

export default function TapCaseStudies() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-naira-surface" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            Case Studies
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Restaurants already{' '}
            <span className="text-gold-gradient">running on Tap</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.restaurant}
              className="relative rounded-2xl overflow-hidden bg-naira-card flex flex-col group hover:border-naira-gold/30 transition-colors"
              style={{
                border: '1px solid rgba(var(--accent-rgb),0.2)',
                boxShadow: '0 0 30px rgba(var(--accent-rgb),0.04)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Top accent line */}
              <div
                className="h-px w-full"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
              />

              <div className="p-7 flex flex-col flex-1">
                {/* Metric */}
                <div
                  className="text-5xl font-bold mb-0.5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--accent-light)' }}
                >
                  {c.metric}
                </div>
                <div className="text-naira-text-muted text-xs mb-6 tracking-wide">{c.metricLabel}</div>

                {/* Quote */}
                <p className="text-naira-text text-sm leading-relaxed italic flex-1">
                  &ldquo;{c.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="border-t border-naira-border pt-4 mt-6">
                  <div className="text-naira-text text-sm font-semibold">{c.restaurant}</div>
                  <div className="text-naira-muted text-xs">{c.location}</div>
                  <div className="text-naira-text-muted text-xs mt-0.5">{c.owner}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
