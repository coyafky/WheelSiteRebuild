import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { getNavigationRoute, listNavigationRoutes, type NavigationRouteId } from '@/navigation/route-registry'

const productIds = ['wheels', 'ev-housings', 'custom-aluminum', 'safety-tires'] as const
const capabilityIds = ['wheel-engineering', 'safety-tire-capabilities'] as const

type MobileNavigationDrawerProps = {
  currentPath: string
  blogEnabled: boolean
  onClose: () => void
  onNavigate: () => void
}

export function MobileNavigationDrawer({ currentPath, blogEnabled, onClose, onNavigate }: MobileNavigationDrawerProps) {
  const [engineeringOpen, setEngineeringOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const products = listNavigationRoutes(productIds)
  const capabilities = listNavigationRoutes(capabilityIds)
  const remainingIds: NavigationRouteId[] = ['how-we-work', ...(blogEnabled ? ['blog' as const] : []), 'about', 'contact']

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const header = dialogRef.current?.closest('header')
    const siblings = [...(header?.parentElement?.children ?? [])].filter((element) => element !== header) as HTMLElement[]
    const previousInert = siblings.map((element) => element.inert)
    siblings.forEach((element) => { element.inert = true })
    closeButtonRef.current?.focus()

    const containFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', containFocus)
    return () => {
      document.removeEventListener('keydown', containFocus)
      document.body.style.overflow = previousOverflow
      siblings.forEach((element, index) => { element.inert = previousInert[index] })
    }
  }, [onClose])

  function routeLink(id: NavigationRouteId) {
    const route = getNavigationRoute(id)
    return (
      <a key={id} href={route.path} aria-current={currentPath === route.path ? 'page' : undefined} onClick={onNavigate} className="block rounded-sm py-2 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        {route.label}
      </a>
    )
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" aria-label="Close menu backdrop" onClick={onClose} className="absolute inset-0 bg-surface-dark/70" />
      <div ref={dialogRef} id="mobile-site-navigation" role="dialog" aria-modal="true" aria-label="Site navigation" className="absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col overflow-y-auto bg-card p-5 shadow-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="font-semibold">Navigation</span>
          <button ref={closeButtonRef} type="button" aria-label="Close menu" onClick={onClose} className="flex min-h-11 min-w-11 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-3">
          <div>
            {routeLink('products')}
            <ul className="space-y-1 pl-4">
              {products.map((route) => <li key={route.id}>{routeLink(route.id)}</li>)}
            </ul>
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              {routeLink('engineering')}
              <button type="button" aria-label="Show Engineering details" aria-expanded={engineeringOpen} onClick={() => setEngineeringOpen((open) => !open)} className="flex min-h-11 min-w-11 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <span aria-hidden="true">{engineeringOpen ? '−' : '+'}</span>
              </button>
            </div>
            {engineeringOpen ? <ul className="pl-4">{capabilities.map((route) => <li key={route.id}>{routeLink(route.id)}</li>)}</ul> : null}
          </div>
          {remainingIds.map(routeLink)}
          {routeLink('request-quote')}
        </nav>
      </div>
    </div>
  )
}
