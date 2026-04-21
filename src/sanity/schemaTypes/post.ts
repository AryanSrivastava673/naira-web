import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'headline' }, validation: r => r.required() }),
    defineField({ name: 'headerImage', title: 'Header Image', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    ]}),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of: [defineField({
      name: 'faq', type: 'object', fields: [
        defineField({ name: 'question', title: 'Question', type: 'string' }),
        defineField({ name: 'answer', title: 'Answer', type: 'text' }),
      ],
    })] }),
  ],
  orderings: [{ title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'headline', subtitle: 'publishedAt', media: 'headerImage' } },
})
