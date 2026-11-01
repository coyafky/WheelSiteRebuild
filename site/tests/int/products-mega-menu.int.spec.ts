import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { SiteHeader } from '@/components/site-header/header'

afterEach(() => {
  cleanup()
})

describe('products mega menu', () => {
  it('keeps Products as a link and offers a collapsed platform disclosure', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const banner = screen.getByRole('banner')
    const products = within(banner).getByRole('link', { name: 'Products' })
    const disclosure = within(banner).getByRole('button', { name: 'Show products' })
    const panelId = disclosure.getAttribute('aria-controls')
    const panel = panelId ? document.getElementById(panelId) : null

    expect(products.tagName).toBe('A')
    expect(products.getAttribute('href')).toBe('/products')
    expect(products.nextElementSibling).toBe(disclosure)
    expect(disclosure.getAttribute('aria-expanded')).toBe('false')
    expect(panel).toBeTruthy()
    expect(within(banner).getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Brand preview',
      'Products',
      'Engineering',
      'How We Work',
      'About',
      'Contact',
      'Request a Quote',
    ])
  })

  it('opens the registered product platforms without changing the URL', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const disclosure = screen.getByRole('button', { name: 'Show products' })
    const url = window.location.href

    fireEvent.click(disclosure)

    const panel = document.getElementById(disclosure.getAttribute('aria-controls') ?? '')
    const links = panel ? within(panel).getAllByRole('link') : []

    expect(window.location.href).toBe(url)
    expect(disclosure.getAttribute('aria-expanded')).toBe('true')
    expect(panel?.hasAttribute('hidden')).toBe(false)
    expect(screen.queryByRole('menu')).toBeNull()
    expect(links.map((link) => link.textContent)).toEqual([
      'Wheels',
      'EV Housings',
      'Custom Aluminum',
      'Safety Tires',
      'View All Products',
    ])
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/products/wheels',
      '/products/ev-housings',
      '/products/custom-aluminum',
      '/products/safety-tires',
      '/products',
    ])
    expect(links.every((link) => link.tagName === 'A')).toBe(true)
  })

  it('opens from Enter or Space on the disclosure', () => {
    const openWith = (key: string) => {
      const disclosure = screen.getByRole('button', { name: 'Show products' })
      const url = window.location.href

      disclosure.focus()
      fireEvent.keyDown(disclosure, { key })

      expect(window.location.href).toBe(url)
      expect(disclosure.getAttribute('aria-expanded')).toBe('true')
      expect(screen.getByRole('link', { name: 'Wheels' }).getAttribute('href')).toBe('/products/wheels')
    }

    render(createElement(SiteHeader, { currentPath: '/unlisted' }))
    openWith('Enter')
    cleanup()
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))
    openWith(' ')
  })

  it('keeps the platforms closed when the disclosure is hovered or given an arrow key', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const disclosure = screen.getByRole('button', { name: 'Show products' })

    fireEvent.mouseEnter(disclosure)
    fireEvent.keyDown(disclosure, { key: 'ArrowDown' })

    expect(disclosure.classList.contains('is-hovered')).toBe(true)
    expect(disclosure.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('link', { name: 'Wheels' })).toBeNull()
  })

  it('returns focus to the disclosure when Escape closes the platforms', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const disclosure = screen.getByRole('button', { name: 'Show products' })

    fireEvent.click(disclosure)
    disclosure.blur()
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(disclosure.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('link', { name: 'Wheels' })).toBeNull()
    expect(document.activeElement).toBe(disclosure)
  })

  it('closes the platforms on a pointer down outside the header', () => {
    render(createElement(SiteHeader, { currentPath: '/unlisted' }))

    const disclosure = screen.getByRole('button', { name: 'Show products' })
    const header = disclosure.closest('header')

    fireEvent.click(disclosure)
    fireEvent.pointerDown(screen.getByRole('link', { name: 'Wheels' }))

    expect(disclosure.getAttribute('aria-expanded')).toBe('true')

    fireEvent.pointerDown(document.body)

    expect(header?.contains(document.body)).toBe(false)
    expect(disclosure.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('link', { name: 'Wheels' })).toBeNull()
  })

  it('closes the platforms when the current path changes', () => {
    const { rerender } = render(createElement(SiteHeader, { currentPath: '/unlisted' }))
    const disclosure = screen.getByRole('button', { name: 'Show products' })

    fireEvent.click(disclosure)
    rerender(createElement(SiteHeader, { currentPath: '/unlisted' }))

    expect(disclosure.getAttribute('aria-expanded')).toBe('true')

    rerender(createElement(SiteHeader, { currentPath: '/contact' }))

    expect(disclosure.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('link', { name: 'Wheels' })).toBeNull()
  })
})
