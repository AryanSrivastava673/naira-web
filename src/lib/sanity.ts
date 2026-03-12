import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage, Post } from './types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: false,
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
      author-> { _id, name, slug, image { ..., asset-> } },
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
      author-> { _id, name, slug, image { ..., asset-> } },
      publishedAt,
      categories,
      body
    }`,
    { slug },
  )
}
