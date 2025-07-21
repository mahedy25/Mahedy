// ./schemas/toolType.ts
import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const toolType = defineType({
  name: 'tools',
  title: 'Tools',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tool Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Tool Logo/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
