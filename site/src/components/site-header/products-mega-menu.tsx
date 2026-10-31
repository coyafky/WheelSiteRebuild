import { getNavigationRoute, listNavigationRoutes } from '@/navigation/route-registry'

const productRouteIds = ['wheels', 'ev-housings', 'custom-aluminum', 'safety-tires'] as const

export function ProductsMegaMenu({ open }: { open: boolean }) {
  if (!open) return null

  const products = listNavigationRoutes(productRouteIds, { includeUnpublished: true })
  const overview = getNavigationRoute('products')

  return (
    <nav
      id="products-mega-menu"
      aria-label="Product platforms"
      className="absolute inset-x-0 top-full hidden border-t border-border bg-card shadow-lg lg:block"
    >
      <div className="mx-auto w-full max-w-[1500px] px-10 py-8">
        <h2 className="mb-5 text-lg font-semibold">Product platforms</h2>
        <ul className="grid max-w-[720px] grid-cols-2 gap-x-10 gap-y-5">
          {products.map((route) => (
            <li key={route.id}>
              <a className="rounded-sm text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href={route.path}>{route.label}</a>
            </li>
          ))}
        </ul>
        <a className="mt-7 inline-block rounded-sm text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href={overview.path}>View All Products</a>
      </div>
    </nav>
  )
}
