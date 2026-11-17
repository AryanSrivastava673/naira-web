# Deployment guide: website redesign

Branch: `website-redesign` (branched from `develop`). Host: Vercel (`vercel.json`). Framework: Next.js 14 (App Router).

This document covers what changed, what to configure, how to deploy, how to verify, and how to roll back.

---

## 1. What this release changes

The marketing site was redesigned from a reference design. Pages now come from three different mechanisms, which matters for debugging:

| Route | Served by | Source |
|---|---|---|
| `/`, `/tap`, `/billing`, `/growth`, `/about`, `/nfc` | Static HTML files via rewrites | `public/site/*.html` (images in `public/site/img/`) |
| `/quick-solutions` | Static HTML via rewrite | `public/quick-solutions.html` (+ `public/quick-solutions/`) |
| `/qr-studio` (new) | Static HTML via rewrite | `public/qr-studio/` (page, images, scan-engine `.wasm`) |
| `/privacy-policy` | Static HTML via rewrite | `public/privacy-policy.html` |
| `/blog`, `/blog/<slug>` | Route handlers, rendered from live Sanity data | `src/app/ref/blog/`, `src/lib/ref/` |
| `/api/*` | Next route handlers (unchanged) | `src/app/api/` |

How the routing works (`next.config.mjs`):

- `rewrites().beforeFiles` maps `/`, `/tap`, `/billing`, `/growth`, `/about`, `/nfc`, `/blog`, `/blog/:slug` to the new pages. `beforeFiles` runs before the App Router check, so it wins over the older Next pages that still exist at the same paths.
- `rewrites().afterFiles` maps `/privacy-policy`, `/quick-solutions`, `/qr-studio`.
- The old Next pages (`src/app/page.tsx`, `tap`, `billing`, `growth`, `about`, `nfc`, `blog`) were deliberately **left in the repo**. They are not served while the rewrites exist.
- The `/blog/5-reasons-why-changing-your-restaurant-menu-matters` → `...-reddit` 301 and the `www` → apex 301 are unchanged.

New in this release: About page, NFC Check page, the free QR Studio (`/qr-studio`), a "Free tool" promo on Quick Solutions, the blog in the new design, and Quick Solutions product images/video + font change.

---

## 2. Prerequisites

- Node 18.17+ (Next 14 requirement). `npm ci` installs from `package-lock.json`.
- Access to the Vercel project and its environment variables.
- Read access to the Sanity project/dataset (public dataset, queried through the CDN).

---

## 3. Environment variables

Set these in Vercel (Production and Preview). Names come from the code; the values live in `.env.local` locally and are not committed.

| Variable | Needed for | If missing |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Blog, sitemap | **Build/blog fails.** Required. |
| `NEXT_PUBLIC_SANITY_DATASET` | Blog, sitemap | **Build/blog fails.** Required. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Blog (defaults to `2024-01-01`) | Falls back to default |
| `SANITY_WRITE_TOKEN` | Blog **likes and comments** (writes to Sanity). Server-only, never expose to the browser | Reading works; liking/commenting fails |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Demo-request / lead notification emails | Email is skipped with a console warning; the form still responds |
| `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO` | Email sender / recipients | Defaults to `Naira Menus <support@nairamenus.in>` and built-in recipients |
| `GOOGLE_PAGESPEED_API_KEY` | `/api/audit` (Growth audit) | Audit endpoint cannot call PageSpeed |
| `INDEXNOW_API_KEY` | `/api/indexnow` (search engine pings) | Endpoint not functional |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | PostHog analytics on the Next-rendered pages | Analytics disabled |

Analytics note: the static pages load Google Tag Manager container `GTM-MXN7T65Q` (same container as before). PostHog only runs on pages rendered by Next (not on the static redesigned pages).

---

## 4. Build and deploy

`vercel.json` already sets the build command:

```bash
next build && node scripts/check-ssr.mjs
```

`scripts/check-ssr.mjs` is a deploy gate: it inspects the prerendered Next pages and **fails the build** if any renders as an empty client shell (a previous SEO regression). It currently passes (27 routes). It does not test the static pages or the blog route handlers; use the checklist below for those.

Deploy options:

1. **Preview first (recommended):** open a PR from `website-redesign` into `develop`; Vercel builds a preview. Run the checklist below against the preview URL.
2. **Production:** merge to the production branch as per your normal flow, then run the checklist against `https://nairamenus.in`.

Local run:

