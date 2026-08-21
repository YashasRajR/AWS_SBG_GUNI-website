import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Event Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Hackathon', value: 'hackathon'},
          {title: 'Speaker Session', value: 'speaker'},
          {title: 'Community', value: 'community'},
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Past', value: 'past'},
        ],
      },
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'details',
      title: 'Full Details',
      type: 'text',
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Name'},
          {name: 'designation', type: 'string', title: 'Designation'},
          {name: 'linkedin', type: 'url', title: 'LinkedIn URL'}
        ]
      }]
    }),
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'time', type: 'string', title: 'Time'},
          {name: 'activity', type: 'string', title: 'Activity'}
        ]
      }]
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
    }),
  ],
})
