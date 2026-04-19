import { NextResponse } from 'next/server'
import { client, writeClient } from '@/lib/sanity'

function likeId(postId: string, visitorId: string): string {
  const key = `${postId}-${visitorId}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0
  }
  return `postLike-${Math.abs(hash).toString(36)}`
}

async function getPostIdBySlug(slug: string): Promise<string | null> {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]._id`, { slug })
}

async function getLikeCount(postId: string): Promise<number> {
  return client.fetch(`count(*[_type == "postLike" && post._ref == $postId])`, { postId })
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const visitorId = searchParams.get('visitorId') || ''

    if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 })

    const postId = await getPostIdBySlug(slug)
    if (!postId) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    const count = await getLikeCount(postId)
    let liked = false
    if (visitorId) {
      const existing = await client.fetch(
        `*[_id == $id][0]._id`,
        { id: likeId(postId, visitorId) },
      )
      liked = Boolean(existing)
    }

    return NextResponse.json({ count, liked })
  } catch {
    return NextResponse.json({ error: 'Failed to load likes' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { slug, visitorId } = await req.json()

    if (!slug || !visitorId) {
      return NextResponse.json({ error: 'Slug and visitorId are required' }, { status: 400 })
    }

    const postId = await getPostIdBySlug(slug)
    if (!postId) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    const id = likeId(postId, visitorId)
    const existing = await client.fetch(`*[_id == $id][0]._id`, { id })

    let liked: boolean
    if (existing) {
      await writeClient.delete(id)
      liked = false
    } else {
      await writeClient.createIfNotExists({
        _id: id,
        _type: 'postLike',
        post: { _type: 'reference', _ref: postId },
        visitorId,
        createdAt: new Date().toISOString(),
      })
      liked = true
    }

    const count = await getLikeCount(postId)
    return NextResponse.json({ count, liked })
  } catch {
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 })
  }
}
