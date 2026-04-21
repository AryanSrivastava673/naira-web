import { defineField, defineType } from 'sanity'

export const growthLead = defineType({
  name: 'growthLead',
  title: 'Growth Leads',
  type: 'document',
  fields: [
    defineField({ name: 'restaurantName', title: 'Restaurant Name', type: 'string' }),
    defineField({ name: 'name', title: 'Contact Name', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'auditScore', title: 'Audit Score', type: 'number' }),
    defineField({ name: 'quizAnswers', title: 'Quiz Answers', type: 'object', fields: [
      defineField({ name: 'q1', title: 'Q1', type: 'string' }),
      defineField({ name: 'q2', title: 'Q2', type: 'string' }),
      defineField({ name: 'q3', title: 'Q3', type: 'string' }),
      defineField({ name: 'q4', title: 'Q4', type: 'string' }),
    ]}),
    defineField({ name: 'source', title: 'Source', type: 'string' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  orderings: [{ title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'restaurantName', subtitle: 'phone', description: 'submittedAt' },
    prepare: ({ title, subtitle, description }) => ({
      title: title ?? 'Unknown restaurant',
      subtitle: `${subtitle ?? ''}  •  ${description ? new Date(description).toLocaleDateString('en-IN') : ''}`,
    }),
  },
})
