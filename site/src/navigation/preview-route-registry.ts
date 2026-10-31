import { getNavigationRoute, type NavigationRouteId } from '@/navigation/route-registry'

const launchPreviewIds = [
  'products',
  'wheels',
  'wheel-flow-formed',
  'wheel-forged',
  'wheel-custom',
  'ev-housings',
  'custom-aluminum',
  'safety-tires',
  'engineering',
  'wheel-engineering',
  'safety-tire-capabilities',
  'how-we-work',
  'about',
  'manufacturing',
  'contact',
  'request-quote',
  'privacy-policy',
] as const satisfies readonly NavigationRouteId[]

const plannedPreviewIds = [
  'blog',
  'blog-technical',
  'blog-company-news',
  'terms-of-use',
] as const satisfies readonly NavigationRouteId[]

export function resolvePreviewRoute(
  segments: readonly string[],
  { allowPlanned = false }: { allowPlanned?: boolean } = {},
) {
  const path = `/${segments.join('/')}`
  const ids: readonly NavigationRouteId[] = allowPlanned
    ? [...launchPreviewIds, ...plannedPreviewIds]
    : launchPreviewIds
  return ids.map((id) => getNavigationRoute(id)).find((route) => route.path === path)
}
