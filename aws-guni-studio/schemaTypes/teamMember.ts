import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Coordinator', value: 'coordinator'},
          {title: 'Mentor', value: 'mentor'},
          {title: 'Core', value: 'core'},
          {title: 'Executive', value: 'executive'},
          {title: 'Technical', value: 'technical'},
          {title: 'Marketing', value: 'marketing'},
        ],
      },
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url',
    }),
  ],
})
