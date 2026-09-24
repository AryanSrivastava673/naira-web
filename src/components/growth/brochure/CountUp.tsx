'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '@/app/growth/growth.module.css'

interface CountUpProps {
  target: number
  suffix?: string
  decimals?: number
}

export default function CountUp({ target, suffix = '', decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return
          started.current = true
          const start = performance.now()
          const duration = 900
          function frame(now: number) {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(target * eased)
            if (p < 1) requestAnimationFrame(frame)
          }
          requestAnimationFrame(frame)
          io.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  return (
    <div ref={ref} className={styles.n}>
      {value.toFixed(decimals)}
      {suffix}
    </div>
  )
}
