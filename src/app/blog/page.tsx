import Link from 'next/link'
import Image from 'next/image'
import { getPosts, urlFor } from '@/lib/sanity'
import type { Post } from '@/lib/types'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog — Naira Menus',
  description: 'Insights, updates, and stories from the Naira Menus team.',
  alternates: {
    canonical: 'https://nairamenus.in/blog',
  },
  openGraph: {
    title: 'Blog — Naira Menus',
    description: 'Insights, updates, and stories from the Naira Menus team.',
    type: 'website',
    url: 'https://nairamenus.in/blog',
  },
  twitter: {
    card: 'summary',
    title: 'Blog — Naira Menus',
    description: 'Insights, updates, and stories from the Naira Menus team.',
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function PostCard({ post }: { post: Post }) {
  const imageUrl = post.headerImage?.asset ? urlFor(post.headerImage).width(800).height(450).url() : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col rounded-2xl border border-naira-border bg-naira-surface overflow-hidden hover:border-naira-gold/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-52 bg-naira-card">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.headerImage?.alt ?? post.headline}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-naira-surface/60 to-transparent" />
      </div>
      <div className="flex flex-col flex-1 p-6">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 3).map((cat) => (
              <span key={cat} className="px-2 py-0.5 rounded-full bg-naira-gold/10 text-naira-gold text-[10px] font-medium tracking-wider uppercase">
                {cat}
              </span>
            ))}
          </div>
        )}
        <h2
          className="text-naira-text font-semibold text-xl leading-snug mb-2 group-hover:text-naira-gold transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {post.headline}
        </h2>
        {post.excerpt && (
          <p className="text-naira-text-muted text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-naira-border text-xs text-naira-muted">
          {post.author?.slug?.current ? (
            <Link
              href={`/author/${post.author.slug.current}`}
              className="hover:text-naira-gold transition-colors"
            >
              {post.author.name ?? 'Naira Team'}
            </Link>
          ) : (
            <span>{post.author?.name ?? 'Naira Team'}</span>
          )}
          <span>{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  let posts: Post[] = []
  try {
    posts = await getPosts()
  } catch {
    // fail silently
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog — Naira Menus',
    description: 'Insights, updates, and stories from the Naira Menus team.',
    url: 'https://nairamenus.in/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Naira Menus',
      logo: { '@type': 'ImageObject', url: 'https://nairamenus.in/icon.png' },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://nairamenus.in/blog/${post.slug.current}`,
        name: post.headline,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-naira-black pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 pt-8">
            <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
              Blog
            </span>
            <h1
              className="font-display text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Insights & Stories
            </h1>
            <p className="text-naira-text-muted text-lg max-w-xl mx-auto">
              From the team building the future of restaurant operations.
            </p>
          </div>

          {/* Posts grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-naira-text-muted text-lg">No posts yet — check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
