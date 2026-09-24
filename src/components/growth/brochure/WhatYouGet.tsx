import { Check } from 'lucide-react'
import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

const ITEMS = [
  { title: 'Your Google profile, managed weekly', body: 'Photos, posts, categories, hours and attributes kept current, not set once and forgotten.' },
  { title: 'Reviews requested and answered', body: 'Requests sent to happy customers, and a reply drafted in your voice for every review within hours.' },
  { title: 'Local listings cleaned up', body: 'Your name, address and number made identical everywhere Google checks, and kept that way.' },
  { title: 'Zomato and Swiggy matched', body: 'Your aggregator pages kept consistent with your Google details, so nothing contradicts anything.' },
  { title: 'An eye on the businesses near you', body: 'What the three closest competitors are doing for the same searches, and where they are beating you.' },
  { title: 'A live dashboard, not a monthly PDF', body: 'Views, searches, calls and direction requests straight from Google, whenever you feel like looking.' },
  { title: 'One person on WhatsApp', body: 'The person actually doing the work, 9 am to 9 pm. Not a ticket number and not a call centre.' },
  { title: 'A website, included in the setup', body: 'Built in the first two months with blog posts and keyword groundwork. Already have one? We improve that instead.' },
]

export default function WhatYouGet() {
  return (
    <section id="included" className={`${styles.spread} ${styles.paper}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>What you actually get, every month.</h2>
          <p className={styles.lead}>
            Not a report about work. The work itself, done for you, with the numbers visible whenever you want to
            look.
          </p>
        </Reveal>

        <Reveal>
          <ul className={styles.gets}>
            {ITEMS.map((item) => (
              <li key={item.title}>
                <Check size={18} strokeWidth={2.3} />
                <span>
                  <b>{item.title}</b>
                  <span>{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
