import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import PreviewPage, { generateMetadata } from '@/app/(frontend)/[...slug]/page'
import { BreadcrumbTrail, SiteBreadcrumb } from '@/components/site-breadcrumb/site-breadcrumb'
import { resolvePreviewRoute } from '@/navigation/preview-route-registry'
import { getBlogArticleTrail, type BlogArticle } from '@/navigation/blog-article-trail'
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

  it.each([
    ['/products/ev-housings', ['Home', 'Products', 'EV Housings']],
    ['/products/custom-aluminum', ['Home', 'Products', 'Custom Aluminum']],
    ['/products/safety-tires', ['Home', 'Products', 'Safety Tires']],
    ['/products/wheels/flow-formed', ['Home', 'Products', 'Wheels', 'Flow-Formed Wheels']],
    ['/products/wheels/forged', ['Home', 'Products', 'Wheels', 'Forged Wheels']],
    ['/products/wheels/custom', ['Home', 'Products', 'Wheels', 'Custom Wheels']],
  ])('shows the fixed product ancestry for %s without publishing it', async (path, labels) => {
    const container = document.createElement('div')
    container.innerHTML = await pageHtml(path)
    const nav = container.querySelector('nav[aria-label="Breadcrumb"]')
    const items = [...(nav?.querySelectorAll('li') ?? [])]

    expect(items.map((item) => item.textContent?.replace('/', '').trim())).toEqual(labels)
    expect(items.slice(0, -1).map((item) => item.querySelector('a')?.getAttribute('href'))).toEqual(
      labels
        .slice(0, -1)
        .map((_, index) => (index === 0 ? '/' : index === 1 ? '/products' : '/products/wheels')),
    )
    expect(items.at(-1)?.querySelector('[aria-current="page"]')?.textContent).toBe(labels.at(-1))
    expect(items.at(-1)?.querySelector('a')).toBeNull()
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull()
    const routeId = resolvePreviewRoute(path.slice(1).split('/'))?.id
    if (!routeId) throw new Error(`Missing preview route: ${path}`)
    expect(
      renderToStaticMarkup(createElement(SiteBreadcrumb, { currentId: routeId, mode: 'public' })),
    ).toBe('')
  })

  it.each([
    ['/capabilities', ['Home', 'Engineering'], ['/']],
    ['/capabilities/wheels', ['Home', 'Engineering', 'Wheel Engineering'], ['/', '/capabilities']],
    [
      '/capabilities/safety-tires',
      ['Home', 'Engineering', 'Safety Tire Capabilities'],
      ['/', '/capabilities'],
    ],
  ])('shows the Engineering ancestry for %s', async (path, labels, parentPaths) => {
    const container = document.createElement('div')
    container.innerHTML = await pageHtml(path)
    const items = [...container.querySelectorAll('nav[aria-label="Breadcrumb"] li')]

    expect(items.map((item) => item.textContent?.replace('/', '').trim())).toEqual(labels)
    expect(items.slice(0, -1).map((item) => item.querySelector('a')?.getAttribute('href'))).toEqual(
      parentPaths,
    )
    expect(items.at(-1)?.querySelector('[aria-current="page"]')?.textContent).toBe(labels.at(-1))
    expect(items.at(-1)?.querySelector('a')).toBeNull()
    const route = resolvePreviewRoute(path.slice(1).split('/'))
    if (!route) throw new Error(`Missing route: ${path}`)
    expect(
      renderToStaticMarkup(createElement(SiteBreadcrumb, { currentId: route.id, mode: 'public' })),
    ).toBe('')
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull()
  })

  it.each([
    ['/about', ['Home', 'About'], ['/']],
    ['/about/manufacturing', ['Home', 'About', 'Manufacturing'], ['/', '/about']],
    ['/how-we-work', ['Home', 'How We Work'], ['/']],
    ['/contact', ['Home', 'Contact'], ['/']],
    ['/request-quote', ['Home', 'Request a Quote'], ['/']],
    ['/privacy-policy', ['Home', 'Privacy Policy'], ['/']],
  ])('shows the company or top-level ancestry for %s', async (path, labels, parentPaths) => {
    const container = document.createElement('div')
    container.innerHTML = await pageHtml(path)
    const items = [...container.querySelectorAll('nav[aria-label="Breadcrumb"] li')]

    expect(items.map((item) => item.textContent?.replace('/', '').trim())).toEqual(labels)
    expect(items.slice(0, -1).map((item) => item.querySelector('a')?.getAttribute('href'))).toEqual(
      parentPaths,
    )
    expect(items.at(-1)?.querySelector('[aria-current="page"]')?.textContent).toBe(labels.at(-1))
    expect(items.at(-1)?.querySelector('a')).toBeNull()
    const route = resolvePreviewRoute(path.slice(1).split('/'))
    if (!route) throw new Error(`Missing route: ${path}`)
    expect(
      renderToStaticMarkup(createElement(SiteBreadcrumb, { currentId: route.id, mode: 'public' })),
    ).toBe('')
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull()
  })

  it('keeps Terms of Use as a preview-only top-level legal trail', () => {
    const html = renderToStaticMarkup(createElement(SiteBreadcrumb, { currentId: 'terms-of-use' }))
    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>Home<\/a>/)
    expect(html).toMatch(/<span[^>]*aria-current="page"[^>]*>Terms of Use<\/span>/)
    expect(
      renderToStaticMarkup(
        createElement(SiteBreadcrumb, { currentId: 'terms-of-use', mode: 'public' }),
      ),
    ).toBe('')
    expect(html).not.toContain('application/ld+json')
  })

  it.each([
    ['blog', ['Home', 'Blog'], ['/']],
    ['blog-technical', ['Home', 'Blog', 'Technical Articles'], ['/', '/blog']],
    ['blog-company-news', ['Home', 'Blog', 'Company News'], ['/', '/blog']],
  ] as const)('shows the fixed Blog preview ancestry for %s', (currentId, labels, parentPaths) => {
    const html = renderToStaticMarkup(createElement(SiteBreadcrumb, { currentId }))
    const container = document.createElement('div')
    container.innerHTML = html
    const items = [...container.querySelectorAll('nav[aria-label="Breadcrumb"] li')]

    expect(items.map((item) => item.textContent?.replace('/', '').trim())).toEqual(labels)
    expect(items.slice(0, -1).map((item) => item.querySelector('a')?.getAttribute('href'))).toEqual(
      parentPaths,
    )
    expect(items.at(-1)?.querySelector('[aria-current="page"]')?.textContent).toBe(labels.at(-1))
    expect(items.at(-1)?.querySelector('a')).toBeNull()
    expect(html).not.toContain('application/ld+json')
    expect(renderToStaticMarkup(createElement(SiteBreadcrumb, { currentId, mode: 'public' }))).toBe(
      '',
    )
  })

  it.each([
    [
      '/blog/mock-wheel-engineering',
      ['Home', 'Blog', 'Technical Articles', 'Mock Wheel Engineering Article'],
    ],
    ['/blog/mock-company-update', ['Home', 'Blog', 'Company News', 'Mock Company Update']],
  ])('renders only a known test article as a development preview at %s', async (path, labels) => {
    vi.stubEnv('NODE_ENV', 'development')
    try {
      const params = Promise.resolve({ slug: path.slice(1).split('/') })
      const html = renderToStaticMarkup(await PreviewPage({ params }))
      const metadata = await generateMetadata({ params })
      const container = document.createElement('div')
      container.innerHTML = html
      const items = [...container.querySelectorAll('nav[aria-label="Breadcrumb"] li')]

      expect(items.map((item) => item.textContent?.replace('/', '').trim())).toEqual(labels)
      expect(items.at(-1)?.querySelector('[aria-current="page"]')?.textContent).toBe(labels.at(-1))
      expect(items.at(-1)?.querySelector('a')).toBeNull()
      expect(container.querySelector('h1')?.textContent).toBe(labels.at(-1))
      expect(html).toContain('Test content for internal preview only')
      expect(metadata.robots).toEqual({ index: false, follow: false })
      expect(metadata.alternates?.canonical).toBeUndefined()
      expect(html).not.toContain('application/ld+json')
    } finally {
      vi.unstubAllEnvs()
    }
  })

  it('changes a mock article ancestry with its category while keeping the article path stable', () => {
    const article: BlogArticle = {
      slug: 'mock-wheel-engineering',
      title: 'Mock Wheel Engineering Article',
      categoryId: 'blog-technical',
      publicationState: 'test',
      reviewed: false,
    }
    const technical = getBlogArticleTrail(article, 'preview')
    const company = getBlogArticleTrail({ ...article, categoryId: 'blog-company-news' }, 'preview')

    expect(technical?.map((item) => item.label)).toEqual([
      'Home',
      'Blog',
      'Technical Articles',
      article.title,
    ])
    expect(company?.map((item) => item.label)).toEqual([
      'Home',
      'Blog',
      'Company News',
      article.title,
    ])
    expect(technical?.at(-1)?.path).toBe('/blog/mock-wheel-engineering')
    expect(company?.at(-1)?.path).toBe('/blog/mock-wheel-engineering')
    if (!technical || !company) throw new Error('Missing article preview trail')
    const structuredPaths = (items: typeof technical) => {
      const html = renderToStaticMarkup(
        createElement(BreadcrumbTrail, {
          items: items.map((item) => ({ ...item, published: true })),
          siteOrigin: 'https://wheel.example',
        }),
      )
      const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1]
      return JSON.parse(json ?? '').itemListElement.map((item: { name: string; item: string }) => [
        item.name,
        item.item,
      ])
    }
    expect(structuredPaths(technical)).toEqual([
      ['Home', 'https://wheel.example/'],
      ['Blog', 'https://wheel.example/blog'],
      ['Technical Articles', 'https://wheel.example/blog/technical'],
      [article.title, 'https://wheel.example/blog/mock-wheel-engineering'],
    ])
    expect(structuredPaths(company)).toEqual([
      ['Home', 'https://wheel.example/'],
      ['Blog', 'https://wheel.example/blog'],
      ['Company News', 'https://wheel.example/blog/company-news'],
      [article.title, 'https://wheel.example/blog/mock-wheel-engineering'],
    ])
    expect(getBlogArticleTrail(article, 'public')).toBeNull()
    expect(
      getBlogArticleTrail({ ...article, publicationState: 'published', reviewed: true }, 'public'),
    ).toBeNull()
    expect(getBlogArticleTrail({ ...article, categoryId: undefined }, 'preview')).toBeNull()
  })
})
