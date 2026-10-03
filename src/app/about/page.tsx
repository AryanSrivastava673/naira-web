/* eslint-disable @next/next/no-img-element -- art-directed crops via CSS vars, ported 1:1 from the design */
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutReveal from '@/components/about/AboutReveal'
import './about.css'

export const metadata: Metadata = {
  alternates: { canonical: 'https://nairamenus.in/about' },
  title: 'About Us - The People Behind Naira | Naira Menus',
  description:
    'Meet the team behind Naira Menus. Five real people building smart menus, billing and online growth for restaurants across India.',
  openGraph: {
    title: 'About Us - The People Behind Naira | Naira Menus',
    description:
      'Meet the team behind Naira Menus. Five real people building smart menus, billing and online growth for restaurants across India.',
    type: 'website',
    url: 'https://nairamenus.in/about',
  },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Naira Menus',
  url: 'https://nairamenus.in/about',
  mainEntity: {
    '@type': 'Organization',
    name: 'Naira Menus Pvt Ltd',
    url: 'https://nairamenus.in',
    areaServed: { '@type': 'Country', name: 'India' },
    employee: [
      { '@type': 'Person', name: 'Ashay Gohad', jobTitle: 'Director' },
      { '@type': 'Person', name: 'Aryan Srivastava', jobTitle: 'Director' },
      { '@type': 'Person', name: 'Priyanshu', jobTitle: 'Marketing & Sales' },
      { '@type': 'Person', name: 'Amann', jobTitle: 'Operations & Tech' },
      { '@type': 'Person', name: 'Atharva', jobTitle: 'Tech & Content' },
    ],
  },
}

