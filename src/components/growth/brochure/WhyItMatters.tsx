import styles from '@/app/growth/growth.module.css'
import CountUp from './CountUp'
import Reveal from './Reveal'

const STATS = [
  { target: 76, suffix: '%', label: 'of diners look a place up on Google before visiting', source: 'TripAdvisor consumer survey' },
  { target: 88, suffix: '%', label: 'of clicks go to page one. Nothing below it exists', source: 'Think with Google' },
  { target: 4.2, suffix: '×', decimals: 1, label: 'more revenue at a 4.5★ rating than at 3.5★', source: 'Google Business Profile help' },
  { target: 9, suffix: ' in 10', label: 'owners say Google is their top source of new customers', source: 'BrightLocal 2023' },
]

export default function WhyItMatters() {
  return (
    <>
      <section className={`${styles.spread} ${styles.dark}`} style={{ paddingTop: 0 }}>
        <div className={styles.inner}>
          <Reveal className={styles.shead}>
            <h2 className={styles.h1} style={{ color: '#fff' }}>
              Your next customer is not asking a friend. They are asking <span className={styles.accent}>Google.</span>
            </h2>
          </Reveal>
          <Reveal className={styles.stats}>
            {STATS.map((s) => (
              <div className={styles.stat} key={s.label}>
                <CountUp target={s.target} suffix={s.suffix} decimals={s.decimals} />
                <p className={styles.l}>{s.label}</p>
                <div className={styles.s}>{s.source}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <div className={styles.horizon} aria-hidden="true" />
    </>
  )
}
