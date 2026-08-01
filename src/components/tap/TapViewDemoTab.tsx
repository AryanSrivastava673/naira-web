'use client'

import { useState } from 'react'
import LeadModal from './LeadModal'

export default function TapViewDemoTab() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} variant="demo" />

      <button
        onClick={() => setModalOpen(true)}
        aria-label="View Demo"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          padding: '18px 10px',
          borderRadius: '14px 0 0 14px',
          background: 'rgba(21,16,24,0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,43,163,0.25)',
          borderRight: 'none',
          boxShadow: '-4px 0 24px rgba(255,43,163,0.12), inset 1px 0 0 rgba(255,255,255,0.07)',
          color: '#ff2ba3',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'background 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,43,163,0.12)'
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            '-4px 0 32px rgba(255,43,163,0.25), inset 1px 0 0 rgba(255,255,255,0.07)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLElement).style.background = 'rgba(21,16,24,0.75)'
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            '-4px 0 24px rgba(255,43,163,0.12), inset 1px 0 0 rgba(255,255,255,0.07)'
        }}
      >
        View Demo
      </button>
    </>
  )
}
