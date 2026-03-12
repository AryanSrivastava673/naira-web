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
  image?: SanityImage
  bio?: PortableTextBlock[]
}

export type PortableTextBlock = {
  _type: string
  _key: string
  [key: string]: unknown
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
}
