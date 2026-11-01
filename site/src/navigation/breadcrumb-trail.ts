import {
  getNavigationRoute,
  type NavigationRoute,
  type NavigationRouteId,
} from '@/navigation/route-registry'

const parents: Partial<Record<NavigationRouteId, NavigationRouteId>> = {
  products: 'home',
  wheels: 'products',
}

export function getBreadcrumbTrail(
  currentId: NavigationRouteId,
  mode: 'preview' | 'public' = 'preview',
): NavigationRoute[] | null {
  if (currentId === 'home') return null

  const trail: NavigationRoute[] = []
  let id: NavigationRouteId | undefined = currentId

  while (id) {
    const route = getNavigationRoute(id)
    if (mode === 'public' && !route.published) return null
    trail.unshift(route)
    if (id === 'home') return trail
    id = parents[id]
  }

  return null
}
