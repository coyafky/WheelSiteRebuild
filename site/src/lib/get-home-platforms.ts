import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'
import type { PlatformRecord } from '@/content/home-model'

function approvedMedia(media: number | Media | null | undefined): PlatformRecord['media'] {
  if (
    !media ||
    typeof media === 'number' ||
    !media.approvedForPublic ||
    !media.source ||
    !media.rightsEvidence ||
    !media.url ||
    !media.alt
  ) {
    return undefined
  }

  return { url: media.url, alt: media.alt, approvedForPublic: true }
}

export async function getHomePlatformRecords(): Promise<PlatformRecord[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'product-platforms',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { publicationState: { equals: 'published' } },
        ],
      },
      depth: 1,
      limit: 4,
      overrideAccess: false,
    })

    return result.docs.map((record) => ({
      platformId: record.platformId,
      title: record.title,
      intro: record.intro,
      publicationState: record.publicationState,
      media: approvedMedia(record.heroMedia),
    }))
  } catch {
    // The unpublished Home preview still renders without a local database.
    return []
  }
}
