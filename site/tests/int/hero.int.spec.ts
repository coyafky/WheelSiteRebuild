import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Hero } from '@/components/hero/hero'
import { HomeView } from '@/components/home/home-view'
import type { HomePlatform } from '@/content/home-model'

afterEach(() => {
  cleanup()
})

const pageCopy = {
  title: 'Four platforms. Two ways to work.',
  description:
    'Explore Wheels, EV Housings, Custom Aluminum and Safety Tires, or start from a custom development brief.',
}

describe('hero content contract', () => {
  it('renders exactly one H1 carrying the page title and the page explanation', () => {
    render(createElement(Hero, pageCopy))

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0].textContent).toBe(pageCopy.title)
    expect(screen.getByText(pageCopy.description)).toBeTruthy()
  })

  it('gives the home hero the display size token and every other page the H1 token', () => {
    render(createElement(Hero, { ...pageCopy, pageType: 'home' }))
    expect(screen.getByRole('heading', { level: 1 }).getAttribute('data-size-token')).toBe(
      'type.display',
    )
    cleanup()

    render(createElement(Hero, { ...pageCopy, pageType: 'page' }))
    expect(screen.getByRole('heading', { level: 1 }).getAttribute('data-size-token')).toBe('type.h1')
  })

  it('fails the build instead of rendering a blank heading or explanation', () => {
    expect(() => renderToStaticMarkup(createElement(Hero, { ...pageCopy, title: '' }))).toThrow()
    expect(() =>
      renderToStaticMarkup(createElement(Hero, { ...pageCopy, description: '   ' })),
    ).toThrow()
  })
})

describe('hero actions', () => {
  it('renders at most one primary action and one optional secondary link', () => {
    const { container } = render(
      createElement(Hero, {
        ...pageCopy,
        primaryAction: { label: 'Start a sourcing inquiry', routeId: 'request-quote' },
      }),
    )

    const links = [...container.querySelectorAll('a[href]')]
    expect(links.map((link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Start a sourcing inquiry', '/request-quote'],
    ])
    expect(container.querySelectorAll('[data-variant="default"]')).toHaveLength(1)
  })

  it('resolves inquiry destinations through the shared route registry', () => {
    const { container } = render(
      createElement(Hero, {
        ...pageCopy,
        primaryAction: { label: 'Start a sourcing inquiry', routeId: 'request-quote' },
        secondaryAction: { label: 'See how we work', routeId: 'how-we-work' },
      }),
    )

    const links = [...container.querySelectorAll('a[href]')]
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/request-quote',
      '/how-we-work',
    ])
    expect(links.every((link) => !link.getAttribute('href')?.includes('#'))).toBe(true)
    expect(links[0].className).toContain('min-h-11')
  })

  it('refuses an action whose route is not published', () => {
    expect(() =>
      renderToStaticMarkup(
        createElement(Hero, {
          ...pageCopy,
          primaryAction: { label: 'Read the blog', routeId: 'blog' },
        }),
      ),
    ).toThrow()
  })
})

describe('hero media slot', () => {
  const approvedMedia = {
    url: '/media/wheel-stage.jpg',
    alt: 'A wheel on a neutral studio stage',
    width: 1600,
    height: 900,
  }

  it('renders approved media with alt text and reserved dimensions', () => {
    const { container } = render(createElement(Hero, { ...pageCopy, media: approvedMedia }))

    const image = container.querySelector('img')
    expect(image?.getAttribute('src')).toBe(approvedMedia.url)
    expect(image?.getAttribute('alt')).toBe(approvedMedia.alt)
    expect(image?.getAttribute('width')).toBe('1600')
    expect(image?.getAttribute('height')).toBe('900')
  })

  it('labels an unapproved media slot as pending instead of passing it off as product proof', () => {
    const { container, getByText } = render(
      createElement(Hero, {
        ...pageCopy,
        media: { pending: true, label: 'Approved product imagery pending' },
      }),
    )

    expect(container.querySelector('img')).toBeNull()
    expect(getByText('Approved product imagery pending')).toBeTruthy()
    expect(container.querySelector('[role="img"]')?.getAttribute('aria-label')).toContain('pending')
  })

  it('keeps the heading, explanation and action usable when media is absent', () => {
    render(
      createElement(Hero, {
        ...pageCopy,
        primaryAction: { label: 'Start a sourcing inquiry', routeId: 'request-quote' },
      }),
    )

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(pageCopy.title)
    expect(screen.getByText(pageCopy.description)).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Start a sourcing inquiry' }).getAttribute('href')).toBe(
      '/request-quote',
    )
  })

  it('treats a decorative image as having empty alt text', () => {
    const { container } = render(
      createElement(Hero, { ...pageCopy, media: { ...approvedMedia, decorative: true } }),
    )

    expect(container.querySelector('img')?.getAttribute('alt')).toBe('')
  })
})

