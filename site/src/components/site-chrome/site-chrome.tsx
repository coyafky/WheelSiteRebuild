import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer/site-footer'
import { SiteHeader } from '@/components/site-header/header'

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter renderMode="preview" />
    </>
  )
}