```bash
npm ci
npm run dev        # http://localhost:3000  (predev deletes a stale .next from a prior build)
npm run build && npm start   # production check
```

Do not run `npm run build` while `npm run dev` is running: they share `.next` and the dev server then serves a broken stylesheet. `predev` guards the dev side; just stop dev before building.

---

## 5. Post-deploy checklist

Replace `$H` with the preview/production host.

```bash
for u in / /tap /billing /growth /about /nfc /blog /quick-solutions /qr-studio /privacy-policy /sitemap.xml /robots.txt; do
  printf "%-20s %s\n" $u "$(curl -s -o /dev/null -w '%{http_code}' https://$H$u)"
done
```

All should return `200`. Then check by eye:

- [ ] Home, Tap, Billing, Growth, About, NFC: load, header menu works on mobile, no horizontal scroll.
- [ ] `/blog`: all posts listed (currently 18); topic tabs filter; images load.
- [ ] Open 2-3 posts: title, hero image, table of contents, FAQ, "Read next". Toggle dark mode.
- [ ] Like a post and add a comment (confirms `SANITY_WRITE_TOKEN`). Remove the test comment in Sanity afterwards.
- [ ] Quick Solutions: product images and the video load; the "Free QR Studio" promo appears above the dark band.
- [ ] `/qr-studio`: the sample QR shows "Strong scan"; downloading asks for an email once, then downloads.
- [ ] `/robots.txt` disallows `/api/`, `/studio/`, `/ref/`. `/sitemap.xml` includes `/qr-studio` and the blog posts.
- [ ] View source on a blog post: canonical is `https://nairamenus.in/blog/<slug>` and there is Article (and FAQ) JSON-LD.

---

## 6. Things that behave differently from before

- **Blog freshness:** blog pages revalidate every 60 seconds (`export const revalidate = 60`). A new Sanity post appears within about a minute, with no redeploy.
- **Blog categories:** the topic tabs (Menus & Tap / Billing / Google Growth) come from each post's Sanity `categories`. Posts with empty categories use a built-in slug map, and unknown new ones fall back to keywords in the title. A post with no recognisable category lands under Menus & Tap.
- **`/ref/*` routes:** the blog handlers physically live at `/ref/blog...` and are exposed at `/blog...` by rewrites. `/ref/` is blocked in `robots.txt` and every page has a canonical to the real URL.
- **Redesigned pages are static files.** Editing copy means editing the HTML in `public/site/`. The Navbar/Footer React components do not apply to them.

---

## 7. QR Studio setup (not complete yet)

- Email signups are **not saved**: `signupEndpoint` in `public/qr-studio/index.html` is empty. To collect leads, deploy the Google Apps Script from the QR Studio package (`signup-google-apps-script.gs`, README section 2) and paste the web-app URL (ends in `/exec`) into `signupEndpoint`. Until then downloads still work.
- The privacy policy should mention that the QR Studio collects an email address.
- The page loads three libraries from jsDelivr (`qrcode-generator@1.4.4`, `jszip@3.10.1`, `zxing-wasm@3.1.5`), pinned to fixed versions. The scan engine `.wasm` is served from this repo.

---

## 8. Rollback

- **Fast rollback of a bad deploy:** in Vercel, promote the previous deployment.
- **Revert only the redesign routing:** remove the `beforeFiles` block (and the `/qr-studio`, `/quick-solutions`, `/privacy-policy` entries if needed) from `rewrites()` in `next.config.mjs`. The previous Next pages are still in the repo and will be served again. `check-ssr.mjs` already validates them.
- **Revert the code:** `git revert` the merge, or redeploy the previous `develop` commit.

---

## 9. Known limitations

- The generator scripts used to import the design (reference → `public/site/*.html`, the blog templates in `src/lib/ref/templates.ts`, and the Quick Solutions / QR Studio chrome changes) are **not in the repo**. `templates.ts` is generated output and shows a "do not hand-edit" header. Small text fixes can be made directly in the files, but re-importing an updated design would need those scripts to be recreated.
- The old Next pages and components (Navbar, Footer, blog pages, etc.) are now dead code while the rewrites are active. They are kept for rollback; remove them in a later cleanup once the redesign is stable.
- Likes/comments were verified by reading live data and by inspecting the requests the page sends. A real write was not exercised against production data during development.
- The Quick Solutions product images were not in git before this release and were added from the design artifact. If they are ever moved, the page references `/quick-solutions/img/...` and `/quick-solutions/naira-tap-cards.mp4`.
