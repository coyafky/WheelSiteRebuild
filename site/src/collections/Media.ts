import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: ({ req }) =>
      req.user
        ? true
        : {
            approvedForPublic: { equals: true },
        },
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data?.approvedForPublic) {
          const source = data.source ?? originalDoc?.source
          const rightsEvidence = data.rightsEvidence ?? originalDoc?.rightsEvidence
          if (!source || !rightsEvidence) {
            throw new Error('Public media requires a source and rights evidence.')
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    { name: 'source', type: 'text' },
    { name: 'rightsEvidence', type: 'textarea' },
    { name: 'approvedForPublic', type: 'checkbox', defaultValue: false },
    {
      name: 'proofSuitability',
      type: 'select',
      defaultValue: 'preview-only',
      options: [
        { label: 'Documentary evidence', value: 'documentary' },
        { label: 'Illustration', value: 'illustration' },
        { label: 'Preview only', value: 'preview-only' },
      ],
    },
  ],
  upload: true,
}
