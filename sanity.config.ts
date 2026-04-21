import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'naira-menus',
  title: 'Naira Menus',

  projectId: 'ssdak8m5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Blog Posts').schemaType('post').child(S.documentTypeList('post')),
            S.listItem().title('Authors').schemaType('author').child(S.documentTypeList('author')),
            S.divider(),
            S.listItem().title('Growth Leads').schemaType('growthLead').child(S.documentTypeList('growthLead')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
