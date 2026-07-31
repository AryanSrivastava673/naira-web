/**
 * Guard against starting `next dev` on top of a production build.
 *
 * `next build` and `next dev` both write to .next but produce incompatible
 * layouts. If dev starts on a directory left behind by a build, the served
 * HTML references a stylesheet path the dev server cannot produce, so
 * /_next/static/css/app/layout.css 404s and the page renders with no CSS at
 * all. That is not a cosmetic problem: next/image with `fill` positions
 * itself with an INLINE `position:absolute; inset:0`, and relies on a parent
 * carrying the Tailwind `relative` class to contain it. Inline styles survive
 * a stylesheet failure, the class does not, so every fill image escapes to the
 * nearest positioned ancestor and covers the entire viewport.
 *
 * `next build` writes .next/BUILD_ID; `next dev` does not. Its presence is
 * therefore an exact marker for "this directory is a production build", and
 * the only case where we need to wipe. Normal dev restarts keep their cache.
 */
import { existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), '.next')
const buildMarker = join(distDir, 'BUILD_ID')

if (existsSync(buildMarker)) {
  rmSync(distDir, { recursive: true, force: true })
  console.log('[clean-stale-build] Removed .next left over from `next build` — dev would have served a 404 stylesheet.')
}
