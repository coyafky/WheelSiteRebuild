import { createElement } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { SiteFooter } from '@/components/site-footer/site-footer'

afterEach(() => {
  cleanup()
})

describe('site footer inquiry close', () => {
  it('shows one sourcing inquiry close by default', () => {
    render(createElement(SiteFooter))

    const footer = screen.getByRole('contentinfo')
    const closes = screen.getAllByRole('heading', { name: 'Start a sourcing inquiry' })

    expect(closes).toHaveLength(1)
    expect(footer.contains(closes[0])).toBe(true)
  })

  it('links the quote action to /request-quote and contact to /contact', () => {
    render(createElement(SiteFooter))

    const quote = screen.getByRole('link', { name: 'Request a Quote' })
    const contact = screen.getByRole('link', { name: 'Contact' })

    expect(quote.tagName).toBe('A')
    expect(quote.getAttribute('href')).toBe('/request-quote')
    expect(contact.tagName).toBe('A')
    expect(contact.getAttribute('href')).toBe('/contact')
  })

  it('shows the heading and two actions and does not include a form', () => {
    render(createElement(SiteFooter))

    const footer = screen.getByRole('contentinfo')

    expect(screen.getByRole('heading', { name: 'Start a sourcing inquiry' }).tagName).toBe('H2')
    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual([
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
    expect(screen.queryByRole('link', { name: 'Contact' })).toBeNull()
  })

  it('uses the dark surface with light text', () => {
    render(createElement(SiteFooter))

    const footer = screen.getByRole('contentinfo')
    const classes = footer.className.split(/\s+/)
    const contactClasses = screen.getByRole('link', { name: 'Contact' }).className.split(/\s+/)

    expect(classes).toContain('bg-surface-dark')
    expect(classes).toContain('text-card')
    expect(contactClasses).toContain('text-card')
    expect(contactClasses).not.toContain('text-primary')
    expect(contactClasses).toContain('underline')
  })
})
