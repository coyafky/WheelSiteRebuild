export const publicationFlags = {
  blog: false,
  privacyPolicy: false,
  termsOfUse: false,
} as const

export const contactMethods = [] as const

export const certifications = [] as const

const navigationRoutes = [
  { id: 'home', label: 'Home', path: '/', published: false },
  { id: 'products', label: 'Products', path: '/products', published: false },
  { id: 'wheels', label: 'Wheels', path: '/products/wheels', published: false },
  { id: 'wheel-flow-formed', label: 'Flow-Formed Wheels', path: '/products/wheels/flow-formed', published: false },
  { id: 'wheel-forged', label: 'Forged Wheels', path: '/products/wheels/forged', published: false },
  { id: 'wheel-custom', label: 'Custom Wheels', path: '/products/wheels/custom', published: false },
  { id: 'ev-housings', label: 'EV Housings', path: '/products/ev-housings', published: false },
  {
    id: 'custom-aluminum',
    label: 'Custom Aluminum',
    path: '/products/custom-aluminum',
    published: false,
  },
  { id: 'safety-tires', label: 'Safety Tires', path: '/products/safety-tires', published: false },
  { id: 'engineering', label: 'Engineering', path: '/capabilities', published: false },
  {
    id: 'wheel-engineering',
    label: 'Wheel Engineering',
    path: '/capabilities/wheels',
    published: false,
  },
  {
    id: 'safety-tire-capabilities',
    label: 'Safety Tire Capabilities',
    path: '/capabilities/safety-tires',
    published: false,
  },
  { id: 'how-we-work', label: 'How We Work', path: '/how-we-work', published: false },
  { id: 'blog', label: 'Blog', path: '/blog', published: publicationFlags.blog },
  { id: 'blog-technical', label: 'Technical Articles', path: '/blog/technical', published: false },
  { id: 'blog-company-news', label: 'Company News', path: '/blog/company-news', published: false },
  { id: 'about', label: 'About', path: '/about', published: false },
  { id: 'manufacturing', label: 'Manufacturing', path: '/about/manufacturing', published: false },
  { id: 'contact', label: 'Contact', path: '/contact', published: false },
  { id: 'request-quote', label: 'Request a Quote', path: '/request-quote', published: false },
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
] as const satisfies readonly NavigationRouteId[]

export function isCanonicalPath(path: string): boolean {
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

export function listNavigationRoutes(ids: readonly string[], { includeUnpublished = false }: { includeUnpublished?: boolean } = {}): NavigationRoute[] {
  return ids.flatMap((id) => {
    const route = findNavigationRoute(id)
    if (!route || (!route.published && !includeUnpublished) || !isCanonicalPath(route.path)) return []
    return [route]
  })
}

for (const id of coreRouteIds) {
  requireNavigationRoute(id)
}
