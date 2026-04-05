import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAuthorBySlug, getAuthorPosts, getPosts, urlFor } from '@/lib/sanity'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import type { Post } from '@/lib/types'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug)
  if (!author) return { title: 'Author Not Found — Naira Menus' }
  return {
    title: `${author.name} — Naira Menus`,
    description: author.bio ?? `Posts by ${author.name}`,
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  const slugs = new Set(
    posts.map((p) => p.author?.slug?.current).filter(Boolean) as string[]
  )
  return Array.from(slugs).map((slug) => ({ slug }))
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function PostCard({ post }: { post: Post }) {
  const imageUrl = urlFor(post.headerImage).width(800).height(450).url()
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col rounded-2xl border border-naira-border bg-naira-surface overflow-hidden hover:border-naira-gold/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 bg-naira-card">
        <Image
          src={imageUrl}
          alt={post.headerImage.alt ?? post.headline}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-naira-surface/60 to-transparent" />
      </div>
      <div className="flex flex-col flex-1 p-5">
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
        <h3
          className="text-naira-text font-semibold text-lg leading-snug mb-2 group-hover:text-naira-gold transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {post.headline}
        </h3>
        {post.excerpt && (
          <p className="text-naira-text-muted text-sm leading-relaxed line-clamp-2 flex-1 mb-3">
            {post.excerpt}
          </p>
        )}
        <p className="text-naira-muted text-xs pt-3 border-t border-naira-border">
          {formatDate(post.publishedAt)}
        </p>
      </div>
    </Link>
  )
}

export default async function AuthorPage({ params }: Props) {
  const author = await getAuthorBySlug(params.slug)
  if (!author) notFound()

  const posts = await getAuthorPosts(author._id)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-naira-black">
        {/* Hero */}
        <div className="pt-32 pb-16 px-6 relative">
          {/* Subtle background glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-10 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, #F59E0B 0%, transparent 70%)',
            }}
          />

          <div className="max-w-3xl mx-auto relative">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-naira-muted text-sm hover:text-naira-gold transition-colors mb-10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Blog
            </Link>

            {/* Author card */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              {/* Avatar */}
              <div className="shrink-0">
                <div
                  className="w-36 h-36 rounded-full overflow-hidden border-2 border-naira-gold/40"
                  style={{ boxShadow: '0 0 32px rgba(245,158,11,0.15)' }}
                >
                  {author.photo ? (
                    <Image
                      src={urlFor(author.photo).width(288).height(288).url()}
                      alt={author.name}
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-naira-surface">
                      <span
                        className="text-5xl font-bold text-naira-gold"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {author.name[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1
                  className="text-4xl font-bold text-naira-text mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {author.name}
                </h1>

                {author.role && (
                  <p className="text-naira-gold text-sm font-medium tracking-wide mb-4">
                    {author.role}
                  </p>
                )}

                {author.bio && (
                  <p className="text-naira-text-muted text-base leading-relaxed max-w-lg mb-5">
                    {author.bio}
                  </p>
                )}

                {/* Social links */}
                {(author.twitter || author.linkedin || author.website) && (
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    {author.twitter && (
                      <a
                        href={author.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter / X"
                        className="w-9 h-9 rounded-full border border-naira-border bg-naira-surface flex items-center justify-center text-naira-muted hover:text-naira-gold hover:border-naira-gold/40 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {author.linkedin && (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-9 h-9 rounded-full border border-naira-border bg-naira-surface flex items-center justify-center text-naira-muted hover:text-naira-gold hover:border-naira-gold/40 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {author.website && (
                      <a
                        href={author.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                        className="w-9 h-9 rounded-full border border-naira-border bg-naira-surface flex items-center justify-center text-naira-muted hover:text-naira-gold hover:border-naira-gold/40 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="border-t border-naira-border" />
        </div>

        {/* Posts */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2
            className="text-2xl font-bold text-naira-text mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {posts.length > 0
              ? `Posts by ${author.name}`
              : `No posts yet by ${author.name}`}
          </h2>

          {posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
