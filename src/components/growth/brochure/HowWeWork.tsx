import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

const STEPS = [
  { title: 'Understand your problems', body: <><b>Low walk-ins</b>, <b>not appearing in search results</b>, quiet weekdays, or customers who cannot find your door. We listen first.</> },
  { title: 'Review your complete Google profile and online presence', body: <>Your <b>Google Business Profile</b>, <b>local citations</b> and directory entries, your Zomato and Swiggy pages, and your own website. We check what customers actually see.</> },
  { title: 'Brainstorm ideas built around your business', body: <>Practical fixes plus a few <b>out of the box ideas</b>, <b>customised to your locality</b>, your competition and the kind of business you run. Never a template.</> },
  { title: 'Start implementation', body: <><b>We make the changes ourselves.</b> Some are <b>quick wins</b> you will notice early, others are slow and steady work that builds up over months.</> },
  { title: 'Build or improve your website', body: <>A simple, fast, <b>SEO friendly website</b> of your own, <b>included in the first two months</b>, with blog posts and keyword groundwork. If you already have one, <b>we optimise that</b> instead of selling you a rebuild.</> },
  { title: 'See the results for yourself', body: <><b>More profile views, more searches, more calls</b> and more people walking in. You see the numbers straight from Google, not our version of them.</> },
  { title: 'Optional: continue on a retainer', body: <>Only if you like what we do and you are happy with the results. There is <b>no compulsion, ever,</b> and <b>no lock-in</b>.</>, last: true },
]

export default function HowWeWork() {
  return (
    <section id="how" className={`${styles.spread} ${styles.paperDeep}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>Here&rsquo;s how we work with you, step by step.</h2>
          <p className={styles.lead}>
            No packages to choose from and no contract to sign before you have seen anything. We start by looking,
            and we only quote after that.
          </p>
        </Reveal>

        <Reveal className={styles.steps}>
          {STEPS.map((step, i) => (
            <article className={`${styles.step} ${step.last ? styles.stepLast : ''}`} key={step.title}>
              <div className={styles.stepN}>{i + 1}</div>
              <div>
                <h3 className={styles.h3}>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className={styles.strip}>
          <div className={styles.stripIc}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="14" rx="2" />
              <path d="M6 14.5 9.5 11l2.5 2.5L17 8" />
              <path d="M8 21h8" />
            </svg>
          </div>
          <div>
            <h3>Everything happens transparently</h3>
            <p>
              You can watch the work happening live on our master dashboard. Nothing is hidden behind a monthly
              report you have to take on trust.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
