import styles from '@/app/growth/growth.module.css'

export default function MobileActionBar() {
  return (
    <div className={styles.mbar}>
      <a className={styles.btn + ' ' + styles.btnPink} href="https://wa.me/919225344169" target="_blank" rel="noopener">
        WhatsApp us
      </a>
      <a className={styles.btn + ' ' + styles.btnGhostDark} href="tel:+919225344169">
        Call
      </a>
    </div>
  )
}
