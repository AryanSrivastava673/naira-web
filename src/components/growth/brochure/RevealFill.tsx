'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealFillProps {
  percent: number
  className: string
  style?: React.CSSProperties
}

export default function RevealFill({ percent, className, style }: RevealFillProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setFilled(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setTimeout(() => setFilled(true), 90)
          io.unobserve(el)
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={className}
      style={{ ...style, width: filled ? `${percent}%` : 0 }}
    />
  )
}