// Photo crop/zoom knobs read by `.ph img` in about.css.
const crop = (vars: Record<string, string>) => vars as CSSProperties

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Navbar />
      <AboutReveal>
        <main>
          {/* ============ HERO ============ */}
          <section className="hero dark" id="top">
            <div className="container hero-grid">
              <div>
                <span className="eyebrow reveal">About Naira</span>
                <h1 className="t-display reveal">Real people.<br />Behind every <span className="accent">tap</span>.</h1>
                <p className="t-lead reveal">Naira isn&apos;t a call centre or a faceless app. It&apos;s a small team that sits at your counter, learns how your kitchen runs, and stays on the line long after setup is done.</p>
                <div className="hero-btns reveal">
                  <a href="#team" className="btn btn-primary">Meet the Team<Arrow /></a>
                  <a href="#products" className="btn btn-ghost">What We Build</a>
                </div>
              </div>
              <figure className="hero-photo reveal">
                <div className="ph">
                  <img src="/about/team/directors.webp" alt="Ashay Gohad and Aryan Srivastava, directors of Naira, standing behind a restaurant counter in Naira caps" width={960} height={1280} fetchPriority="high" />
                </div>
                <figcaption className="hero-cap">
                  <div>
                    <div className="names">Ashay &amp; Aryan</div>
                    <div className="role">Directors</div>
                  </div>

                </figcaption>
              </figure>
            </div>
          </section>

          {/* ============ STORY ============ */}
          <section className="section light" id="story">
            <div className="container">
              <div className="split-head">
                <div className="reveal">
                  <span className="eyebrow">Our Story</span>
                  <h2 className="t-h1">We started at the counter.<br /><span className="accent">Not</span> in a boardroom.</h2>
                </div>
                <p className="two-tone reveal"><b>Naira began with one simple idea: restaurants deserve tech that feels as warm as their hospitality.</b> Paper menus that cost a fortune to reprint, billing software nobody on staff enjoys, and a Google listing nobody has time to manage. We kept seeing the same problems, so we built one platform to fix all three, and a team that actually shows up.</p>
              </div>

              <div className="story-body">
                <figure className="story-photo reveal">
                  <div className="ph">
                    <img src="/about/team/team-at-work.webp" alt="Priyanshu giving a thumbs up with a cup of chai while Aryan takes a call on a headset" width={978} height={1280} loading="lazy" style={crop({ '--op': '50% 80%' })} />
                  </div>
                  <figcaption><b>A regular Tuesday at Naira Menus!</b></figcaption>
                </figure>
                <ol className="beliefs">
                  <li className="reveal"><span className="n">01</span><div><h3>We pick up the phone.</h3><p>A real person who knows your restaurant by name, not a ticket number.</p></div></li>
                  <li className="reveal"><span className="n">02</span><div><h3>We learn your floor first.</h3><p>How your tables turn, what sells, when it gets busy. Then we set things up.</p></div></li>
                  <li className="reveal"><span className="n">03</span><div><h3>We win when you win.</h3><p>More orders, better reviews, fuller tables. That&apos;s the only scoreboard we track.</p></div></li>
                </ol>
              </div>
            </div>
          </section>

          {/* ============ TEAM ============ */}
          <section className="section light" id="team" style={{ borderTop: '1px solid var(--line)' }}>
            <div className="container">
              <div className="team-head reveal">
                <span className="eyebrow">The People</span>
                <h2 className="t-h1">Faces you&apos;ll<br />actually <span className="accent">meet</span>.</h2>
                <p className="t-lead">The names on this page are the people who pick up your call, visit your restaurant and set up your menus.</p>
              </div>

              <div className="directors">
                <article className="person reveal">
                  <div className="ph"><img src="/about/team/ashay.webp" alt="Portrait of Ashay Gohad" width={1500} height={2000} loading="lazy" style={crop({ '--op': '50% 30%' })} /></div>
                  <div className="person-row"><h3>Ashay Gohad</h3><span className="role">Director</span></div>
                  <p>Listens to restaurant owners until the real problem is clear, then makes sure Naira solves it.</p>
                </article>
                <article className="person reveal">
                  <div className="ph"><img src="/about/team/aryan.webp" alt="Portrait of Aryan Srivastava" width={736} height={738} loading="lazy" style={crop({ '--op': '35% 30%' })} /></div>
                  <div className="person-row"><h3>Aryan Srivastava</h3><span className="role">Director</span></div>
                  <p>Usually found with a headset on, deep in a call with a restaurant that needed something yesterday.</p>
                </article>
              </div>

              <div className="members">
                <article className="person reveal">
                  <div className="ph"><img src="/about/team/priyanshu.webp" alt="Portrait of Priyanshu" width={980} height={1280} loading="lazy" style={crop({ '--z': '1.8', '--o': '53% 47%' })} /></div>
                  <div className="person-row"><h3>Priyanshu</h3><span className="role">Marketing &amp; Sales</span></div>
                  <p>The first hello for most of our restaurants. Probably on the road to the next one.</p>
                </article>
                <article className="person reveal">
                  <div className="ph"><img src="/about/team/amann.webp" alt="Portrait of Amann" width={1200} height={1600} loading="lazy" style={crop({ '--z': '1.6', '--o': '47% 40%' })} /></div>
                  <div className="person-row"><h3>Amann</h3><span className="role">Operations &amp; Tech</span></div>
                  <p>Keeps every menu loading and every bill printing, especially on a Saturday night.</p>
                </article>
                <article className="person reveal">
                  <div className="ph"><img src="/about/team/atharva.webp" alt="Portrait of Atharva" width={960} height={1280} loading="lazy" style={crop({ '--z': '1.3', '--o': '50% 85%' })} /></div>
                  <div className="person-row"><h3>Atharva</h3><span className="role">TECH &amp; CONTENT</span></div>
                  <p>Builds and ships the code behind our menus and dashboards, then writes the words and shoots the reels that show them off.</p>
                </article>
                <Link className="growing reveal" href="/contact" aria-label="And growing. Pull up a chair, get in touch">
                  <div>
                    <div className="amp" aria-hidden="true">&amp;</div>
                    <div className="g-word">growing<span className="dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span></div>
                    <p>Every restaurant we work with ends up part of this team. The next seat is yours.</p>
                  </div>
                  <span className="link">Pull up a chair<Arrow /></span>
                </Link>
              </div>
            </div>
          </section>

          {/* ============ PRODUCTS ============ */}
          <section className="section dark" id="products">
            <div className="container">
              <div className="split-head">
                <div className="reveal">
                  <span className="eyebrow">What We Build</span>
                  <h2 className="t-h1">Three products.<br />One <span className="accent">restaurant</span> OS.</h2>
                </div>
                <p className="two-tone reveal"><b>Each one works on its own.</b> Together, an order placed at the table flows into billing and comes back as reviews, rankings and new guests.</p>
              </div>
              <div className="prod-grid">
                <article className="prod reveal" style={crop({ '--pc': 'var(--tap)' })}>
                  <div className="prod-top"><span>01</span><span className="prod-dot" /></div>
                  <h3 className="t-h3">Naira Tap</h3>
                  <div className="tag">Smart digital menus</div>
                  <p>Guests tap an NFC card or scan a QR and your menu opens instantly. No app, no wait, with photos and pairings that nudge every table to order a little more.</p>
                  <Link className="link" href="/tap">See Naira Tap<Arrow /></Link>
                </article>
                <article className="prod reveal" style={crop({ '--pc': 'var(--billing)' })}>
                  <div className="prod-top"><span>02</span><span className="prod-dot" /></div>
                  <h3 className="t-h3">Naira Billing</h3>
                  <div className="tag">Billing &amp; POS</div>
                  <p>Billing your staff actually likes using. Orders land in the POS the moment they&apos;re placed, and daily reports write themselves.</p>
                  <Link className="link" href="/billing">See Naira Billing<Arrow /></Link>
                </article>
                <article className="prod reveal" style={crop({ '--pc': 'var(--growth)' })}>
                  <div className="prod-top"><span>03</span><span className="prod-dot" /></div>
                  <h3 className="t-h3">Naira Growth</h3>
                  <div className="tag">Online presence</div>
                  <p>Your Google profile, reviews, socials and AI search, managed as one, so the next hungry person nearby finds you first.</p>
                  <Link className="link" href="/growth">See Naira Growth<Arrow /></Link>
                </article>
              </div>
              <p className="prod-foot reveal">Tap brings them in. Billing keeps it moving. Growth brings them <b>back</b>.</p>
            </div>
          </section>

          {/* ============ CLOSING ============ */}
          <section className="closing dark" style={{ borderTop: '1px solid var(--border-dark)' }}>
            <div className="container inner">
              <h2 className="t-display reveal">Five people. A lot of chai.<br /><span className="accent"><span className="big-amp">&amp;</span> growing.</span></h2>
              <p className="t-lead reveal">Every restaurant that trusts us makes this team a little bigger. Come say hello, we&apos;d love to meet you in person.</p>
              <div className="btns reveal">
                <Link href="/contact" className="btn btn-primary">Say Hello<Arrow /></Link>
                <a href="https://wa.me/919021044699" className="btn btn-ghost" target="_blank" rel="noopener">WhatsApp Us</a>
              </div>
            </div>
          </section>
        </main>
      </AboutReveal>
      <Footer />
    </>
  )
}
