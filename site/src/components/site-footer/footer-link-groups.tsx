import { getNavigationRoute, type NavigationRouteId } from '@/navigation/route-registry'
import { FooterContact, type ContactMethod } from '@/components/site-footer/footer-contact'

const groups = [
  {
    id: 'products',
    heading: 'Products',
    routeIds: ['products', 'wheels', 'ev-housings', 'custom-aluminum', 'safety-tires'],
  },
  {
    id: 'engineering',
    heading: 'Engineering',
    routeIds: ['engineering', 'wheel-engineering', 'safety-tire-capabilities'],
  },
  {
    id: 'company',
    heading: 'Company',
    routeIds: ['how-we-work', 'about', 'manufacturing', 'contact'],
  },
] as const satisfies readonly { id: string; heading: string; routeIds: readonly NavigationRouteId[] }[]

export function FooterLinkGroups({ blogEnabled = false, contactMethods = [] }: { blogEnabled?: boolean; contactMethods?: readonly ContactMethod[] }) {
  return (
    <nav aria-label="Footer links" className="mx-auto grid w-full max-w-[1500px] gap-10 px-5 pb-14 pt-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:px-10">
      {groups.map((group) => {
        const routeIds: NavigationRouteId[] = [...group.routeIds]
        if (group.id === 'company' && blogEnabled) routeIds.push('blog')

        return (
          <section key={group.id} aria-labelledby={`footer-${group.id}`} className="min-w-0">
            <h2 id={`footer-${group.id}`} className="mb-5 text-base font-semibold">{group.heading}</h2>
            <ul className="space-y-3">
              {routeIds.map((id) => {
                const route = getNavigationRoute(id)
                return (
                  <li key={route.id}>
                    <a href={route.path} className="inline-block max-w-full rounded-sm text-sm leading-6 text-card/85 underline-offset-4 hover:text-card hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-card">
                      {route.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
      <FooterContact methods={contactMethods} />
    </nav>
  )
}
