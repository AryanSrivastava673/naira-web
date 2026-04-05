import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage, Post, Author } from './types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: false,
})

// Server-only write client (uses SANITY_WRITE_TOKEN, never exposed to browser)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      headline,
      slug,
      headerImage { ..., asset-> },
      excerpt,
      author-> { _id, name, slug, photo { ..., asset-> }, role },
      publishedAt,
      categories
    }`,
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      headline,
      slug,
      headerImage { ..., asset-> },
      excerpt,
      author-> { _id, name, slug, photo { ..., asset-> }, role },
      publishedAt,
      categories,
      body,
      faqs[] { _key, question, answer }
    }`,
    { slug },
  )
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return client.fetch(
    `*[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      photo { ..., asset-> },
      role,
      bio,
      twitter,
      linkedin,
      website
    }`,
    { slug },
  )
}

export async function getAuthorPosts(authorId: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && author._ref == $authorId] | order(publishedAt desc) {
      _id,
      headline,
      slug,
      headerImage { ..., asset-> },
      excerpt,
      author-> { _id, name, slug, photo { ..., asset-> }, role },
      publishedAt,
      categories
    }`,
    { authorId },
  )
}
