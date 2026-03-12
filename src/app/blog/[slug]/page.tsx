import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getPostBySlug, getPosts, urlFor } from '@/lib/sanity'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import type { PortableTextBlock } from '@/lib/types'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found — Naira Menus' }
  return {
    title: `${post.headline} — Naira Menus Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug.current }))
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-2xl font-bold text-naira-text mt-8 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-naira-text mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-naira-gold pl-4 my-4 italic text-naira-muted">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-naira-text-muted leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-naira-text font-semibold">{children}</strong>
    ),
    link: ({ value, children }: { value?: { href: string; openInNewTab?: boolean }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target={value?.openInNewTab ? '_blank' : undefined}
        rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
        className="text-naira-gold underline hover:text-naira-gold-light"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => {
      const src = urlFor(value as Parameters<typeof urlFor>[0]).width(1200).url()
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image src={src} alt={value.alt ?? ''} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs text-naira-muted mt-2">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const headerImageUrl = urlFor(post.headerImage).width(1600).height(900).url()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-naira-black">
        {/* Header image */}
        <div className="relative h-[55vh] min-h-[380px] bg-naira-card">
          <Image
            src={headerImageUrl}
            alt={post.headerImage.alt ?? post.headline}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-naira-black via-naira-black/40 to-transparent" />
        </div>

        {/* Post body */}
        <div className="max-w-3xl mx-auto px-6 -mt-32 relative pb-20">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <span key={cat} className="px-2.5 py-1 rounded-full bg-naira-gold/10 text-naira-gold text-xs font-medium tracking-wider uppercase">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="font-display text-4xl md:text-5xl font-bold text-naira-text mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {post.headline}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 pb-6 mb-8 border-b border-naira-border text-sm text-naira-muted">
            <span>{post.author?.name ?? 'Naira Team'}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          {/* Body */}
          <article>
            <PortableText
              value={post.body as PortableTextBlock[]}
              components={portableTextComponents as Parameters<typeof PortableText>[0]['components']}
            />
          </article>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-naira-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-naira-gold text-sm hover:text-naira-gold-light transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
