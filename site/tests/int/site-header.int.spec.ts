import { cleanup, render, screen, within } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { SiteHeader } from '@/components/site-header/header'

afterEach(() => {
  cleanup()
})

describe('sticky primary header', () => {
  it('links brand home, the primary destinations, and Request a Quote in order', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const links = within(screen.getByRole('banner')).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual([
      'Brand preview',
      'Products',
      'Engineering',
      'How We Work',
      'About',
      'Contact',
      'Request a Quote',
    ])
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/products',
      '/capabilities',
      '/how-we-work',
      '/about',
      '/contact',
      '/request-quote',
    ])
    expect(links.every((link) => link.tagName === 'A')).toBe(true)
  })

  it('marks only the exact current page with aria-current', () => {
    render(createElement(SiteHeader, { currentPath: '/contact' }))

    const current = within(screen.getByRole('banner'))
      .getAllByRole('link')
      .filter((link) => link.getAttribute('aria-current') === 'page')

    expect(current.map((link) => link.getAttribute('href'))).toEqual(['/contact'])
  })

  it('marks a parent section without treating the descendant as the current page', () => {
    render(createElement(SiteHeader, { currentPath: '/products/wheels' }))

    const links = within(screen.getByRole('banner')).getAllByRole('link')
    const products = links.find((link) => link.getAttribute('href') === '/products')

    expect(links.every((link) => link.getAttribute('aria-current') !== 'page')).toBe(true)
    expect(products?.textContent).toContain('current section')
    expect(products?.className).toContain('border-brand-accent')
  })

  it('inserts Blog between How We Work and About only while the gate is open', () => {
    const { rerender } = render(createElement(SiteHeader, { currentPath: '/unlisted' }))
    const hrefs = () =>
      within(screen.getByRole('banner'))
        .getAllByRole('link')
        .map((link) => link.getAttribute('href'))

    expect(hrefs()).not.toContain('/blog')

    rerender(createElement(SiteHeader, { currentPath: '/unlisted', blogEnabled: true }))
    expect(hrefs()).toEqual([
      '/',
      '/products',
      '/capabilities',
      '/how-we-work',
      '/blog',
      '/about',
      '/contact',
      '/request-quote',
    ])

    rerender(createElement(SiteHeader, { currentPath: '/unlisted', blogEnabled: false }))
    expect(hrefs()).toEqual([
      '/',
      '/products',
      '/capabilities',
      '/how-we-work',
      '/about',
      '/contact',
      '/request-quote',
    ])
  })

  it('omits utility, contact channels, search, fitment, and placeholder links', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted', blogEnabled: true }))

    const header = screen.getByRole('banner')
    const text = header.textContent ?? ''
    const hrefs = within(header)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))

    expect(text).not.toMatch(/utility|phone|email|language|search|fitment|rayone/i)
    expect(header.querySelector('img')).toBeNull()
    expect(hrefs.every((href) => href && href !== '#' && !href.startsWith('tel:') && !href.startsWith('mailto:'))).toBe(
      true,
    )
  })

  it('paints a white sticky bar with the shared foreground token', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const header = screen.getByRole('banner')

    expect(header.className).toContain('sticky')
    expect(header.className).toContain('top-0')
    expect(header.className).toContain('bg-card')
    expect(header.className).toContain('text-foreground')
    expect(header.innerHTML).toContain('min-h-[4.5rem]')
    expect(
      within(header)
        .getAllByRole('link')
        .every((link) => link.className.includes('outline-ring')),
    ).toBe(true)
    expect(within(header).getByRole('link', { name: 'Request a Quote' }).getAttribute('data-variant')).toBe('default')
  })

  it('imports scroll padding so in-page anchors clear the bar', async () => {
    const raw = await import('@/components/site-header/header.css?raw')
    const inline = await import('@/components/site-header/header.css?inline')

    expect({ raw, inline, head: document.head.innerHTML }).toEqual({ probe: true })
  })
})
