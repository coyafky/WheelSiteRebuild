import { getBreadcrumbTrail } from '@/navigation/breadcrumb-trail'

export type BlogArticle = {
  slug: string
  title: string
  categoryId?: 'blog-technical' | 'blog-company-news'
  publicationState: 'draft' | 'test' | 'published'
  reviewed: boolean
}

export function getBlogArticleTrail(article: BlogArticle, mode: 'preview' | 'public') {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) return null
  if (article.slug === 'technical' || article.slug === 'company-news') return null
  if (!article.categoryId) return null
  if (mode === 'public' && (article.publicationState !== 'published' || !article.reviewed)) {
    return null
  }

  const parents = getBreadcrumbTrail(article.categoryId, mode)
  if (!parents) return null

  return [
    ...parents,
    {
      id: `article-${article.slug}`,
      label: article.title,
      path: `/blog/${article.slug}`,
      published: mode === 'public',
    },
  ]
}