describe('home hero adoption', () => {
  const homeModel: { platforms: HomePlatform[]; wheelPaths: [] } = {
    platforms: [
      { id: 'wheels', title: 'Wheels', status: 'pending' },
      { id: 'ev-housings', title: 'EV Housings', status: 'pending' },
      { id: 'custom-aluminum', title: 'Custom Aluminum', status: 'pending' },
      { id: 'safety-tires', title: 'Safety Tires', status: 'pending' },
    ],
    wheelPaths: [],
  }

  it('renders the page through the shared hero with one display H1 and product discovery actions', () => {
    render(createElement(HomeView, homeModel))

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0].getAttribute('data-size-token')).toBe('type.display')
    expect(headings[0].textContent).toBe('Four platforms. Two ways to work.')

    expect(screen.getByRole('link', { name: 'Explore platforms' }).getAttribute('href')).toBe(
      '#platforms',
    )
    expect(screen.getByRole('link', { name: 'Work paths' }).getAttribute('href')).toBe('#work-paths')
  })

  it('does not repeat the closing inquiry action inside the hero', () => {
    const { container } = render(createElement(HomeView, homeModel))

    expect(container.querySelector('a[href="/request-quote"]')).toBeNull()
  })

  it('keeps the four platform quick view and links no unpublished destination', () => {
    const { container } = render(createElement(HomeView, homeModel))

    expect(container.innerHTML).toContain('Wheels')
    for (const href of [...container.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))) {
      expect(href === '/' || href === '/request-quote' || href?.startsWith('#')).toBe(true)
    }
  })
})

describe('hero media slot has no escape hatch', () => {
  it('refuses arbitrary nodes in the media slot', () => {
    /* Type-level rejection is the first line of defence; this asserts the
       runtime guard also refuses a caller that bypasses the types. */
    const bypass = createElement('img', { src: '/unverified.jpg', alt: '' }) as unknown as never

    expect(() => renderToStaticMarkup(createElement(Hero, { ...pageCopy, media: bypass }))).toThrow(
      /media/i,
    )
  })

  it('refuses an image whose dimensions are missing, zero, or negative', () => {
    for (const dims of [
      { url: '/x.jpg', alt: 'a' },
      { url: '/x.jpg', alt: 'a', width: 0, height: 0 },
      { url: '/x.jpg', alt: 'a', width: -10, height: -20 },
    ]) {
      expect(() =>
        renderToStaticMarkup(createElement(Hero, { ...pageCopy, media: dims as never })),
      ).toThrow(/media/i)
    }
  })

  it('refuses an image with no usable alt text', () => {
    expect(() =>
      renderToStaticMarkup(
        createElement(Hero, {
          ...pageCopy,
          media: { url: '/x.jpg', alt: '', width: 100, height: 50 },
        }),
      ),
    ).toThrow(/alt/i)
  })

  it('refuses a pending slot with a blank label', () => {
    expect(() =>
      renderToStaticMarkup(
        createElement(Hero, { ...pageCopy, media: { pending: true, label: '   ' } }),
      ),
    ).toThrow(/label/i)
  })

  it('pins the media box to the source ratio instead of letting the image size the box', () => {
    const { container } = render(
      createElement(Hero, {
        ...pageCopy,
        media: { url: '/x.jpg', alt: 'a', width: 1600, height: 900 },
      }),
    )

    const box = container.querySelector('[data-media-box]') as HTMLElement
    expect(box.style.aspectRatio).toBe('1600 / 900')
    expect(box.className).toContain('overflow-hidden')
  })
})

describe('hero action labels are usable', () => {
  it('refuses a blank label on a route action', () => {
    expect(() =>
      renderToStaticMarkup(
        createElement(Hero, {
          ...pageCopy,
          primaryAction: { label: '   ', routeId: 'request-quote' },
        }),
      ),
    ).toThrow(/label/i)
  })

  it('falls back to the registry label only when no label is supplied', () => {
    const { container } = render(
      createElement(Hero, {
        ...pageCopy,
        primaryAction: { routeId: 'request-quote' } as never,
      }),
    )

    expect(container.querySelector('a[href="/request-quote"]')?.textContent).toBe('Request a Quote')
  })
})

describe('hero has one addressable heading', () => {
  it('derives the heading id from a caller-supplied slug', () => {
    const { container } = render(
      createElement(Hero, { ...pageCopy, headingId: 'home-hero' }),
    )

    expect(container.querySelector('h1')?.id).toBe('home-hero')
    expect(container.querySelector('section')?.getAttribute('aria-labelledby')).toBe('home-hero')
  })

  it('gives two heroes on the same document distinct heading ids', () => {
    const { container } = render(
      createElement('div', null, [
        createElement(Hero, { ...pageCopy, key: 'a' }),
        createElement(Hero, { ...pageCopy, key: 'b' }),
      ]),
    )

    const ids = [...container.querySelectorAll('h1')].map((h1) => h1.id)
    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
    expect(ids.every((id) => id.length > 0)).toBe(true)

    const labelledBy = [...container.querySelectorAll('section')].map((s) =>
      s.getAttribute('aria-labelledby'),
    )
    expect(new Set(labelledBy).size).toBe(2)
  })

  it('rejects a heading id that cannot be used as a fragment reference', () => {
    expect(() =>
      renderToStaticMarkup(
        createElement(Hero, { ...pageCopy, headingId: 'not a slug!' }),
      ),
    ).toThrow(/heading/i)
  })
})
