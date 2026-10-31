import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { resolvePreviewRoute } from '@/navigation/preview-route-registry'

type Props = { params: Promise<{ slug: string[] }> }

async function routeFor(params: Props['params']) {
  const { slug } = await params
  const route = resolvePreviewRoute(slug, { allowPlanned: process.env.NODE_ENV === 'development' })
  if (!route) notFound()
  return route
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await routeFor(params)
  return {
    title: `${route.label} implementation preview | WheelSite`,
    description: `${route.label} content is pending review.`,
    robots: { index: false, follow: false },
  }
}

export default async function PreviewPage({ params }: Props) {
  const route = await routeFor(params)
  return (
    <main
      id="main"
      className="mx-auto min-h-[60vh] w-full max-w-[1500px] px-5 py-16 sm:px-8 lg:px-10"
    >
      <p className="mb-4 text-sm font-semibold text-muted-foreground">
        Internal implementation preview
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">{route.label}</h1>
      <p className="mt-6 max-w-[65ch] text-base leading-7 text-muted-foreground">
        Content pending review
      </p>
    </main>
  )
}
