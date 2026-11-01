import type { Ref } from 'react'
import { getNavigationRoute, type NavigationRoute, type NavigationRouteId } from '@/navigation/route-registry'
import { HeaderActions } from '@/components/site-header/header-actions'
import { productsMegaMenuId } from '@/components/site-header/products-mega-menu'

const primaryRouteIds = [
  'products',
  'engineering',
  'how-we-work',
  'about',
  'contact',
] as const satisfies readonly NavigationRouteId[]

const linkFocus =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

type PrimaryHeaderProps = {
  currentPath?: string
  blogEnabled?: boolean
  productsOpen?: boolean
  productsDisclosureRef?: Ref<HTMLButtonElement>
  onToggleProducts?: () => void
}

export function PrimaryHeader({
  currentPath = '',
  blogEnabled = false,
  productsOpen = false,
  productsDisclosureRef,
  onToggleProducts,
}: PrimaryHeaderProps) {
  const home = getNavigationRoute('home')
  const routes: NavigationRoute[] = primaryRouteIds.map((id) => getNavigationRoute(id))

  if (blogEnabled) {
    const howWeWork = routes.findIndex((route) => route.id === 'how-we-work')
    routes.splice(howWeWork + 1, 0, getNavigationRoute('blog'))
  }

  return (
    <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[1500px] items-center gap-8 px-5 text-sm font-semibold sm:px-8 lg:px-10">
      <DestinationLink href={home.path} label="Brand preview" currentPath={currentPath} />
      <nav aria-label="Primary" className="flex flex-1 items-center gap-6">
        {routes.map((route) =>
          route.id === 'products' ? (
            <span key={route.id} className="inline-flex items-center gap-1">
              <DestinationLink href={route.path} label={route.label} currentPath={currentPath} />
              <button
                ref={productsDisclosureRef}
                type="button"
                aria-expanded={productsOpen}
                aria-controls={productsMegaMenuId}
                className={linkFocus}
                onClick={onToggleProducts}
                onMouseEnter={(event) => event.currentTarget.classList.add('is-hovered')}
                onMouseLeave={(event) => event.currentTarget.classList.remove('is-hovered')}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return
                  event.preventDefault()
                  onToggleProducts?.()
                }}
              >
                Show product platforms
              </button>
            </span>
          ) : (
            <DestinationLink
              key={route.id}
              href={route.path}
              label={route.label}
              currentPath={currentPath}
            />
          ),
        )}
      </nav>
      <HeaderActions currentPath={currentPath} />
    </div>
  )
}

function DestinationLink({
  href,
  label,
  currentPath,
}: {
  href: string
  label: string
  currentPath: string
}) {
  const state = destinationState(href, currentPath)

  return (
    <a
      href={href}
      aria-current={state === 'page' ? 'page' : undefined}
      className={state ? `${linkFocus} border-b-2 border-brand-accent` : linkFocus}
    >
      {label}
      {state === 'section' ? <span className="sr-only"> current section</span> : null}
    </a>
  )
}

function destinationState(path: string, currentPath: string) {
  if (currentPath === path) return 'page'
  if (path !== '/' && currentPath.startsWith(`${path}/`)) return 'section'
  return undefined
}
