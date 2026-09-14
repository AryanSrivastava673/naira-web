import Link from 'next/link'
import Image from 'next/image'
import { getPosts, urlFor } from '@/lib/sanity'
import type { Post } from '@/lib/types'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

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
      className="blog-card group relative flex flex-col overflow-hidden"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 16,
      }}
    >
      {/* Stretched link covers the whole card */}
      <Link href={`/blog/${post.slug.current}`} className="absolute inset-0 z-10" aria-label={post.headline} />

      {/* Image */}
      {/* position is set inline as well as via the class: next/image `fill` is
          positioned with an inline absolute, so if the stylesheet ever fails to
          load the class alone would not contain it and the image would cover the
          viewport. */}
      <div
        className="relative h-48 overflow-hidden"
        style={{ position: 'relative', background: '#f5f5f5' }}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.headerImage?.alt ?? post.headline}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-1 p-5">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="font-mono px-2 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase"
                style={{ background: `rgba(${PINK_RGB},0.08)`, color: PINK, borderRadius: 8 }}
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Headline */}
        <h3
          className="font-sans font-semibold text-lg leading-snug mb-2 tracking-[-0.01em] transition-colors"
          style={{ color: '#1a1a1a' }}
        >
          {post.headline}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm leading-relaxed line-clamp-2 flex-1 mb-4" style={{ color: '#6b7280' }}>
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0" style={{ background: '#f5f5f5', border: '1px solid rgba(0,0,0,0.06)' }}>
              {post.author?.photo?.asset ? (
                <Image
                  src={urlFor(post.author.photo).width(48).height(48).url()}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: `rgba(${PINK_RGB},0.10)` }}>
                  <span className="font-mono text-[8px] font-medium" style={{ color: PINK }}>
                    {post.author?.name?.[0] ?? 'N'}
                  </span>
                </div>
              )}
            </div>
            {post.author?.slug?.current ? (
              <Link
                href={`/author/${post.author.slug.current}`}
                className="relative z-20 text-xs transition-colors"
                style={{ color: '#6b7280' }}
              >
                {post.author.name ?? 'Naira Team'}
              </Link>
            ) : (
              <span className="text-xs" style={{ color: '#6b7280' }}>{post.author?.name ?? 'Naira Team'}</span>
            )}
          </div>
          <span className="font-mono text-[11px] tracking-[0.04em]" style={{ color: '#9ca3af' }}>{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </div>
  )
}

function EmptyBlog() {
  return (
    <div className="col-span-full text-center py-16">
      <div
        className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
        style={{ background: `rgba(${PINK_RGB},0.08)`, border: `1px solid rgba(${PINK_RGB},0.18)`, borderRadius: 16 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="1.5">
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
          <polyline points="17 2 17 8 23 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>
      <p className="text-sm" style={{ color: '#6b7280' }}>
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
    <section id="blog" className="py-28 px-6 relative" style={{ background: '#ffffff' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: PINK }}>
              From the Naira Team
            </p>
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em]" style={{ color: '#1a1a1a' }}>
              Insights &amp; <span style={{ color: PINK }}>Updates</span>
            </h2>
          </div>
          {displayPosts.length > 0 && (
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: PINK }}
            >
              View all posts
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
