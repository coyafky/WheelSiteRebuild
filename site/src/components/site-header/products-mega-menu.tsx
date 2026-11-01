import { getNavigationRoute, listNavigationRoutes } from '@/navigation/route-registry'

export const productsMegaMenuId = 'products-mega-menu'

const productRouteIds = ['wheels', 'ev-housings', 'custom-aluminum', 'safety-tires'] as const

const linkFocus =
  'rounded-sm text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

export function ProductsMegaMenu({ open }: { open: boolean }) {
  const products = listNavigationRoutes(productRouteIds)
  const overview = getNavigationRoute('products')

  return (
    <nav
      id={productsMegaMenuId}
      aria-label="Product platforms"
      hidden={!open}
      className="absolute inset-x-0 top-full hidden border-t border-border bg-card shadow-lg lg:block"
    >
      <div className="mx-auto w-full max-w-[1500px] px-10 py-8">
        <h2 className="mb-5 text-lg font-semibold">Product platforms</h2>
        {open ? (
          <ul className="grid max-w-[720px] grid-cols-2 gap-x-10 gap-y-5">
            {products.map((route) => (
              <li key={route.id}>
                <a className={linkFocus} href={route.path}>
                  {route.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <a
          className="mt-7 inline-block rounded-sm text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          href={overview.path}
        >
          View All Products
        </a>
      </div>
    </nav>
  )
}
