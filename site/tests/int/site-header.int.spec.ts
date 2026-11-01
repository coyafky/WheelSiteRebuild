import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { SiteHeader } from '@/components/site-header/header'

afterEach(() => {
  cleanup()
})

describe('sticky primary header', () => {
  it('opens the Products links from a separate disclosure without changing the destination', () => {
    render(createElement(SiteHeader, { currentPath: '/' }))

    const trigger = screen.getByRole('button', { name: 'Show products' })
    const products = screen.getByRole('link', { name: 'Products' })
    expect(products.getAttribute('href')).toBe('/products')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(trigger)

    const panel = screen.getByRole('navigation', { name: 'Product platforms' })
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(within(panel).getAllByRole('link').map((link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Wheels', '/products/wheels'],
      ['EV Housings', '/products/ev-housings'],
      ['Custom Aluminum', '/products/custom-aluminum'],
      ['Safety Tires', '/products/safety-tires'],
      ['View All Products', '/products'],
    ])
  })

  it('closes Products on Escape, a second click, or an outside pointer', () => {
    render(createElement(SiteHeader, { currentPath: '/' }))
    const trigger = screen.getByRole('button', { name: 'Show products' })

    fireEvent.mouseOver(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(trigger)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger)

    fireEvent.click(trigger)
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(trigger)
    fireEvent.pointerDown(document.body)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('closes Products when the route or layout changes', () => {
    const { rerender } = render(createElement(SiteHeader, { currentPath: '/' }))
    fireEvent.click(screen.getByRole('button', { name: 'Show products' }))
    rerender(createElement(SiteHeader, { currentPath: '/about' }))
    expect(screen.getByRole('button', { name: 'Show products' }).getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(screen.getByRole('button', { name: 'Show products' }))
    const originalWidth = window.innerWidth
    try {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 800 })
      fireEvent(window, new Event('resize'))
      expect(screen.getByRole('button', { name: 'Show products' }).getAttribute('aria-expanded')).toBe('false')
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth })
    }
  })

  it('opens a compact navigation drawer with product links visible and Engineering details closed', () => {
    render(createElement(SiteHeader, { currentPath: '/' }))
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(trigger)

    const drawer = screen.getByRole('dialog', { name: 'Site navigation' })
    const links = within(drawer).getAllByRole('link')
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/products', '/products/wheels', '/products/ev-housings', '/products/custom-aluminum',
      '/products/safety-tires', '/capabilities', '/how-we-work', '/about', '/contact', '/request-quote',
    ])
    expect(within(drawer).getByRole('button', { name: 'Show Engineering details' }).getAttribute('aria-expanded')).toBe('false')
    expect(within(drawer).queryByRole('link', { name: 'Wheel Engineering' })).toBeNull()
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('keeps drawer focus inside, locks background scrolling, and restores the trigger on Escape', () => {
    render(createElement('div', null,
      createElement(SiteHeader, { currentPath: '/' }),
      createElement('main', null, 'Page content'),
    ))
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(trigger)

    const drawer = screen.getByRole('dialog', { name: 'Site navigation' })
    const close = within(drawer).getByRole('button', { name: 'Close menu' })
    expect(document.activeElement).toBe(close)
    expect(document.body.style.overflow).toBe('hidden')
    expect((screen.getByRole('main') as HTMLElement).inert).toBe(true)

    within(drawer).getByRole('link', { name: 'Request a Quote' }).focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(close)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: 'Site navigation' })).toBeNull()
    expect(document.activeElement).toBe(trigger)
    expect(document.body.style.overflow).toBe('')
    expect((screen.getByRole('main') as HTMLElement).inert).not.toBe(true)
  })

  it('resets Engineering details after close and clears the drawer at desktop width', () => {
    render(createElement(SiteHeader, { currentPath: '/' }))
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(trigger)
    const details = screen.getByRole('button', { name: 'Show Engineering details' })
    fireEvent.click(details)
    expect(details.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('link', { name: 'Wheel Engineering' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    fireEvent.click(trigger)
    expect(screen.getByRole('button', { name: 'Show Engineering details' }).getAttribute('aria-expanded')).toBe('false')

    const originalWidth = window.innerWidth
    try {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 })
      fireEvent(window, new Event('resize'))
      expect(screen.queryByRole('dialog', { name: 'Site navigation' })).toBeNull()
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth })
    }
  })

  it('links brand home, the primary destinations, and Request a Quote in order', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const links = within(screen.getByRole('banner')).getAllByRole('link')

    expect(links.map((link) => link.getAttribute('aria-label') ?? link.textContent)).toEqual([
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

  it('renders the quote action text exactly once across breakpoints', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const header = screen.getByRole('banner')
    const quote = within(header).getByRole('link', { name: 'Request a Quote' })

    // 两个响应式 span（hidden lg:inline / lg:hidden）会让 textContent 拼成
    // "Request a QuoteQuote"。aria-label 掩盖了它，所以要直接断可见文本。
    expect(quote.textContent).toBe('Request a Quote')
  })

  it('imports scroll padding so in-page anchors clear the bar', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const fromTags = [...document.querySelectorAll('style')]
      .map((style) => style.textContent ?? '')
      .join('\n')
    const fromSheets = [...document.styleSheets].flatMap((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText)
      } catch {
        return []
      }
    })

    expect(`${fromTags}\n${fromSheets.join('\n')}`).toContain('scroll-padding-top: 4.5rem')
  })
})
