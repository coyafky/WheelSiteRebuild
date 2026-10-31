import type { RefObject } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import { getNavigationRoute, type NavigationRoute, type NavigationRouteId } from '@/navigation/route-registry'
import { HeaderActions } from '@/components/site-header/header-actions'

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
  productsOpen: boolean
  productsButtonRef: RefObject<HTMLButtonElement | null>
  onProductsToggle: () => void
  mobileOpen: boolean
  menuButtonRef: RefObject<HTMLButtonElement | null>
  onMobileToggle: () => void
}

export function PrimaryHeader({ currentPath = '', blogEnabled = false, productsOpen, productsButtonRef, onProductsToggle, mobileOpen, menuButtonRef, onMobileToggle }: PrimaryHeaderProps) {
  const home = getNavigationRoute('home')
  const routes: NavigationRoute[] = primaryRouteIds.map((id) => getNavigationRoute(id))

  if (blogEnabled) {
    const howWeWork = routes.findIndex((route) => route.id === 'how-we-work')
    routes.splice(howWeWork + 1, 0, getNavigationRoute('blog'))
  }

  return (
    <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[1500px] items-center gap-2 px-5 text-sm font-semibold sm:gap-4 sm:px-8 lg:gap-8 lg:px-10">
      <DestinationLink href={home.path} label="Brand preview" currentPath={currentPath} />
      <nav aria-label="Primary" className="hidden flex-1 items-center gap-6 lg:flex">
        {routes.map((route) => (
          route.id === 'products' ? (
            <div key={route.id} className="flex items-center gap-1">
              <DestinationLink href={route.path} label={route.label} currentPath={currentPath} />
              <button
                ref={productsButtonRef}
                type="button"
                aria-label="Show products"
                aria-expanded={productsOpen}
                aria-controls="products-mega-menu"
                onClick={onProductsToggle}
                className={`${linkFocus} flex min-h-11 min-w-11 items-center justify-center hover:bg-muted`}
              >
                <ChevronDown className="size-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <DestinationLink key={route.id} href={route.path} label={route.label} currentPath={currentPath} />
          )
        ))}
      </nav>
      <HeaderActions currentPath={currentPath} />
      <button
        ref={menuButtonRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-site-navigation"
        onClick={onMobileToggle}
        className={`${linkFocus} flex min-h-11 min-w-11 items-center justify-center lg:hidden`}
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>
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
