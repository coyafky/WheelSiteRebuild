import { describe, expect, it } from 'vitest'
import {
  certifications,
  contactMethods,
  getNavigationRoute,
  listNavigationRoutes,
  publicationFlags,
  requireNavigationRoute,
} from '@/navigation/route-registry'

describe('navigation route registry', () => {
  it('records the canonical English paths from the sitemap', () => {
    expect([
      getNavigationRoute('home'),
      getNavigationRoute('products'),
      getNavigationRoute('wheels'),
      getNavigationRoute('ev-housings'),
      getNavigationRoute('custom-aluminum'),
      getNavigationRoute('safety-tires'),
      getNavigationRoute('engineering'),
      getNavigationRoute('wheel-engineering'),
      getNavigationRoute('safety-tire-capabilities'),
      getNavigationRoute('how-we-work'),
      getNavigationRoute('blog'),
      getNavigationRoute('about'),
      getNavigationRoute('manufacturing'),
      getNavigationRoute('contact'),
      getNavigationRoute('request-quote'),
      getNavigationRoute('privacy-policy'),
      getNavigationRoute('terms-of-use'),
    ]).toMatchObject([
      { id: 'home', label: 'Home', path: '/' },
      { id: 'products', label: 'Products', path: '/products' },
      { id: 'wheels', label: 'Wheels', path: '/products/wheels' },
      { id: 'ev-housings', label: 'EV Housings', path: '/products/ev-housings' },
      { id: 'custom-aluminum', label: 'Custom Aluminum', path: '/products/custom-aluminum' },
      { id: 'safety-tires', label: 'Safety Tires', path: '/products/safety-tires' },
      { id: 'engineering', label: 'Engineering', path: '/capabilities' },
      { id: 'wheel-engineering', label: 'Wheel Engineering', path: '/capabilities/wheels' },
      {
        id: 'safety-tire-capabilities',
        label: 'Safety Tire Capabilities',
        path: '/capabilities/safety-tires',
      },
      { id: 'how-we-work', label: 'How We Work', path: '/how-we-work' },
      { id: 'blog', label: 'Blog', path: '/blog' },
      { id: 'about', label: 'About', path: '/about' },
      { id: 'manufacturing', label: 'Manufacturing', path: '/about/manufacturing' },
      { id: 'contact', label: 'Contact', path: '/contact' },
      { id: 'request-quote', label: 'Request a Quote', path: '/request-quote' },
      { id: 'privacy-policy', label: 'Privacy Policy', path: '/privacy-policy' },
      { id: 'terms-of-use', label: 'Terms of Use', path: '/terms-of-use' },
    ])
  })

  it('keeps blog, privacy, and terms unpublished and ships no contact methods or certifications', () => {
    expect(publicationFlags).toEqual({
      blog: false,
      privacyPolicy: false,
      termsOfUse: false,
    })
    expect(getNavigationRoute('blog').published).toBe(false)
    expect(getNavigationRoute('privacy-policy').published).toBe(false)
    expect(getNavigationRoute('terms-of-use').published).toBe(false)
    expect(getNavigationRoute('home').published).toBe(true)
    expect(getNavigationRoute('products').published).toBe(true)
    expect(getNavigationRoute('wheels').published).toBe(true)
    expect(getNavigationRoute('ev-housings').published).toBe(true)
    expect(getNavigationRoute('custom-aluminum').published).toBe(true)
    expect(getNavigationRoute('safety-tires').published).toBe(true)
    expect(getNavigationRoute('engineering').published).toBe(true)
    expect(getNavigationRoute('wheel-engineering').published).toBe(true)
    expect(getNavigationRoute('safety-tire-capabilities').published).toBe(true)
    expect(getNavigationRoute('how-we-work').published).toBe(true)
    expect(getNavigationRoute('about').published).toBe(true)
    expect(getNavigationRoute('manufacturing').published).toBe(true)
    expect(getNavigationRoute('contact').published).toBe(true)
    expect(getNavigationRoute('request-quote').published).toBe(true)
    expect(contactMethods).toEqual([])
    expect(certifications).toEqual([])
  })

  it('omits unpublished optional destinations instead of linking a placeholder', () => {
    expect(
      listNavigationRoutes([
        'contact',
        'blog',
        'how-we-work',
        'privacy-policy',
        'about',
        'terms-of-use',
        'not-verified',
      ]).map((route) => route.path),
    ).toEqual(['/contact', '/how-we-work', '/about'])
  })

  it('fails when a core route id is missing or invalid', () => {
    expect(requireNavigationRoute('manufacturing')).toMatchObject({
      id: 'manufacturing',
      path: '/about/manufacturing',
      published: true,
    })
    expect(requireNavigationRoute('blog')).toMatchObject({
      id: 'blog',
      path: '/blog',
      published: false,
    })
    expect(() => requireNavigationRoute('not-a-route')).toThrow(/not-a-route/)
    expect(() => requireNavigationRoute('')).toThrow()
    expect(() => requireNavigationRoute('/products')).toThrow()
    expect(() => requireNavigationRoute('#')).toThrow()
  })
})
