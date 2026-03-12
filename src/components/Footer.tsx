import Link from 'next/link'

const footerLinks = {
  Products: [
    { label: 'Naira Billing', href: '#products' },
    { label: 'Naira Tap', href: '#products' },
    { label: 'Naira Growth', href: '#products' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
}

function ContactSection() {
  return (
    <div
      id="contact"
      className="rounded-2xl border border-naira-gold/20 p-8 mb-16"
      style={{ background: 'linear-gradient(135deg, rgba(109,148,197,0.06) 0%, rgba(0,0,0,0) 100%)' }}
    >
      <div className="max-w-xl mx-auto text-center">
        <h3
          className="font-display text-3xl md:text-4xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ready to modernise your restaurant?
        </h3>
        <p className="text-naira-text-muted text-base mb-6">
          Get early access to Naira Menus. We&apos;re onboarding a limited number
          of restaurants for our pilot — let&apos;s talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:hello@nairamenus.in"
            className="px-6 py-3 rounded-full bg-naira-gold text-naira-black text-sm font-semibold hover:bg-naira-gold-light transition-colors"
          >
            hello@nairamenus.in
          </a>
          <a
            href="tel:+91XXXXXXXXXX"
            className="px-6 py-3 rounded-full border border-naira-border text-naira-text text-sm font-medium hover:border-naira-gold/40 transition-colors"
          >
            Request a Demo Call
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-naira-black border-t border-naira-border px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <ContactSection />

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-naira-border">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-naira-gold flex items-center justify-center">
                <span className="text-naira-black font-bold text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>N</span>
              </div>
              <span className="font-display font-semibold text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Naira <span className="text-naira-gold">Menus</span>
              </span>
            </div>
            <p className="text-naira-text-muted text-sm leading-relaxed max-w-xs">
              The future of restaurant operations. NFC-powered menus, smart POS,
              and growth tools — all in one platform.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-naira-text text-sm font-semibold mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-naira-text-muted text-sm hover:text-naira-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-naira-muted text-xs">
          <p>© {new Date().getFullYear()} Naira Menus. All rights reserved.</p>
          <p className="text-center">
            Made with care for Indian restaurants 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
