'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

function CountUp({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const steps = 50
    const inc = to / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + inc, to)
      setVal(Math.round(current))
      if (current >= to) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 700, suffix: 'M+', label: 'smartphone users in India, most already tapping to pay' },
  { value: 100, suffix: '%',  label: 'of guests covered between tap and QR scan' },
  { display: '<1s',           label: 'from tap to open menu, benchmarked live' },
  { value: 0,                 label: 'apps for guests to download, ever' },
]

export default function NfcStats() {
  return (
    <section className="py-20 px-6" style={{ background: '#0c0c0c', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div
              className="font-black mb-2"
              style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: PINK, letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              {s.display ?? <CountUp to={s.value!} suffix={s.suffix} />}
            </div>
            <p className="text-white/45 text-xs leading-snug max-w-[140px] mx-auto">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
