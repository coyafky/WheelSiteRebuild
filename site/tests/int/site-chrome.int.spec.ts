import { cleanup, render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { HomeView } from '@/components/home/home-view'
import { SiteChrome } from '@/components/site-chrome/site-chrome'

afterEach(cleanup)

describe('home page chrome', () => {
  it('shows one site header and one inquiry close around the home page', () => {
    render(createElement(SiteChrome, null, createElement(HomeView, { platforms: [], wheelPaths: [] })))

    expect(screen.getAllByRole('banner')).toHaveLength(1)
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1)
    expect(screen.getAllByRole('heading', { name: 'Start a sourcing inquiry' })).toHaveLength(1)
  })
})
