import { getNavigationRoute, listNavigationRoutes } from '@/navigation/route-registry'

export const productsMegaMenuId = 'products-mega-menu'

const platformIds = ['wheels', 'ev-housings', 'custom-aluminum', 'safety-tires'] as const

const linkFocus =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

type ProductsMegaMenuProps = {
  open?: boolean
}

export function ProductsMegaMenu({ open = false }: ProductsMegaMenuProps) {
  const platforms = listNavigationRoutes(platformIds)
  const products = getNavigationRoute('products')

  return (
    <div
      id={productsMegaMenuId}
      hidden={!open}
      className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10"
    >
      {open ? (
        <nav aria-label="Product platforms">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 py-4">
            {platforms.map((route) => (
              <li key={route.id}>
                <a href={route.path} className={linkFocus}>
                  {route.label}
                </a>
              </li>
            ))}
            <li>
              <a href={products.path} className={linkFocus}>
                View All Products
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  )
}
