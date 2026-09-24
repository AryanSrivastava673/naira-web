import styles from '@/app/growth/growth.module.css'

const WA_LINK =
  'https://wa.me/919225344169?text=Hi%20Naira%20Growth%2C%20I%27d%20like%20a%20free%20look%20at%20where%20my%20business%20stands%20on%20Google.'

export default function WhatsAppFab() {
  return (
    <a
      className={styles.waFab}
      href={WA_LINK}
      target="_blank"
      rel="noopener"
      aria-label="Contact us on WhatsApp"
    >
      <svg className={styles.waRing} viewBox="0 0 88 88" aria-hidden="true">
        <defs>
          <path id="growthWaRing" d="M44,11 a33,33 0 1,1 -0.01,0" />
        </defs>
        <text>
          <textPath href="#growthWaRing" startOffset="0">
            Contact us &#183; Contact us &#183; Contact us &#183;{' '}
          </textPath>
        </text>
      </svg>
      <svg className={styles.waMark} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.15.16-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31s-.86.84-.86 2.05.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
    </a>
  )
}
