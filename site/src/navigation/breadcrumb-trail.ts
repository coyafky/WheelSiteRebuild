import {
  getNavigationRoute,
  type NavigationRoute,
  type NavigationRouteId,
} from '@/navigation/route-registry'

const parents: Partial<Record<NavigationRouteId, NavigationRouteId>> = {
  products: 'home',
  wheels: 'products',
  'ev-housings': 'products',
  'custom-aluminum': 'products',
  'safety-tires': 'products',
  'wheel-flow-formed': 'wheels',
  'wheel-forged': 'wheels',
  'wheel-custom': 'wheels',
  engineering: 'home',
  'wheel-engineering': 'engineering',
  'safety-tire-capabilities': 'engineering',
  about: 'home',
  manufacturing: 'about',
  'how-we-work': 'home',
  contact: 'home',
  'request-quote': 'home',
  'privacy-policy': 'home',
  'terms-of-use': 'home',
  blog: 'home',
  'blog-technical': 'blog',
  'blog-company-news': 'blog',
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
