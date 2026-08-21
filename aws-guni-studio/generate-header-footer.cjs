const fs = require('fs');

const header = `import {defineField, defineType} from 'sanity'

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
`;

const footer = `import {defineField, defineType} from 'sanity'

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
`;

fs.writeFileSync('schemaTypes/header.ts', header);
fs.writeFileSync('schemaTypes/footer.ts', footer);
console.log('Header and Footer schemas generated.');
