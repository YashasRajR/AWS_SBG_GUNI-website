import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Footer Description',
      type: 'text',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'platform', type: 'string', title: 'Platform (e.g. LinkedIn, GitHub)'},
          {name: 'url', type: 'url', title: 'URL'}
        ]
      }]
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
})
