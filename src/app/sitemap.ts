import type { MetadataRoute } from 'next'
import { getPostsForSitemap, getAuthorsForSitemap } from '@/lib/sanity'

const BASE_URL = 'https://nairamenus.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, authors] = await Promise.all([
    getPostsForSitemap(),
    getAuthorsForSitemap(),
  ])

  return [
    {
      url: BASE_URL,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...authors.map((author) => ({
      url: `${BASE_URL}/author/${author.slug}`,
      lastModified: author.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
