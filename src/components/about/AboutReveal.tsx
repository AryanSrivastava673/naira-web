'use client'

import { useEffect, useRef } from 'react'

/**
 * Wrapper for the About page. Ports the design's vanilla-JS scroll reveal:
 * marks the wrapper with `.js` (so `.reveal` starts hidden only when JS runs),
 * then fades each `.reveal` in as it enters the viewport, staggered by its
 * position among sibling `.reveal` elements.
 */
export default function AboutReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    root.classList.add('js')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          const el = en.target as HTMLElement
          const sibs = Array.from(el.parentElement?.children ?? []).filter((c) =>
            c.classList.contains('reveal'),
          )
          el.style.transitionDelay = `${Math.max(0, sibs.indexOf(el)) * 60}ms`
          el.classList.add('in')
          io.unobserve(el)
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="about-page">
      {children}
    </div>
  )
}
