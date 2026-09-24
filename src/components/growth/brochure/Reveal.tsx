'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
}

export default function Reveal({ children, className, style, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
