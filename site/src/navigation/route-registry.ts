export const publicationFlags = {
  blog: false,
  privacyPolicy: false,
  termsOfUse: false,
} as const

export const contactMethods = [] as const

export const certifications = [] as const

const navigationRoutes = [
  { id: 'home', label: 'Home', path: '/', published: true },
  { id: 'products', label: 'Products', path: '/products', published: true },
  { id: 'wheels', label: 'Wheels', path: '/products/wheels', published: true },
  { id: 'ev-housings', label: 'EV Housings', path: '/products/ev-housings', published: true },
  {
    id: 'custom-aluminum',
    label: 'Custom Aluminum',
    path: '/products/custom-aluminum',
    published: true,
  },
  { id: 'safety-tires', label: 'Safety Tires', path: '/products/safety-tires', published: true },
  { id: 'engineering', label: 'Engineering', path: '/capabilities', published: true },
  {
    id: 'wheel-engineering',
    label: 'Wheel Engineering',
    path: '/capabilities/wheels',
    published: true,
  },
  {
    id: 'safety-tire-capabilities',
    label: 'Safety Tire Capabilities',
    path: '/capabilities/safety-tires',
    published: true,
  },
  { id: 'how-we-work', label: 'How We Work', path: '/how-we-work', published: true },
  { id: 'blog', label: 'Blog', path: '/blog', published: publicationFlags.blog },
  { id: 'about', label: 'About', path: '/about', published: true },
  { id: 'manufacturing', label: 'Manufacturing', path: '/about/manufacturing', published: true },
  { id: 'contact', label: 'Contact', path: '/contact', published: true },
  { id: 'request-quote', label: 'Request a Quote', path: '/request-quote', published: true },
  {
    id: 'privacy-policy',
    label: 'Privacy Policy',
    path: '/privacy-policy',
    published: publicationFlags.privacyPolicy,
  },
  {
    id: 'terms-of-use',
    label: 'Terms of Use',
    path: '/terms-of-use',
    published: publicationFlags.termsOfUse,
  },
] as const

export type NavigationRouteId = (typeof navigationRoutes)[number]['id']

export type NavigationRoute = (typeof navigationRoutes)[number]

const coreRouteIds = [
  'home',
  'products',
  'wheels',
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
] as const satisfies readonly NavigationRouteId[]

function isCanonicalPath(path: string): boolean {
  if (path === '/') return true
  if (!path.startsWith('/') || path.endsWith('/')) return false
  return !path.includes('#') && !path.includes('?') && !/\s/.test(path)
}

function findNavigationRoute(id: string): NavigationRoute | undefined {
  return navigationRoutes.find((item) => item.id === id)
}

export function getNavigationRoute<Id extends NavigationRouteId>(
  id: Id,
): Extract<NavigationRoute, { id: Id }> {
  const route = findNavigationRoute(id)

  if (!route) {
    throw new Error(`Unknown navigation route: ${id}`)
  }

  return route as Extract<NavigationRoute, { id: Id }>
}

export function requireNavigationRoute(id: string): NavigationRoute {
  const route = findNavigationRoute(id)

  if (!route || !isCanonicalPath(route.path)) {
    throw new Error(`Unknown or invalid navigation route: ${id}`)
  }

  return route
}

export function listNavigationRoutes(ids: readonly string[]): NavigationRoute[] {
  return ids.flatMap((id) => {
    const route = findNavigationRoute(id)
    if (!route?.published || !isCanonicalPath(route.path)) return []
    return [route]
  })
}

for (const id of coreRouteIds) {
  requireNavigationRoute(id)
}
