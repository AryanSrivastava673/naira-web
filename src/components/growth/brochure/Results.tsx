import Image from 'next/image'
import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'
import RevealFill from './RevealFill'

export default function Results() {
  return (
    <section id="results" className={`${styles.spread} ${styles.paperDeep}`}>
      <div className={styles.inner}>
        <Reveal className={styles.shead}>
          <h2 className={styles.h1}>More people finding you, more people walking in.</h2>
          <p className={styles.lead}>
            Steady, honest growth in the numbers that matter: profile views, searches, calls, direction requests and
            visits. Slow and steady in the beginning, and worth the patience.
          </p>
        </Reveal>

        <Reveal className={styles.res}>
          <article className={styles.rescard}>
            <span className={styles.resIc} style={{ background: '#1a73e8' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round">
                <path d="M5 20V11M12 20V5m7 15v-7" />
              </svg>
            </span>
            <h3 className={styles.h3}>Good results seen on Google</h3>
            <p>Your Business Profile performing better month after month, in Google&rsquo;s own numbers.</p>
            <div className={styles.perf}>
              <div className={styles.perfH}>Performance · last 30 days</div>
              <div className={styles.tiles}>
                <div className={styles.tile}><div className={styles.k}>Views</div><div className={styles.v}>12.6K</div><div className={styles.d}>↑ 28%</div></div>
                <div className={styles.tile}><div className={styles.k}>Searches</div><div className={styles.v}>6.7K</div><div className={styles.d}>↑ 22%</div></div>
                <div className={styles.tile}><div className={styles.k}>Actions</div><div className={styles.v}>1.8K</div><div className={styles.d}>↑ 35%</div></div>
              </div>
              <svg viewBox="0 0 260 70" style={{ width: '100%', height: 62, display: 'block' }} aria-label="Profile views trending upward over 30 days">
                <defs>
                  <linearGradient id="growthSpark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a73e8" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#1a73e8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 62h260M0 40h260M0 18h260" stroke="rgba(21,16,22,.07)" strokeWidth="1" />
                <path d="M2 56 22 52 42 55 62 46 82 49 102 39 122 42 142 31 162 34 182 24 202 27 222 16 242 12 258 8 258 68 2 68Z" fill="url(#growthSpark)" />
                <path d="M2 56 22 52 42 55 62 46 82 49 102 39 122 42 142 31 162 34 182 24 202 27 222 16 242 12 258 8" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="258" cy="8" r="3.4" fill="#1a73e8" />
                <circle cx="258" cy="8" r="6.5" fill="#1a73e8" opacity=".18" />
              </svg>
              <div className={styles.won}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#188038" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}>
                  <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0Z" />
                  <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
                </svg>
                <span><b>You&rsquo;re getting more views.</b> 28% more than last month.</span>
              </div>
            </div>
          </article>

          <article className={styles.rescard}>
            <span className={styles.resIc} style={{ background: '#188038' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13" cy="4" r="2" />
                <path d="m9 21 2-6-3-3 1-5 4 2 3 1" />
                <path d="m9 12-3 2m8 1 2 6" />
              </svg>
            </span>
            <h3 className={styles.h3}>More walk-ins to your business</h3>
            <p>People finding you on Google and actually turning up. Direction requests are the number we watch hardest.</p>
            <Image className={styles.cardPhoto} src="/growth/walkins.jpg" alt="Two customers walking in through the open door of a café" width={660} height={413} />
            <div className={styles.perf} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className={styles.perfH}>Where they came from</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { label: 'Direction requests', pct: 41, w: 82 },
                  { label: 'Calls from the listing', pct: 33, w: 66 },
                  { label: 'Website clicks', pct: 26, w: 52 },
                ].map((r) => (
                  <div key={r.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--body)' }}>
                      <span>{r.label}</span>
                      <span style={{ fontFamily: 'var(--mono)', color: 'var(--pink)' }}>+{r.pct}%</span>
                    </div>
                    <div className={styles.track} style={{ height: 8, marginTop: 5 }}>
                      <RevealFill percent={r.w} className={`${styles.fill} ${styles.fillHi}`} style={{ display: 'block' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.cap} style={{ margin: '4px 0 0' }}>Weekday footfall is where most of the gain shows up first.</p>
            </div>
          </article>

          <article className={styles.rescard}>
            <span className={styles.resIc} style={{ background: '#f5a623' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <h3 className={styles.h3}>Your business discovered on Google</h3>
            <p>Showing up in the top three Maps results for the searches that happen near you.</p>
            <div className={styles.perf}>
              <div className={styles.perfH}>Google · &ldquo;cafe near me&rdquo;</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  { rank: 1, name: 'Riverwood Café', meta: '4.6 (128) · 0.3 km', src: '/growth/thumb-coffee.jpg', top: true },
                  { rank: 2, name: 'The Daily Grind', meta: '4.4 (95) · 0.5 km', src: '/growth/thumb-interior.jpg', top: false },
                  { rank: 3, name: 'Cafe Arista', meta: '4.3 (76) · 0.7 km', src: '/growth/thumb-table.jpg', top: false },
                ].map((r) => (
                  <div
                    key={r.rank}
                    style={{
                      display: 'flex',
                      gap: 9,
                      alignItems: 'center',
                      background: '#fff',
                      border: r.top ? '1px solid var(--pink-line)' : '1px solid var(--line-soft)',
                      borderRadius: 9,
                      padding: '8px 10px',
                      boxShadow: r.top ? '0 4px 14px rgba(255,43,163,.10)' : undefined,
                    }}
                  >
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: r.top ? 'var(--pink)' : 'var(--hint)' }}>{r.rank}</span>
                    <Image src={r.src} alt="" width={26} height={26} style={{ width: 26, height: 26, borderRadius: 6, objectFit: 'cover', flex: 'none' }} />
                    <span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, display: 'block', lineHeight: 1.25 }}>{r.name}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: '#5f6368' }}>
                        <span className={styles.starsR}>★</span>{r.meta}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <p className={styles.cap} style={{ margin: '11px 0 0' }}>
                The three-result block. Above it, nothing. Below it, almost nobody scrolls.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
