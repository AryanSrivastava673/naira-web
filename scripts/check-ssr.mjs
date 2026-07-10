#!/usr/bin/env node
/**
 * Post-build SSR smoke test.
 *
 * Guards against the site-wide CSR-bailout regression (fixed in commit dd5f888)
 * where an unguarded `useSearchParams()` made every page render as an empty
 * ~23KB client shell that Google indexed. If any critical route ever renders
 * without real content again, this exits non-zero and fails the Vercel deploy.
 *
 * How it works: `next build` prerenders each route to `.next/server/app/**.html`.
 * We assert each critical route's HTML contains real rendered chrome (the
 * `</footer>` the Footer component emits) AND clears a size floor comfortably
 * above the empty-shell size. Healthy pages are ~75-123KB; the old shell was ~23KB.
 *
 * NOTE: We deliberately do NOT test for the string "BAILOUT_TO_CLIENT_SIDE_RENDERING".
 * That string is baked into Next.js's inlined runtime on EVERY healthy page, so
 * testing for it produces false positives. The reliable signal is the *presence*
 * of real content, not the absence of that marker.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const APP_DIR = '.next/server/app'
const MIN_BYTES = 30_000 // empty shell was ~23KB; healthy pages are 75KB+
const SENTINEL = '</footer>' // Footer renders on every page; absent in the bailout shell

// Top-level static routes → their prerendered .html file (relative to APP_DIR)
const STATIC_ROUTES = {
  '/': 'index.html',
  '/blog': 'blog.html',
  '/tap': 'tap.html',
  '/contact': 'contact.html',
  '/how-it-works': 'how-it-works.html',
  '/growth': 'growth.html',
  '/billing': 'billing.html',
}

// Dynamic route dirs → every prerendered slug .html inside is validated
const DYNAMIC_DIRS = ['blog', 'author']

/** @returns {string|null} failure reason, or null if the page is healthy */
function checkFile(absPath) {
  if (!existsSync(absPath)) return 'file missing (route did not prerender)'
  const bytes = statSync(absPath).size
  if (bytes < MIN_BYTES) return `too small (${bytes}B < ${MIN_BYTES}B) — looks like an empty shell`
  const html = readFileSync(absPath, 'utf8')
  if (!html.includes(SENTINEL)) return `missing "${SENTINEL}" — real content did not render`
  return null
}

const results = []

for (const [route, file] of Object.entries(STATIC_ROUTES)) {
  results.push({ route, reason: checkFile(join(APP_DIR, file)) })
}

for (const dir of DYNAMIC_DIRS) {
  const dirPath = join(APP_DIR, dir)
  if (!existsSync(dirPath)) {
    results.push({ route: `/${dir}/*`, reason: `no ${dir}/ dir — expected prerendered slugs` })
    continue
  }
  const htmlFiles = readdirSync(dirPath).filter((f) => f.endsWith('.html'))
  if (htmlFiles.length === 0) {
    results.push({ route: `/${dir}/*`, reason: `no prerendered slugs found in ${dir}/` })
    continue
  }
  for (const f of htmlFiles) {
    results.push({ route: `/${dir}/${f.replace(/\.html$/, '')}`, reason: checkFile(join(dirPath, f)) })
  }
}

const failures = results.filter((r) => r.reason)

console.log('\nSSR smoke test — %d routes checked\n', results.length)
for (const r of results) {
  console.log('  %s  %s%s', r.reason ? 'FAIL' : 'pass', r.route, r.reason ? `  — ${r.reason}` : '')
}

if (failures.length > 0) {
  console.error('\n✗ SSR check FAILED: %d route(s) rendered as empty/broken shells.', failures.length)
  console.error('  This is the CSR-bailout SEO regression. Do NOT deploy.\n')
  process.exit(1)
}

console.log('\n✓ SSR check passed: all %d routes render real server-side content.\n', results.length)
