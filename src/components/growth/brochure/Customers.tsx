import Image from 'next/image'
import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

const LOGOS = [
  { src: '/growth/logo-southbond.jpg', alt: 'Southbond Cafe' },
  { src: '/growth/logo-pk.jpg', alt: 'PK Professional Unisex Salon' },
  { src: '/growth/logo-khelkar.jpg', alt: "Khelkar's Dent 'O' Spa" },
  { src: '/growth/logo-ceecees.jpg', alt: "CeeCee's" },
]

function LogoTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.logo}>
      <Image src={src} alt={alt} width={400} height={400} />
    </div>
  )
}

export default function Customers() {
  return (
    <section id="customers" className={`${styles.spread} ${styles.paper}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>We already do this for businesses down the road from you.</h2>
          <p className={styles.lead}>
            A café, a salon, a dental practice, a bar. Different businesses with the same problem: people searching
            nearby who were not finding them.
          </p>
        </Reveal>

        <div className={styles.custGrid}>
          <Reveal>
            <Image
              className={styles.custPhoto}
              src="/growth/team.jpg"
              alt="Three people standing behind a café counter holding Naira Menus and Southbond Cafe cards"
              width={820}
              height={565}
            />
          </Reveal>
          <Reveal>
            <h3 className={styles.h2}>It starts with a conversation, not a contract.</h3>
            <p className={styles.lead} style={{ marginTop: 16 }}>
              We sit down with you, look at what customers currently see, and agree what is worth fixing first. The
              paperwork comes later, and only if you want to carry on.
            </p>
            <p className={styles.cap} style={{ marginTop: 18 }}>
              With the team at Southbond Cafe.
            </p>
          </Reveal>
        </div>

        <h3 className={styles.groupH}>Some of the places we work with</h3>
      </div>

      <div className={styles.marquee} role="group" aria-label="Businesses we work with">
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeSet}>
            {LOGOS.map((l) => (
              <LogoTile key={l.alt} {...l} />
            ))}
          </div>
          <div className={styles.marqueeSet} aria-hidden="true">
            {LOGOS.map((l) => (
              <LogoTile key={`dup-${l.alt}`} src={l.src} alt="" />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <p className={styles.more}>&amp; many more</p>
      </div>
    </section>
  )
}
