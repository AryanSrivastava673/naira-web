import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'
import RevealFill from './RevealFill'

const ROWS = [
  { name: 'SEO & content', percent: 100, value: '₹1,300', hi: true },
  { name: 'Reviews & Google profile', percent: 85, value: '₹1,100', hi: true },
  { name: 'Email & newsletter', percent: 69, value: '₹900', hi: true },
  { name: 'WhatsApp broadcasts', percent: 29, value: '₹380', hi: false },
  { name: 'Google / Meta ads', percent: 9, value: '₹110', hi: false },
  { name: 'Zomato promotions', percent: 5, value: '₹60', hi: false },
]

export default function Returns() {
  return (
    <section className={`${styles.spread} ${styles.paper}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>Not all rupees are equal.</h2>
          <p className={styles.lead}>
            Put ₹100 into each of these and you get very different amounts back. The channels most owners ignore are
            the ones that keep paying, and the ones they spend most on stop working the day they stop paying.
          </p>
        </Reveal>

        <Reveal className={styles.returns}>
          <h3 className={styles.groupH} style={{ fontSize: 17, marginBottom: 18 }}>
            What comes back for every ₹100 spent
          </h3>
          {ROWS.map((r) => (
            <div className={styles.rrow} key={r.name}>
              <span className={styles.name}>{r.name}</span>
              <span className={styles.track}>
                <RevealFill percent={r.percent} className={`${styles.fill} ${r.hi ? styles.fillHi : styles.fillLo}`} />
              </span>
              <span className={`${styles.rval} ${r.hi ? styles.rvalHi : styles.rvalLo}`}>{r.value}</span>
            </div>
          ))}
          <p className={styles.cap} style={{ margin: '20px 0 0' }}>
            Same ₹100. Very different outcomes. Blended benchmarks, HubSpot State of Marketing.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
