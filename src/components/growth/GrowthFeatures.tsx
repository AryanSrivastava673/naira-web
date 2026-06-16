'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, FileText, Share2, Star, Target,
  LayoutDashboard, Globe, Mail, Calendar, MessageCircle,
} from 'lucide-react'

const FEATURES = [
  { Icon: MapPin,          title: 'Local SEO',        tagline: 'GBP, citations & keywords — updated weekly' },
  { Icon: FileText,        title: 'Content',           tagline: 'Written for you, ranked for your diners' },
  { Icon: Share2,          title: 'Social media',      tagline: 'Every post tied to a local search intent' },
  { Icon: Star,            title: 'Review engine',     tagline: 'Auto-requests, smart replies, live alerts' },
  { Icon: Target,          title: 'Competitor radar',  tagline: "See who's stealing your search share" },
  { Icon: LayoutDashboard, title: 'Dashboard',         tagline: 'Visibility, traffic & reviews in one view' },
  { Icon: Globe,           title: 'Website',           tagline: 'Fast, SEO-ready — only if you need one' },
  { Icon: Mail,            title: 'Newsletter',        tagline: 'Hyperlocal email that feels handwritten' },
  { Icon: Calendar,        title: 'Event radar',       tagline: 'Spot footfall windows two weeks ahead' },
  { Icon: MessageCircle,   title: 'Priority support',  tagline: 'WhatsApp your growth partner, any time' },
]

export default function GrowthFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div aria-hidden className="absolute inset-0 constellation-bg pointer-events-none" />
      <div ref={ref} className="max-w-4xl mx-auto relative z-10">

        <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-2 text-center" style={{ color: '#ff2ba3' }}>
          What&apos;s inside
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white text-center mb-3">
          10 tools. One growth <span style={{ color: '#ff2ba3' }}>engine.</span>
        </h2>
        <p className="text-white/70 text-sm text-center mb-10 max-w-lg mx-auto">
          Everything handled for you — SEO, content, reviews, socials, and more.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {FEATURES.map(({ Icon, title, tagline }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(255,43,163,0.10), 0 16px 48px rgba(255,43,163,0.06)' }}
              className="glass-dark p-5 flex flex-col items-center text-center gap-3"
              style={{ borderRadius: 16 }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(255,43,163,0.12)',
                  border: '1px solid rgba(255,43,163,0.22)',
                  borderRadius: 12,
                }}
              >
                <Icon size={20} color="#ff2ba3" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-1">{title}</p>
                <p className="text-xs text-white/60 leading-snug">{tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
