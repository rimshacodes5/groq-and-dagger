import { defineField, defineType } from 'sanity'

export const suspect = defineType({
  name: 'suspect',
  title: 'Suspect',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'alias', title: 'Alias / Moniker', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Prime Suspect', value: 'prime_suspect' },
          { title: 'Person of Interest', value: 'person_of_interest' },
          { title: 'Interrogated', value: 'interrogated' },
          { title: 'Cleared', value: 'cleared' },
        ],
      },
    }),
    defineField({ name: 'alibi', title: 'Alibi', type: 'text' }),
    defineField({ name: 'photo', title: 'Mugshot / Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'notes', title: 'Detective Notes', type: 'text' }),
  ],
})