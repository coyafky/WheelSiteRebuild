import { getBreadcrumbTrail } from '@/navigation/breadcrumb-trail'
import type { NavigationRouteId } from '@/navigation/route-registry'

type BreadcrumbItem = { id: string; label: string; path: string; published: boolean }

export function SiteBreadcrumb({
  currentId,
  mode = 'preview',
  siteOrigin,
}: {
  currentId: NavigationRouteId
  mode?: 'preview' | 'public'
  siteOrigin?: string
}) {
  const trail = getBreadcrumbTrail(currentId, mode)
  if (!trail) return null

  return <BreadcrumbTrail items={trail} siteOrigin={mode === 'public' ? siteOrigin : undefined} />
}

export function BreadcrumbTrail({
  items,
  siteOrigin,
}: {
  items: readonly BreadcrumbItem[]
  siteOrigin?: string
}) {
  const siteUrl = siteOrigin && URL.canParse(siteOrigin) ? new URL(siteOrigin) : null
  const structuredData =
    siteUrl?.protocol === 'https:' && items.every((route) => route.published)
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((route, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: route.label,
            item: new URL(route.path, siteUrl.origin).href,
          })),
        }
      : null

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {items.map((route, index) => (
            <li key={route.id} className="inline-flex min-w-0 flex-wrap items-center gap-x-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page" className="break-words font-semibold text-foreground">
                  {route.label}
                </span>
              ) : (
                <a
                  href={route.path}
                  className="break-words rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {route.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </>
  )
}
