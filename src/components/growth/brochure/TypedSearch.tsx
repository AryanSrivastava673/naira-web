'use client'

import { useEffect, useState } from 'react'
import styles from '@/app/growth/growth.module.css'

const PHRASES = [
  'best cafe near me',
  'coffee shop open now',
  'cafe in baner pune',
  'best cafe near me',
]

export default function TypedSearch() {
  const [text, setText] = useState(PHRASES[0])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let timeout: ReturnType<typeof setTimeout>

    setText('')

    function tick() {
      const word = PHRASES[phraseIndex]
      charIndex += deleting ? -1 : 1
      setText(word.slice(0, charIndex))
      let wait = deleting ? 34 : 68
      if (!deleting && charIndex === word.length) {
        deleting = true
        wait = 1900
      } else if (deleting && charIndex === 0) {
        deleting = false
        phraseIndex = (phraseIndex + 1) % PHRASES.length
        wait = 320
      }
      timeout = setTimeout(tick, wait)
    }
    timeout = setTimeout(tick, 68)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <span className={styles.gsearchInput}>{text}</span>
      <span className={styles.caret}></span>
    </>
  )
}
