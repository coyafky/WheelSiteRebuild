'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MobileNavigationDrawer } from '@/components/site-header/mobile-navigation-drawer'
import { PrimaryHeader } from '@/components/site-header/primary-header'
import { ProductsMegaMenu } from '@/components/site-header/products-mega-menu'
import './header.css'

export type SiteHeaderProps = {
  currentPath?: string
  blogEnabled?: boolean
}

export function SiteHeader({ currentPath, blogEnabled = false }: SiteHeaderProps) {
  const pathname = usePathname()
  const path = currentPath ?? pathname ?? ''
  const [productsOpen, setProductsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const disclosureRef = useRef<HTMLButtonElement>(null)
  const lastPathRef = useRef(path)

  useEffect(() => {
    if (lastPathRef.current === path) return
    lastPathRef.current = path
    setProductsOpen(false)
  }, [path])

  useEffect(() => {
    if (!productsOpen) return

    function closeFromEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setProductsOpen(false)
      disclosureRef.current?.focus()
    }

    function closeFromPointerDown(event: PointerEvent) {
      const header = headerRef.current
      if (!header || !(event.target instanceof Node) || header.contains(event.target)) return
      setProductsOpen(false)
    }

    document.addEventListener('keydown', closeFromEscape)
    document.addEventListener('pointerdown', closeFromPointerDown)
    return () => {
      document.removeEventListener('keydown', closeFromEscape)
      document.removeEventListener('pointerdown', closeFromPointerDown)
    }
  }, [productsOpen])

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-card text-foreground">
      <PrimaryHeader
        currentPath={path}
        blogEnabled={blogEnabled}
        productsOpen={productsOpen}
        productsDisclosureRef={disclosureRef}
        onToggleProducts={() => setProductsOpen((open) => !open)}
      />
      <ProductsMegaMenu open={productsOpen} />
      <MobileNavigationDrawer />
    </header>
  )
}
