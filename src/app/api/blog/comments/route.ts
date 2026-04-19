import { NextResponse } from 'next/server'
import { client, writeClient } from '@/lib/sanity'

async function getPostIdBySlug(slug: string): Promise<string | null> {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]._id`, { slug })
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 })

    const postId = await getPostIdBySlug(slug)
    if (!postId) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    const comments = await client.fetch(
      `*[_type == "postComment" && post._ref == $postId && approved == true] | order(createdAt desc) {
        _id,
        name,
        message,
        createdAt
      }`,
      { postId },
    )

    return NextResponse.json({ comments })
  } catch {
    return NextResponse.json({ error: 'Failed to load comments' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { slug, name, message } = await req.json()

    if (!slug || !name || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const trimmedName = String(name).trim().slice(0, 80)
    const trimmedMessage = String(message).trim().slice(0, 1000)

    if (!trimmedName || !trimmedMessage) {
      return NextResponse.json({ error: 'Name and message cannot be empty' }, { status: 400 })
    }

    const postId = await getPostIdBySlug(slug)
    if (!postId) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    const created = await writeClient.create({
      _type: 'postComment',
      post: { _type: 'reference', _ref: postId },
      name: trimmedName,
      message: trimmedMessage,
      approved: true,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      comment: {
        _id: created._id,
        name: trimmedName,
        message: trimmedMessage,
        createdAt: created.createdAt,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 })
  }
}
