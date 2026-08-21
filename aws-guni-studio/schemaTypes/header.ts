import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header / Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Title'},
          {name: 'url', type: 'string', title: 'URL'}
        ]
      }]
    }),
    defineField({
      name: 'callToActionButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        {name: 'label', type: 'string', title: 'Button Label'},
        {name: 'link', type: 'string', title: 'Button Link'}
      ]
    }),
  ],
})
