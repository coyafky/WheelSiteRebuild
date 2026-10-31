import type { CollectionConfig, Where } from 'payload'

const staffOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)
const publicRead: Where = {
  and: [
    { _status: { equals: 'published' } },
    { publicationState: { equals: 'published' } },
  ],
}

export const ProductPlatforms: CollectionConfig = {
  slug: 'product-platforms',
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  access: {
    create: staffOnly,
    update: staffOnly,
    delete: staffOnly,
    read: ({ req }) => (req.user ? true : publicRead),
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc, operation }) => {
        if (
          operation === 'update' &&
          data?.platformId !== undefined &&
          data.platformId !== originalDoc?.platformId
        ) {
          throw new Error('A product platform ID cannot be changed after creation.')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'platformId',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Wheels', value: 'wheels' },
        { label: 'EV Housings', value: 'ev-housings' },
        { label: 'Custom Aluminum', value: 'custom-aluminum' },
        { label: 'Safety Tires', value: 'safety-tires' },
      ],
    },
    {
      name: 'publicationState',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Withdrawn', value: 'withdrawn' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'intro', type: 'textarea', required: true },
    { name: 'buyerContext', type: 'textarea' },
    { name: 'heroMedia', type: 'relationship', relationTo: 'media' },
    { name: 'seoTitle', type: 'text', required: true },
    { name: 'seoDescription', type: 'textarea', required: true },
  ],
}
