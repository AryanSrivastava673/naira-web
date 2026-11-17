import { renderPost } from '@/lib/ref/render'

// Served at /blog/:slug via a rewrite in next.config.mjs. Revalidates so edits in Sanity appear.
export const revalidate = 60

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  return renderPost(params.slug)
}
