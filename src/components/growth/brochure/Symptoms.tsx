import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

const SYMPTOMS = [
  {
    tag: '"near me" searches',
    title: 'You do not come up nearby',
    body: 'Someone half a kilometre away searches for exactly what you sell, and gets three other names. You are not on the list.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    tag: 'map pin',
    title: 'Your pin sends people elsewhere',
    body: 'One wrong turn and most people give up rather than call. We put the pin on your door and make the directions land there.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    tag: 'photos',
    title: 'Old photos, or none at all',
    body: 'Profiles with current photos of the food, the room and the team get far more calls. Most have three pictures from years ago.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m21 16-5-5L5 20" />
      </svg>
    ),
  },
  {
    tag: 'reviews',
    title: 'Reviews sitting unanswered',
    body: 'Every unanswered review is a customer who feels ignored, and Google reads the silence as a profile nobody is looking after.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 20.5l1.6-4.9A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z" />
      </svg>
    ),
  },
  {
    tag: 'hours',
    title: 'Hours that are wrong',
    body: 'A wrong festival timing turns a full evening into a wasted trip for someone. They rarely give you a second try.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    tag: 'duplicates',
    title: 'Two listings, different details',
    body: 'An old address or number still floating around directories tells Google it cannot be certain which one is really you.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="13" height="13" rx="2" />
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </svg>
    ),
  },
]

export default function Symptoms() {
  return (
    <section id="symptoms" className={`${styles.spread} ${styles.paperDeep}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>If any of this sounds familiar, it is fixable.</h2>
          <p className={styles.lead}>
            These are the six things we find most often. None of them are your fault, and none of them need you to
            learn anything technical.
          </p>
        </Reveal>

        <Reveal className={styles.symptoms}>
          {SYMPTOMS.map((s) => (
            <article className={styles.symptom} key={s.title}>
              <span className={styles.ic}>{s.icon}</span>
              <span className={styles.tag}>{s.tag}</span>
              <h3 className={styles.h3}>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
