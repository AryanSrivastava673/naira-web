'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Smartphone, Zap, TrendingUp, Leaf } from 'lucide-react'

const stats = [
  { value: '750M+', label: 'NFC-enabled phones in India', source: 'Statista, 2025', icon: Smartphone },
  { value: '<1s',   label: 'Menu open time vs. 3–6s QR',  source: 'Internal benchmark', icon: Zap },
  { value: '+12%',  label: 'Average order value uplift',   source: 'Pilot data', icon: TrendingUp },
  { value: '0',     label: 'Menus reprinted. Ever.',        source: 'By design', icon: Leaf },
]

export default function TapStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-6 bg-naira-surface" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              className="relative rounded-2xl overflow-hidden bg-naira-card p-6 group hover:border-naira-gold/30 transition-colors"
              style={{ border: '1px solid rgba(var(--accent-rgb),0.2)', boxShadow: '0 0 30px rgba(var(--accent-rgb),0.04)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
              />
              <Icon size={16} className="mb-4 opacity-60" style={{ color: 'var(--accent)' }} />
              <div
                className="text-3xl md:text-4xl font-bold mb-1.5"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'var(--accent-light)' }}
              >
                {stat.value}
              </div>
              <div className="text-naira-text-muted text-xs leading-snug mb-1">{stat.label}</div>
              <div className="text-naira-muted text-[10px]">{stat.source}</div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
