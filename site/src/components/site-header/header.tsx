'use client'

import { usePathname } from 'next/navigation'
import { MobileNavigationDrawer } from '@/components/site-header/mobile-navigation-drawer'
import './header.css'
import { PrimaryHeader } from '@/components/site-header/primary-header'
import { ProductsMegaMenu } from '@/components/site-header/products-mega-menu'

export type SiteHeaderProps = {
  currentPath?: string
  blogEnabled?: boolean
}

export function SiteHeader({ currentPath, blogEnabled = false }: SiteHeaderProps = {}) {
  const pathname = usePathname()
  const path = currentPath ?? pathname ?? ''

  return (
    <header className="sticky top-0 z-40 bg-card text-foreground">
      <PrimaryHeader currentPath={path} blogEnabled={blogEnabled} />
      <ProductsMegaMenu />
      <MobileNavigationDrawer />
    </header>
  )
}
