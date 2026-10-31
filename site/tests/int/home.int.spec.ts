import { describe, expect, it } from 'vitest'
import { buildHomeModel } from '@/content/home-model'

describe('Home product discovery', () => {
  it('keeps the four platform order and only links a published platform with a public destination', () => {
    const home = buildHomeModel(
      [
        { platformId: 'safety-tires', title: 'Safety Tires', intro: 'Reviewed tire introduction', publicationState: 'published' },
        { platformId: 'wheels', title: 'Wheels', intro: 'Reviewed wheel introduction', publicationState: 'published' },
        { platformId: 'ev-housings', title: 'EV Housings', intro: 'Draft housing introduction', publicationState: 'draft' },
      ],
      new Set(['/products/wheels']),
    )

    expect(home.platforms.map(({ id }) => id)).toEqual([
      'wheels',
      'ev-housings',
      'custom-aluminum',
      'safety-tires',
    ])
    expect(home.platforms[0]).toMatchObject({
      title: 'Wheels',
      intro: 'Reviewed wheel introduction',
      href: '/products/wheels',
    })
    expect(home.platforms[1]).toMatchObject({ status: 'pending', href: undefined })
    expect(home.platforms[3]).toMatchObject({ status: 'pending', href: undefined })
  })

  it('keeps the three Wheels routes beneath the parent and never links an unpublished destination', () => {
    const home = buildHomeModel([], new Set(['/products/wheels/forged']))

    expect(home.wheelPaths.map(({ id, kind }) => [id, kind])).toEqual([
      ['flow-formed', 'process'],
      ['forged', 'process'],
      ['custom', 'project'],
    ])
    expect(home.wheelPaths.map(({ href }) => href)).toEqual([
      undefined,
      '/products/wheels/forged',
      undefined,
    ])
  })
})
