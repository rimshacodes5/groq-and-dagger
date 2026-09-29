import { defineField, defineType } from 'sanity'

export const evidence = defineType({
  name: 'evidence',
  title: 'Evidence',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Evidence Title', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Physical Item', value: 'physical' },
          { title: 'Document / Paperwork', value: 'document' },
          { title: 'Digital Record', value: 'digital' },
          { title: 'Audio / Witness Note', value: 'testimonial' },
        ],
      },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'locationFound', title: 'Location Found', type: 'string' }),
    defineField({ name: 'image', title: 'Photo / Scan', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'connectedSuspects',
      title: 'Connected Suspects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'suspect' }] }],
    }),
  ],
})