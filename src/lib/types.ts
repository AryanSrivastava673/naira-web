export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Author {
  _id: string
  name: string
  slug: { current: string }
  photo?: SanityImage
  role?: string
  bio?: string
  twitter?: string
  linkedin?: string
  website?: string
}

export type PortableTextBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}

export interface FAQ {
  _key: string
  question: string
  answer: string
}

export interface Post {
  _id: string
  headline: string
  slug: { current: string }
  headerImage: SanityImage
  excerpt?: string
  author: Author
  publishedAt: string
  categories?: string[]
  body: PortableTextBlock[]
  faqs?: FAQ[]
}
