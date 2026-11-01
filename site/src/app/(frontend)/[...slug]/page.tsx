import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { resolvePreviewRoute } from '@/navigation/preview-route-registry'
import { BreadcrumbTrail, SiteBreadcrumb } from '@/components/site-breadcrumb/site-breadcrumb'
import { resolveMockBlogArticle } from '@/content/mock-blog-articles'
import { getBlogArticleTrail } from '@/navigation/blog-article-trail'

type Props = { params: Promise<{ slug: string[] }> }

async function routeFor(params: Props['params']) {
  const { slug } = await params
  const allowPlanned = process.env.NODE_ENV === 'development'
  const route = resolvePreviewRoute(slug, { allowPlanned })
  if (route) return { kind: 'route' as const, route }
  const article = resolveMockBlogArticle(slug, allowPlanned)
  if (article) return { kind: 'article' as const, article }
  notFound()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = await routeFor(params)
  const label = destination.kind === 'route' ? destination.route.label : destination.article.title
  return {
    title: `${label} implementation preview | WheelSite`,
    description: `${label} content is pending review.`,
    robots: { index: false, follow: false },
  }
}

export default async function PreviewPage({ params }: Props) {
  const destination = await routeFor(params)
  const label = destination.kind === 'route' ? destination.route.label : destination.article.title
  const articleTrail =
    destination.kind === 'article' ? getBlogArticleTrail(destination.article, 'preview') : null
  return (
    <main
      id="main"
      className="mx-auto min-h-[60vh] w-full max-w-[1500px] px-5 py-16 sm:px-8 lg:px-10"
    >
      {destination.kind === 'route' ? (
        <SiteBreadcrumb currentId={destination.route.id} />
      ) : articleTrail ? (
        <BreadcrumbTrail items={articleTrail} />
      ) : null}
      <p className="mb-4 text-sm font-semibold text-muted-foreground">
        Internal implementation preview
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">{label}</h1>
      <p className="mt-6 max-w-[65ch] text-base leading-7 text-muted-foreground">
        {destination.kind === 'article'
          ? 'Test content for internal preview only'
          : 'Content pending review'}
      </p>
    </main>
  )
}
