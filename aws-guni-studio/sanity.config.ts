import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Sanity Project ID
export const projectId = '32efj5mi'
export const dataset = 'production'

export default defineConfig({
  name: 'aws-guni-cms',
  title: 'AWS GUNI CMS',

  projectId,
  dataset,

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Header / Navigation')
              .child(
                S.document()
                  .schemaType('header')
                  .documentId('header')
              ),
            S.listItem()
              .title('Footer')
              .child(
                S.document()
                  .schemaType('footer')
                  .documentId('footer')
              ),
            S.listItem()
              .title('Hero Section')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.listItem()
              .title('About Section')
              .child(
                S.document()
                  .schemaType('aboutSection')
                  .documentId('aboutSection')
              ),
            S.listItem()
              .title('Contact Section')
              .child(
                S.document()
                  .schemaType('contactSection')
                  .documentId('contactSection')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['siteSettings', 'header', 'footer', 'heroSection', 'aboutSection', 'contactSection'].includes(
                  listItem.getId() as string
                )
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
