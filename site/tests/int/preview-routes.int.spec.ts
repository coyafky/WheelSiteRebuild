import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import PreviewPage, { generateMetadata } from '@/app/(frontend)/[...slug]/page'
import { resolvePreviewRoute } from '@/navigation/preview-route-registry'
import { getNavigationRoute } from '@/navigation/route-registry'

describe('fixed route placeholders', () => {
  it('renders the Products destination as an explicitly unpublished page', async () => {
    const params = Promise.resolve({ slug: ['products'] })
    const metadata = await generateMetadata({ params })
    const html = renderToStaticMarkup(await PreviewPage({ params }))

    expect(metadata.robots).toEqual({ index: false, follow: false })
    expect(html).toContain('<main')
    expect(html).toContain('<h1')
    expect(html).toContain('Products')
    expect(html).toContain('Content pending review')
  })

  it('recognizes every fixed Launch destination without inventing a path', () => {
    const expected = [
      ['/products', 'Products'],
      ['/products/wheels', 'Wheels'],
      ['/products/wheels/flow-formed', 'Flow-Formed Wheels'],
      ['/products/wheels/forged', 'Forged Wheels'],
      ['/products/wheels/custom', 'Custom Wheels'],
      ['/products/ev-housings', 'EV Housings'],
      ['/products/custom-aluminum', 'Custom Aluminum'],
      ['/products/safety-tires', 'Safety Tires'],
      ['/capabilities', 'Engineering'],
      ['/capabilities/wheels', 'Wheel Engineering'],
      ['/capabilities/safety-tires', 'Safety Tire Capabilities'],
      ['/how-we-work', 'How We Work'],
      ['/about', 'About'],
      ['/about/manufacturing', 'Manufacturing'],
      ['/contact', 'Contact'],
      ['/request-quote', 'Request a Quote'],
      ['/privacy-policy', 'Privacy Policy'],
    ]

    expect(
      expected.map(([path]) => {
        const route = resolvePreviewRoute(path.slice(1).split('/'))
        return [route?.path, route?.label]
      }),
    ).toEqual(expected)
  })

  it('opens only fixed Planned paths in development preview', () => {
    const planned = [
      ['/blog', 'Blog'],
      ['/blog/technical', 'Technical Articles'],
      ['/blog/company-news', 'Company News'],
      ['/terms-of-use', 'Terms of Use'],
    ]

    expect(
      planned.map(([path]) => {
        const segments = path.slice(1).split('/')
        const preview = resolvePreviewRoute(segments, { allowPlanned: true })
        const publicRoute = resolvePreviewRoute(segments, { allowPlanned: false })
        return [preview?.path, preview?.label, publicRoute]
      }),
    ).toEqual(planned.map(([path, label]) => [path, label, undefined]))
    expect(
      resolvePreviewRoute(['blog', 'invented-article'], { allowPlanned: true }),
    ).toBeUndefined()
    expect(
      resolvePreviewRoute(['products', 'invented-model'], { allowPlanned: true }),
    ).toBeUndefined()
  })

  it('does not call an accessible preview page published content', () => {
    const paths = [
      '/',
      '/products',
      '/products/wheels',
      '/products/wheels/flow-formed',
      '/products/wheels/forged',
      '/products/wheels/custom',
      '/products/ev-housings',
      '/products/custom-aluminum',
      '/products/safety-tires',
      '/capabilities',
      '/capabilities/wheels',
      '/capabilities/safety-tires',
      '/how-we-work',
      '/about',
      '/about/manufacturing',
      '/contact',
      '/request-quote',
      '/privacy-policy',
    ]
    const routes = [
      getNavigationRoute('home'),
      ...paths.slice(1).map((path) => resolvePreviewRoute(path.slice(1).split('/'))),
    ]

    expect(routes.map((route) => route?.path)).toEqual(paths)
    expect(routes.every((route) => route?.published === false)).toBe(true)
  })
})
