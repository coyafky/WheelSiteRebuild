import { getNavigationRoute } from '@/navigation/route-registry'

export const platformRoutes = [
  getNavigationRoute('wheels'),
  getNavigationRoute('ev-housings'),
  getNavigationRoute('custom-aluminum'),
  getNavigationRoute('safety-tires'),
] as const

export type PlatformId = (typeof platformRoutes)[number]['id']

export type PlatformRecord = {
  platformId: PlatformId
  title: string
  intro: string
  publicationState: 'draft' | 'published' | 'withdrawn'
  media?: { url: string; alt: string; approvedForPublic: boolean } | null
}

export type HomePlatform = {
  id: PlatformId
  title: string
  intro?: string
  status: 'ready' | 'pending'
  href?: string
  media?: { url: string; alt: string }
}

// Fixed Wheels topic records are shared with their future pages; they do not
// imply that any topic route is public yet.
export const wheelPathRoutes = [
  {
    id: 'flow-formed',
    title: 'Flow-Formed Wheels',
    kind: 'process',
    path: '/products/wheels/flow-formed',
    buyerTask: 'Explore a flow-forming route for a defined wheel sourcing requirement.',
    inputs: 'Prepare target dimensions, application and validation needs.',
  },
  {
    id: 'forged',
    title: 'Forged Wheels',
    kind: 'process',
    path: '/products/wheels/forged',
    buyerTask: 'Review a forging route against a project or purchasing brief.',
    inputs: 'Prepare drawings, material preferences and validation needs.',
  },
  {
    id: 'custom',
    title: 'Custom Wheels',
    kind: 'project',
    path: '/products/wheels/custom',
    buyerTask: 'Start a wheel project from a drawing, sample or target requirement.',
    inputs: 'Share the application, dimensions, quantity and open questions.',
  },
] as const

export type HomeWheelPath = (typeof wheelPathRoutes)[number] & { href?: string }

export function buildHomeModel(
  records: readonly PlatformRecord[],
  publicRoutes: ReadonlySet<string>,
): { platforms: HomePlatform[]; wheelPaths: HomeWheelPath[] } {
  return {
    platforms: platformRoutes.map((route) => {
      const record = records.find(
        (item) => item.platformId === route.id && item.publicationState === 'published',
      )
      const ready = Boolean(record && publicRoutes.has(route.path))

      return {
        id: route.id,
        title: record?.title || route.label,
        intro: record?.intro,
        status: ready ? 'ready' : 'pending',
        href: ready ? route.path : undefined,
        media:
          record?.media?.approvedForPublic && record.media.url && record.media.alt
            ? { url: record.media.url, alt: record.media.alt }
            : undefined,
      }
    }),
    wheelPaths: wheelPathRoutes.map((route) => ({
      ...route,
      href: publicRoutes.has(route.path) ? route.path : undefined,
    })),
  }
}
