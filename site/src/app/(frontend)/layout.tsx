import React from 'react'
import '../globals.css'
import { SiteChrome } from '@/components/site-chrome/site-chrome'

export const metadata = {
  description: 'WheelSite is under development.',
  title: 'WheelSite build in progress',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
