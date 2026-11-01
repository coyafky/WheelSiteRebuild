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

  return <HeaderContents currentPath={path} blogEnabled={blogEnabled} />
}

function HeaderContents({ currentPath, blogEnabled }: { currentPath: string; blogEnabled: boolean }) {
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const productsButtonRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const lastPathRef = useRef(currentPath)

  useEffect(() => {
    if (lastPathRef.current === currentPath) return
    lastPathRef.current = currentPath
    setProductsOpen(false)
    setMobileOpen(false)
  }, [currentPath])

  useEffect(() => {
    if (!productsOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setProductsOpen(false)
      productsButtonRef.current?.focus()
    }
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setProductsOpen(false)
    }
    const closeOnNarrowLayout = () => {
      if (window.innerWidth < 1024) setProductsOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutsidePointer)
    window.addEventListener('resize', closeOnNarrowLayout)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      window.removeEventListener('resize', closeOnNarrowLayout)
    }
  }, [productsOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const closeOnDesktopLayout = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', closeOnDesktopLayout)
    return () => window.removeEventListener('resize', closeOnDesktopLayout)
  }, [mobileOpen])

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-card text-foreground">
      <PrimaryHeader
        currentPath={currentPath}
        blogEnabled={blogEnabled}
        productsOpen={productsOpen}
        productsButtonRef={productsButtonRef}
        onProductsToggle={() => setProductsOpen((open) => !open)}
        mobileOpen={mobileOpen}
        menuButtonRef={menuButtonRef}
        onMobileToggle={() => {
          setProductsOpen(false)
          setMobileOpen((open) => !open)
        }}
      />
      <ProductsMegaMenu open={productsOpen} />
      {mobileOpen ? (
        <MobileNavigationDrawer
          currentPath={currentPath}
          blogEnabled={blogEnabled}
          onClose={() => {
            setMobileOpen(false)
            menuButtonRef.current?.focus()
          }}
          onNavigate={() => setMobileOpen(false)}
        />
      ) : null}
    </header>
  )
}
