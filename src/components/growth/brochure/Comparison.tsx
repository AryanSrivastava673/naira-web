import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

const ROWS = [
  { k: 'Mental load', out: 'Six tools, four dashboards, and vocabulary you never signed up to learn', inn: <>One dashboard, one person to call, and <b>no jargon to memorise</b></> },
  { k: 'Google visibility', out: 'Missing "near me" searches every day while the shop down the road takes them', inn: <>Tracked rankings and weekly improvements, <b>present where customers actually search</b></> },
  { k: 'Reviews', out: 'Reviews pile up unanswered. One bad weekend dents your rating for months', inn: <>Replies drafted in your voice <b>within hours</b>, and alerts before things spiral</> },
  { k: 'Marketing spend', out: 'Bleeding money on Zomato promos and ads that stop the moment you stop paying', inn: <>Investing in things you own: content, reviews, your profile, your list. <b>They compound</b></> },
  { k: 'Twelve months on', out: 'Same struggle, higher ad spend, and a year of searches gone next door', inn: <>Ranking content, hundreds of reviews, a newsletter list, and <b>an unfair advantage</b></> },
]

export default function Comparison() {
  return (
    <section className={`${styles.spread} ${styles.paper}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>
            The businesses winning the next decade get found <span className={styles.accent}>today.</span>
          </h2>
        </Reveal>

        <Reveal className={styles.cmp}>
          <div className={styles.cmpHead}>
            <div className={styles.chBlank}></div>
            <div className={styles.chOut}>Without</div>
            <div className={styles.chIn}>With Naira Growth</div>
          </div>
          {ROWS.map((r) => (
            <div className={styles.cmpRow} key={r.k}>
              <div className={styles.cmpK}>{r.k}</div>
              <div className={styles.cmpOut}>{r.out}</div>
              <div className={styles.cmpIn}>{r.inn}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
