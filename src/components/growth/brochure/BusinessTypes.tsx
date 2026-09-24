import Image from 'next/image'
import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

const TYPES = [
  { src: '/growth/biz-cafe.jpg', alt: 'Evening exterior of a small neighbourhood café with outdoor seating', caption: 'Cafés & restaurants' },
  { src: '/growth/biz-salon.jpg', alt: 'Interior of a small salon with two styling chairs and mirrors', caption: 'Salons & studios' },
  { src: '/growth/biz-clinic.jpg', alt: 'Reception and waiting area of a small dental clinic', caption: 'Clinics & practices' },
  { src: '/growth/biz-kirana.jpg', alt: 'Interior of a neighbourhood grocery shop with stocked shelves', caption: 'Shops & kiranas' },
]

export default function BusinessTypes() {
  return (
    <section className={`${styles.spread} ${styles.paper}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>If people search for it nearby, we can work on it.</h2>
          <p className={styles.lead}>
            Cafés and restaurants are where we started, but the work is the same for any business a customer looks
            up before walking in.
          </p>
        </Reveal>

        <Reveal className={styles.biz}>
          {TYPES.map((t) => (
            <figure key={t.caption}>
              <Image src={t.src} alt={t.alt} width={460} height={575} />
              <figcaption>{t.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
