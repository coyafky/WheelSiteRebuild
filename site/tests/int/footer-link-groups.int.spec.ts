import { createElement } from 'react'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { SiteFooter } from '@/components/site-footer/site-footer'

afterEach(() => {
  cleanup()
})

describe('footer link groups', () => {
  it('lists the products overview and four platforms in sitemap order', () => {
    render(createElement(SiteFooter))

    const products = screen.getByRole('navigation', { name: 'Products' })
    const links = within(products).getAllByRole('link')
    const footerHrefs = within(screen.getByRole('contentinfo'))
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))

    expect(links.map((link) => link.textContent)).toEqual([
      'Products',
      'Wheels',
      'EV Housings',
      'Custom Aluminum',
      'Safety Tires',
    ])
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/products',
      '/products/wheels',
      '/products/ev-housings',
      '/products/custom-aluminum',
      '/products/safety-tires',
    ])
    expect(links.every((link) => link.tagName === 'A')).toBe(true)
    expect(links.every((link) => !link.getAttribute('href')?.endsWith('/'))).toBe(true)
    expect(footerHrefs).not.toContain('/capabilities/ev-housings')
    expect(footerHrefs).not.toContain('/capabilities/custom-aluminum')
  })

  it('lists engineering overview and the two approved capability pages', () => {
    render(createElement(SiteFooter))

    const engineering = screen.getByRole('navigation', { name: 'Engineering' })
    const links = within(engineering).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual([
      'Engineering',
      'Wheel Engineering',
      'Safety Tire Capabilities',
    ])
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/capabilities',
      '/capabilities/wheels',
      '/capabilities/safety-tires',
    ])
    expect(links.every((link) => link.tagName === 'A')).toBe(true)
  })

  it('lists company pages and leaves Blog out until the section is open', () => {
    render(createElement(SiteFooter))

    const company = screen.getByRole('navigation', { name: 'Company' })
    const links = within(company).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual([
      'How We Work',
      'About',
      'Manufacturing',
      'Contact',
    ])
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/how-we-work',
      '/about',
      '/about/manufacturing',
      '/contact',
    ])
    expect(within(screen.getByRole('contentinfo')).queryByRole('link', { name: 'Blog' })).toBeNull()
  })

  it('appends Blog at the end of Company when the section is open', () => {
    render(createElement(SiteFooter, { blogEnabled: true }))

    const links = within(screen.getByRole('navigation', { name: 'Company' })).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual([
      'How We Work',
      'About',
      'Manufacturing',
      'Contact',
      'Blog',
    ])
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/how-we-work',
      '/about',
      '/about/manufacturing',
      '/contact',
      '/blog',
    ])
    expect(links.at(-1)?.tagName).toBe('A')
  })

  it('keeps every group expanded in one footer landmark', () => {
    render(createElement(SiteFooter))

    expect(screen.getAllByRole('contentinfo')).toHaveLength(1)

    for (const name of ['Products', 'Engineering', 'Company']) {
      const group = screen.getByRole('navigation', { name })

      expect(group.hasAttribute('hidden')).toBe(false)
      expect(group.hidden).toBe(false)
      expect(within(group).getByRole('heading', { name }).tagName).toMatch(/^H[1-6]$/)
      expect(within(group).getByRole('list').tagName).toBe('UL')
      expect(
        within(group)
          .getAllByRole('link')
          .every((link) => link.tagName === 'A' && link.getAttribute('href') !== '#'),
      ).toBe(true)
    }
  })

  it('reflows the groups from one column to two, then at most four, without an empty contact column', () => {
    render(createElement(SiteFooter))

    const grid = screen.getByRole('navigation', { name: 'Products' }).parentElement

    if (!grid) {
      throw new Error('link groups have no layout container')
    }

    expect(grid.className.split(/\s+/)).toEqual(
      expect.arrayContaining([
        'grid',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-[repeat(auto-fit,minmax(25%,1fr))]',
      ]),
    )
    expect(grid.className).not.toContain('grid-cols-4')
    expect(grid.className).not.toContain('overflow-x')
    expect(screen.getByRole('contentinfo').className).not.toContain('overflow-x')
    expect(grid.childElementCount).toBe(3)

    const longLabel = screen.getByRole('link', { name: 'Safety Tire Capabilities' })

    expect(longLabel.className).toContain('break-words')
    expect(longLabel.className).not.toContain('truncate')
    expect(longLabel.className).not.toContain('whitespace-nowrap')
  })

  it('omits contact methods, certifications, and the legal bar', async () => {
    const { FooterContact } = await import('@/components/site-footer/footer-contact')
    const { CertificationStrip } = await import('@/components/site-footer/certification-strip')
    const { FooterBottomBar } = await import('@/components/site-footer/footer-bottom-bar')

    for (const Component of [FooterContact, CertificationStrip, FooterBottomBar]) {
      const { container, unmount } = render(createElement(Component))

      expect(container.innerHTML).toBe('')
      unmount()
    }

    render(createElement(SiteFooter))

    const hrefs = within(screen.getByRole('contentinfo'))
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))

    expect(screen.queryByRole('link', { name: 'Privacy Policy' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Terms of Use' })).toBeNull()
    expect(hrefs.some((href) => href?.startsWith('tel:') || href?.startsWith('mailto:'))).toBe(false)
  })
})
