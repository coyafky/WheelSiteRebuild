import React from 'react'
import '../globals.css'

export const metadata = {
  description: 'WheelSite is under development.',
  title: 'WheelSite build in progress',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
