import {
  getNavigationRoute,
  type NavigationRoute,
  type NavigationRouteId,
} from '@/navigation/route-registry'

const productRouteIds = [
  'products',
  'wheels',
  'ev-housings',
  'custom-aluminum',
  'safety-tires',
] as const satisfies readonly NavigationRouteId[]

const engineeringRouteIds = [
  'engineering',
  'wheel-engineering',
  'safety-tire-capabilities',
] as const satisfies readonly NavigationRouteId[]

const companyRouteIds = [
  'how-we-work',
  'about',
  'manufacturing',
  'contact',
] as const satisfies readonly NavigationRouteId[]

function routesFor(ids: readonly NavigationRouteId[]) {
  return ids.map((id) => getNavigationRoute(id))
}

const linkClass =
  'block min-h-11 break-words py-2 leading-6 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground'

function FooterLinkGroup({ label, routes }: { label: string; routes: readonly NavigationRoute[] }) {
  const headingId = `footer-${label.toLowerCase()}`

  return (
    <nav aria-labelledby={headingId} className="min-w-0">
      <h3 id={headingId} className="text-[21px] leading-7 font-[650]">
        {label}
      </h3>
      <ul className="mt-4 flex list-none flex-col p-0">
        {routes.map((route) => (
          <li key={route.id}>
            <a className={linkClass} href={route.path}>
              {route.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

type FooterLinkGroupsProps = {
  blogEnabled?: boolean
}

export function FooterLinkGroups({ blogEnabled = false }: FooterLinkGroupsProps) {
  const company = routesFor(companyRouteIds)

  if (blogEnabled) {
    company.push(getNavigationRoute('blog'))
  }

  return (
    <>
      <FooterLinkGroup label="Products" routes={routesFor(productRouteIds)} />
      <FooterLinkGroup label="Engineering" routes={routesFor(engineeringRouteIds)} />
      <FooterLinkGroup label="Company" routes={company} />
    </>
  )
}
