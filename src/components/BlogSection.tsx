import Link from 'next/link'
import Image from 'next/image'
import { getPosts, urlFor } from '@/lib/sanity'
import type { Post } from '@/lib/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function BlogCard({ post }: { post: Post }) {
  const imageUrl = post.headerImage?.asset ? urlFor(post.headerImage).width(800).height(450).url() : null

  return (
    <div
      className="group relative flex flex-col rounded-2xl border border-naira-border bg-naira-surface overflow-hidden hover:border-naira-gold/30 transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
    >
      {/* Stretched link covers the whole card */}
      <Link href={`/blog/${post.slug.current}`} className="absolute inset-0 z-0" aria-label={post.headline} />

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-naira-card">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.headerImage?.alt ?? post.headline}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-naira-surface/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-5">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 rounded-full bg-naira-gold/10 text-naira-gold text-[10px] font-medium tracking-wider uppercase"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Headline */}
        <h3
          className="text-naira-text font-semibold text-lg leading-snug mb-2 group-hover:text-naira-gold transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {post.headline}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-naira-text-muted text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-naira-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-naira-card border border-naira-border overflow-hidden shrink-0">
              {post.author?.photo?.asset ? (
                <Image
                  src={urlFor(post.author.photo).width(48).height(48).url()}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-naira-gold/20">
                  <span className="text-[8px] text-naira-gold font-bold">
                    {post.author?.name?.[0] ?? 'N'}
                  </span>
                </div>
              )}
            </div>
            {post.author?.slug?.current ? (
              <Link
                href={`/author/${post.author.slug.current}`}
                className="relative z-10 text-naira-muted text-xs hover:text-naira-gold transition-colors"
              >
                {post.author.name ?? 'Naira Team'}
              </Link>
            ) : (
              <span className="text-naira-muted text-xs">{post.author?.name ?? 'Naira Team'}</span>
            )}
          </div>
          <span className="text-naira-muted text-xs">{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </div>
  )
}

function EmptyBlog() {
  return (
    <div className="col-span-full text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-naira-gold/10 border border-naira-gold/20 flex items-center justify-center mx-auto mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
          <polyline points="17 2 17 8 23 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>
      <p className="text-naira-text-muted text-sm">
        Blog posts coming soon. Stay tuned!
      </p>
    </div>
  )
}

export default async function BlogSection() {
  let posts: Post[] = []
  try {
    posts = await getPosts()
  } catch {
    // Silently fail — show empty state
  }

  const displayPosts = posts.slice(0, 3)

  return (
    <section id="blog" className="py-28 px-6 bg-naira-surface relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-4">
              From the Naira Team
            </span>
            <h2
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Insights & Updates
            </h2>
          </div>
          {displayPosts.length > 0 && (
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-naira-gold hover:text-naira-gold-light transition-colors"
            >
              View all posts
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <EmptyBlog />
          )}
        </div>
      </div>
    </section>
  )
}
