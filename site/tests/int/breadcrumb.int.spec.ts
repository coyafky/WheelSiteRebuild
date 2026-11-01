import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import PreviewPage from '@/app/(frontend)/[...slug]/page'
import { BreadcrumbTrail, SiteBreadcrumb } from '@/components/site-breadcrumb/site-breadcrumb'
import { getNavigationRoute } from '@/navigation/route-registry'

async function pageHtml(path: string) {
  const params = Promise.resolve({ slug: path.slice(1).split('/') })
  return renderToStaticMarkup(await PreviewPage({ params }))
}

describe('visible breadcrumbs', () => {
  it('shows Home as a parent link and Products as current text', async () => {
    const html = await pageHtml('/products')

    expect(html).toContain('<nav aria-label="Breadcrumb"')
    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>Home<\/a>/)
    expect(html).toMatch(/<span[^>]*aria-current="page"[^>]*>Products<\/span>/)
    expect(html).not.toMatch(/<a[^>]*href="\/products"[^>]*>Products<\/a>/)
    expect(html).not.toContain('application/ld+json')
  })

  it('shows Home and Products as parents of Wheels', async () => {
    const html = await pageHtml('/products/wheels')

    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>Home<\/a>/)
    expect(html).toMatch(/<a[^>]*href="\/products"[^>]*>Products<\/a>/)
    expect(html).toMatch(/<span[^>]*aria-current="page"[^>]*>Wheels<\/span>/)
    expect(html).not.toMatch(/<a[^>]*href="\/products\/wheels"[^>]*>Wheels<\/a>/)
  })

  it('gates a public breadcrumb when its route relationship is unpublished', () => {
    expect(
      renderToStaticMarkup(createElement(SiteBreadcrumb, { currentId: 'wheels', mode: 'public' })),
    ).toBe('')
  })

  it('derives allowed structured data from the same visible ordered records', () => {
    const items = [
      getNavigationRoute('home'),
      getNavigationRoute('products'),
      getNavigationRoute('wheels'),
    ].map((route) => ({ ...route, published: true }))
    const html = renderToStaticMarkup(
      createElement(BreadcrumbTrail, { items, siteOrigin: 'https://wheel.example' }),
    )
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1]

    expect(json).toBeTruthy()
    expect(JSON.parse(json ?? '')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wheel.example/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: 'https://wheel.example/products',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Wheels',
          item: 'https://wheel.example/products/wheels',
        },
      ],
    })
  })

  it('does not emit structured data for unpublished items even when given an origin', () => {
    const items = [getNavigationRoute('home'), getNavigationRoute('products')]
    const html = renderToStaticMarkup(
      createElement(BreadcrumbTrail, { items, siteOrigin: 'https://wheel.example' }),
    )

    expect(html).not.toContain('application/ld+json')
  })

  it('does not emit public URL data from an invalid origin', () => {
    const items = [getNavigationRoute('home'), getNavigationRoute('products')].map((route) => ({
      ...route,
      published: true,
    }))

    expect(
      renderToStaticMarkup(createElement(BreadcrumbTrail, { items, siteOrigin: 'invalid-origin' })),
    ).not.toContain('application/ld+json')
  })
})
