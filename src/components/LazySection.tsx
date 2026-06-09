'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

export default function LazySection({ children, minHeight = '100vh' }: { children: ReactNode; minHeight?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {visible ? children : <div style={{ minHeight }} />}
    </div>
  )
}
