import { defineField, defineType } from 'sanity'

export const contradiction = defineType({
  name: 'contradiction',
  title: 'Contradiction',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Contradiction Title', type: 'string' }),
    defineField({ name: 'description', title: "Why it doesn't add up", type: 'text' }),
    defineField({
      name: 'severity',
      title: 'Severity',
      type: 'string',
      options: {
        list: [
          { title: 'Minor Discrepancy', value: 'minor' },
          { title: 'Major Conflict', value: 'major' },
          { title: 'Case Breaker', value: 'case_breaker' },
        ],
      },
    }),
    defineField({
      name: 'evidenceInvolved',
      title: 'Evidence Involved',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'evidence' }] }],
    }),
    defineField({
      name: 'suspectInvolved',
      title: 'Suspect Involved',
      type: 'reference',
      to: [{ type: 'suspect' }],
    }),
  ],
})