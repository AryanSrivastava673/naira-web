'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, Zap, Award } from 'lucide-react'

const CARDS = [
  {
    number: '01',
    Icon: Heart,
    color: '#ff2ba3',
    rgb: '255,43,163',
    title: 'Relationships',
    titleAccent: '>',
    titleRest: 'transactions',
    body: "We pick up the phone, learn your name, and stay genuinely invested in how your restaurant is doing. Good service isn't a department at Naira. It's simply how we work.",
  },
  {
    number: '02',
    Icon: Zap,
    color: '#9b8afb',
    rgb: '155,138,251',
    title: 'Save over',
    stat: '40%',
    titleRest: 'in workforce expense',
    body: 'One platform runs your menus, billing, and online presence together, so a smaller team gets more done. A small investment that keeps saving you time and money.',
  },
  {
    number: '03',
    Icon: Award,
    color: '#e0b23d',
    rgb: '224,178,61',
    title: 'Best quality in the business,',
    titleRest: 'all around',
    body: 'From the hardware in your hands to the people behind the support, we get every detail right. Dependable, well built, and made to last.',
  },
]

export default function WhyNaira() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
      <div ref={ref} className="max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-4 h-px" style={{ background: '#ff2ba3' }} />
            <p className="font-mono text-[12px] font-medium tracking-[0.14em] uppercase" style={{ color: '#ff2ba3' }}>
              Why Naira
            </p>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-5 text-white">
            Built to make your restaurant{' '}
            <span style={{ color: '#ff2ba3' }}>look good.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Naira is built by people who genuinely care about restaurants. When your restaurant
            wins, we win. That&apos;s the whole relationship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: card.color }} />

              <div className="p-7 pt-8">
                <p className="font-mono text-xs text-white/35 mb-5">{card.number}</p>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `rgba(${card.rgb},0.10)`, border: `1px solid rgba(${card.rgb},0.25)` }}
                >
                  <card.Icon size={20} style={{ color: card.color }} />
                </div>

                <h3 className="text-white font-bold text-xl leading-snug mb-3">
                  {card.title}{' '}
                  {card.titleAccent && <span style={{ color: card.color }}>{card.titleAccent}</span>}
                  {card.stat && <span style={{ color: card.color }}>{card.stat}</span>}{' '}
                  {card.titleRest}
                </h3>

                <p className="text-white/55 text-sm leading-relaxed">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
