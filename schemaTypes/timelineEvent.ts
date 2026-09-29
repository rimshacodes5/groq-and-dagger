import { defineField, defineType } from 'sanity'

export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Event Title', type: 'string' }),
    defineField({ name: 'timestamp', title: 'Time / Date', type: 'datetime' }),
    defineField({ name: 'description', title: 'What Happened', type: 'text' }),
    defineField({ name: 'verified', title: 'Verified Fact?', type: 'boolean', initialValue: false }),
    defineField({
      name: 'relatedSuspects',
      title: 'Related Suspects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'suspect' }] }],
    }),
  ],
})