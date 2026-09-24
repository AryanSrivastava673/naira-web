import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['italic'],
  variable: '--font-playfair-display',
  display: 'swap',
})
