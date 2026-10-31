import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { SiteFooter } from '@/components/site-footer/site-footer'

afterEach(() => {
  cleanup()
})

describe('site footer inquiry close', () => {
  it('emits the inquiry and navigation destinations as server-rendered anchors', () => {
    const html = renderToStaticMarkup(createElement(SiteFooter))
    const document = new DOMParser().parseFromString(html, 'text/html')
    const hrefs = [...document.querySelectorAll('footer a[href]')].map((anchor) => anchor.getAttribute('href'))

    expect(hrefs).toContain('/request-quote')
    expect(hrefs).toContain('/products/wheels')
    expect(hrefs).toContain('/capabilities/safety-tires')
    expect(hrefs).toContain('/contact')
    expect(hrefs.every((href) => href && href !== '#' && (href === '/' || !href.endsWith('/')))).toBe(true)
  })

  it('labels a draft brand block in preview and omits it from unapproved public output', () => {
    const { rerender } = render(createElement(SiteFooter, { renderMode: 'preview' }))
    const footer = screen.getByRole('contentinfo')
    const brand = screen.getByText('Brand preview · pending approval')
    const links = screen.getByRole('navigation', { name: 'Footer links' })
    expect(footer.contains(brand)).toBe(true)
    expect(brand.compareDocumentPosition(links) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    rerender(createElement(SiteFooter, { renderMode: 'preview', brand: {
      name: 'Unapproved Example', evidenceRef: '', approvedForPublic: false,
    } }))
    expect(screen.getByText('Brand preview · pending approval')).toBeTruthy()
    expect(screen.queryByText('Unapproved Example')).toBeNull()

    rerender(createElement(SiteFooter, { renderMode: 'public' }))
    expect(screen.queryByText('Brand preview · pending approval')).toBeNull()
  })

  it('shows the approved product, Engineering, and Company destinations as expanded groups', () => {
    render(createElement(SiteFooter))
    const footerLinks = screen.getByRole('navigation', { name: 'Footer links' })
    const groups = within(footerLinks).getAllByRole('list')

    expect(groups.map((group) => within(group).getAllByRole('link').map((link) => link.getAttribute('href')))).toEqual([
      ['/products', '/products/wheels', '/products/ev-housings', '/products/custom-aluminum', '/products/safety-tires'],
      ['/capabilities', '/capabilities/wheels', '/capabilities/safety-tires'],
      ['/how-we-work', '/about', '/about/manufacturing', '/contact'],
    ])
    expect(within(footerLinks).getAllByRole('heading').map((heading) => heading.textContent)).toEqual([
      'Products', 'Engineering', 'Company',
    ])
    expect(within(footerLinks).queryByRole('link', { name: 'Blog' })).toBeNull()
  })

  it('shows only verified public contact methods and leaves no empty Contact group', () => {
    const { rerender } = render(createElement(SiteFooter))
    expect(screen.queryByRole('heading', { name: 'Contact' })).toBeNull()

    rerender(createElement(SiteFooter, { contactMethods: [
      { kind: 'phone', displayValue: '+1 555 010 2345', value: '+15550102345', evidenceRef: 'approved-contact-record', approvedForPublic: true },
      { kind: 'email', displayValue: 'draft@example.com', value: 'draft@example.com', evidenceRef: '', approvedForPublic: false },
    ] }))

    const contact = screen.getByRole('heading', { name: 'Contact' }).closest('section') as HTMLElement
    expect(within(contact).getByRole('link', { name: '+1 555 010 2345' }).getAttribute('href')).toBe('tel:+15550102345')
    expect(within(contact).queryByText('draft@example.com')).toBeNull()
  })

  it('keeps certification placeholders in preview and publishes only approved, applicable evidence', () => {
    const { rerender } = render(createElement(SiteFooter, { renderMode: 'preview' }))
    expect(screen.getByText('Pending verification — preview only')).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Pending verification — preview only' })).toBeNull()

    const certifications = [
      { id: 'approved', displayName: 'Example Quality Record', issuer: 'Example Institute', holder: 'Example Company', scope: 'site', evidenceRef: 'record-1', approvedForPublic: true },
      { id: 'draft', displayName: 'Draft Credential', issuer: 'Example Institute', holder: 'Example Company', scope: 'site', evidenceRef: 'record-2', approvedForPublic: false },
      { id: 'other', displayName: 'Other Scope', issuer: 'Example Institute', holder: 'Example Company', scope: 'wheels', evidenceRef: 'record-3', approvedForPublic: true },
    ]
    rerender(createElement(SiteFooter, { renderMode: 'public', certifications }))
    expect(screen.getByText('Example Quality Record')).toBeTruthy()
    expect(screen.queryByText('Pending verification — preview only')).toBeNull()
    expect(screen.queryByText('Draft Credential')).toBeNull()
    expect(screen.queryByText('Other Scope')).toBeNull()
  })

  it('shows each reviewed legal entry independently and omits an empty bottom bar', () => {
    const { rerender } = render(createElement(SiteFooter))
    expect(screen.queryByRole('navigation', { name: 'Legal' })).toBeNull()

    rerender(createElement(SiteFooter, { legal: {
      privacyPolicy: { reviewed: true, published: true },
      termsOfUse: { reviewed: false, published: true },
      entity: { name: 'Example Components Ltd', evidenceRef: 'legal-record', approvedForPublic: true },
    } }))

    const legal = screen.getByRole('navigation', { name: 'Legal' })
    expect(within(legal).getByRole('link', { name: 'Privacy Policy' }).getAttribute('href')).toBe('/privacy-policy')
    expect(within(legal).queryByRole('link', { name: 'Terms of Use' })).toBeNull()
    expect(within(legal).getByText(/Example Components Ltd/)).toBeTruthy()
  })

  it('offers only published equivalent locale pages after the sitewide release gate', () => {
    const localeSwitch = {
      releaseApproved: true,
      coreRoutesPublished: true,
      currentLocale: 'en',
      currentPath: '/about',
      options: [
        { locale: 'en', nativeName: 'English', path: '/about', published: true },
        { locale: 'zh', nativeName: '中文', path: '/zh/about', published: true },
      ],
    }
    const { rerender } = render(createElement(SiteFooter))
    expect(screen.queryByRole('navigation', { name: 'Language' })).toBeNull()

    rerender(createElement(SiteFooter, { localeSwitch }))
    const language = screen.getByRole('navigation', { name: 'Language' })
    expect(within(language).getByRole('link', { name: 'English (current)' }).getAttribute('aria-current')).toBe('page')
    expect(within(language).getByRole('link', { name: '中文' }).getAttribute('href')).toBe('/zh/about')

    rerender(createElement(SiteFooter, { localeSwitch: { ...localeSwitch, currentPath: '/contact' } }))
    expect(screen.queryByRole('navigation', { name: 'Language' })).toBeNull()

    rerender(createElement(SiteFooter, { localeSwitch: { ...localeSwitch, coreRoutesPublished: false } }))
    expect(screen.queryByRole('navigation', { name: 'Language' })).toBeNull()
  })

  it('shows one sourcing inquiry close by default', () => {
    render(createElement(SiteFooter))

    const footer = screen.getByRole('contentinfo')
    const closes = screen.getAllByRole('heading', { name: 'Start a sourcing inquiry' })

    expect(closes).toHaveLength(1)
    expect(footer.contains(closes[0])).toBe(true)
  })

  it('links the quote action to /request-quote and contact to /contact', () => {
    render(createElement(SiteFooter))

    const close = screen.getByRole('region', { name: 'Start a sourcing inquiry' })
    const quote = within(close).getByRole('link', { name: 'Request a Quote' })
    const contact = within(close).getByRole('link', { name: 'Contact' })

    expect(quote.tagName).toBe('A')
    expect(quote.getAttribute('href')).toBe('/request-quote')
    expect(contact.tagName).toBe('A')
    expect(contact.getAttribute('href')).toBe('/contact')
  })

  it('shows the heading and two actions and does not include a form', () => {
    render(createElement(SiteFooter))

    const footer = screen.getByRole('contentinfo')

    expect(screen.getByRole('heading', { name: 'Start a sourcing inquiry' }).tagName).toBe('H2')
    const close = screen.getByRole('region', { name: 'Start a sourcing inquiry' })
    expect(within(close).getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Request a Quote',
      'Contact',
    ])
    expect(footer.querySelector('form, input, textarea, button')).toBeNull()
    expect(footer.querySelector('p')).toBeNull()
  })

  it('omits the inquiry close when the page already has an equivalent close', () => {
    render(createElement(SiteFooter, { hasEquivalentInquiryClose: true }))

    expect(screen.queryByRole('heading', { name: 'Start a sourcing inquiry' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Request a Quote' })).toBeNull()
    expect(screen.queryByRole('region', { name: 'Start a sourcing inquiry' })).toBeNull()
  })

  it('uses the dark surface with light text', () => {
    render(createElement(SiteFooter))

    const footer = screen.getByRole('contentinfo')
    const classes = footer.className.split(/\s+/)
    const contactClasses = within(screen.getByRole('region', { name: 'Start a sourcing inquiry' })).getByRole('link', { name: 'Contact' }).className.split(/\s+/)

    expect(classes).toContain('bg-surface-dark')
    expect(classes).toContain('text-card')
    expect(contactClasses).toContain('text-card')
    expect(contactClasses).not.toContain('text-primary')
    expect(contactClasses).toContain('underline')
  })
})
