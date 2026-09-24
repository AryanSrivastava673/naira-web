import styles from '@/app/growth/growth.module.css'
import Reveal from './Reveal'

const FAQS = [
  {
    q: 'What does the free first look actually include?',
    a: 'We go through your Google Business Profile, your Maps pin, your reviews, your Zomato and Swiggy pages and your website, and we compare you against the three closest businesses competing for the same searches. You get what we found and the one fix we would start with. No payment, and no sales call unless you ask for one.',
  },
  {
    q: 'How long before I see something change?',
    a: 'Profile fixes usually show up in four to eight weeks. Reviews and photos move quickly. Content and citations build over three to six months. Anyone promising page one in two weeks is either paying for ads or not telling you the truth.',
  },
  {
    q: 'Do I have to sign a contract?',
    a: 'No. There is no lock-in and no minimum term. If you continue on a retainer it is month to month, and you can stop whenever you like. We would rather you stay because the numbers are moving.',
  },
  {
    q: 'Does this work alongside Zomato and Swiggy?',
    a: 'Yes, and it should. Aggregators bring orders but they own the customer. Your Google profile, your reviews and your newsletter are yours. We clean up your aggregator pages too, so the details match everywhere.',
  },
  {
    q: 'Who writes the content and the review replies?',
    a: 'We do, in your voice, and you approve before anything goes live. If you would rather write them yourself, we will hand you the drafts and the calendar and stay out of the way.',
  },
  {
    q: 'What does it cost?',
    a: 'Two stages. The first two months cost ₹25,000 to ₹30,000 for both months together, and your website is included in that, along with blog posts and the keyword groundwork. After that a retainer starts at ₹2,500 a month, and it is optional. What moves you inside the range is how crowded your area is, how much needs fixing at the start, and whether you already have a website we can improve instead of building one. You get the exact number after the free look, and nothing is charged until you have seen what we found.',
  },
  {
    q: 'How do I pay, and do I get a GST invoice?',
    a: 'Bank transfer, UPI or card. You get a proper GST invoice from NairaMenus Pvt Ltd every month. Nothing is charged before we have shown you what we found.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className={`${styles.spread} ${styles.paper}`}>
      <div className={styles.inner}>
        <div className={styles.faqWrap}>
          <Reveal className={styles.shead}>
            <h2 className={styles.h1}>The questions everyone asks us first.</h2>
            <p className={styles.lead}>
              If something here is not covered, message us on WhatsApp. You will get a straight answer, not a
              callback form.
            </p>
          </Reveal>
          <Reveal className={styles.faq}>
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className={styles.a}>{f.a}</div>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
