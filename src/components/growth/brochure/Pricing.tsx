import { Check, MapPin, Pencil, Clock, Layers } from 'lucide-react'
import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

export default function Pricing() {
  return (
    <section id="pricing" className={`${styles.spread} ${styles.paperDeep}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>What it costs.</h2>
          <p className={styles.lead}>
            Two stages, and both of them are on this page. Everything gets built in the first two months. After that
            it is a small monthly fee to keep it working, and only if you want to carry on.
          </p>
        </Reveal>

        <Reveal className={styles.stages}>
          <div className={`${styles.stage} ${styles.stageNow}`}>
            <p className={styles.when}>Months one and two &mdash; building it</p>
            <p className={styles.amt2}>&#8377;25,000 &ndash; &#8377;30,000</p>
            <p className={styles.sub}>For both months together, not per month. Your website is included in this.</p>
            <ul>
              <li><Check size={17} strokeWidth={2.3} /><span><b>A website, built and live.</b> Fast, search-ready, yours. If you already have one, we improve that instead.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span><b>Blog posts and keyword groundwork.</b> The searches worth owning in your area, and the pages that answer them.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span><b>Your Google profile rebuilt.</b> Pin, hours, categories, photos and description, all corrected.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span><b>Listings cleaned everywhere.</b> Directories, aggregators and old duplicates made to agree with each other.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span><b>The review system set up.</b> Requests going out to happy customers, replies flowing for everyone else.</span></li>
            </ul>
          </div>

          <div className={styles.stage}>
            <p className={styles.when}>Month three onwards &mdash; keeping it</p>
            <p className={styles.amt2}>From &#8377;2,500 <span style={{ fontSize: '.5em', letterSpacing: 0 }}>a month</span></p>
            <p className={styles.sub}>Optional. Only if you like what the first two months did. Month to month, stop whenever.</p>
            <ul>
              <li><Check size={17} strokeWidth={2.3} /><span><b>Profile managed weekly.</b> Photos, posts, festival hours and attributes kept current.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span><b>Reviews answered for you.</b> Drafted in your voice, within hours, every time.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span><b>Listings kept consistent.</b> New directories, changed numbers, moved addresses, all handled.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span><b>Your dashboard stays live.</b> Views, calls and direction requests from Google, whenever you look.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span><b>WhatsApp access stays open.</b> Same person, 9 am to 9 pm, no ticket queue.</span></li>
            </ul>
          </div>
        </Reveal>

        <Reveal className={styles.pricecard} style={{ marginTop: 16 }}>
          <div>
            <h3 className={styles.groupH} style={{ fontSize: 17, marginBottom: 6 }}>Worth knowing</h3>
            <ul className={styles.shapes}>
              <li><Check size={17} strokeWidth={2.3} /><span>The first look costs nothing, and nothing is charged before you have seen what we found.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span>The retainer is optional. Plenty of businesses take the two months and carry on themselves.</span></li>
              <li><Check size={17} strokeWidth={2.3} /><span>GST invoice every time. Pay by UPI, bank transfer or card.</span></li>
            </ul>
          </div>

          <div>
            <h3 className={styles.groupH} style={{ fontSize: 17, marginBottom: 6 }}>What moves the number</h3>
            <ul className={styles.shapes}>
              <li><MapPin size={17} strokeWidth={1.8} /><span><b>How crowded your area is.</b> Twenty cafés on one road takes more work than being the only clinic in the neighbourhood.</span></li>
              <li><Pencil size={17} strokeWidth={1.8} /><span><b>How much needs fixing first.</b> A profile that has never been touched needs a month of catch-up before the steady work starts.</span></li>
              <li><Clock size={17} strokeWidth={1.8} /><span><b>Whether you already have a website.</b> If you do, we improve that instead of building one, which usually brings the setup toward the lower end.</span></li>
              <li><Layers size={17} strokeWidth={1.8} /><span><b>How many locations.</b> A second or third outlet costs less than the first, because most of the groundwork carries over.</span></li>
            </ul>
            <a className={`${styles.btn} ${styles.btnGhostLight}`} style={{ marginTop: 22 }} href="#talk">
              Get a number for your business
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
