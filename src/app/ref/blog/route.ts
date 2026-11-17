import { renderListing } from '@/lib/ref/render'

// Served at /blog via a rewrite in next.config.mjs. Revalidates so new Sanity posts appear.
export const revalidate = 60

export async function GET() {
  return renderListing()
}
