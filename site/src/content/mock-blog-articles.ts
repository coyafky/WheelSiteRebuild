import type { BlogArticle } from '@/navigation/blog-article-trail'

const mockArticles: readonly BlogArticle[] = [
  {
    slug: 'mock-wheel-engineering',
    title: 'Mock Wheel Engineering Article',
    categoryId: 'blog-technical',
    publicationState: 'test',
    reviewed: false,
  },
  {
    slug: 'mock-company-update',
    title: 'Mock Company Update',
    categoryId: 'blog-company-news',
    publicationState: 'test',
    reviewed: false,
  },
]

export function resolveMockBlogArticle(segments: readonly string[], allowPreview: boolean) {
  if (!allowPreview || segments.length !== 2 || segments[0] !== 'blog') return undefined
  return mockArticles.find((article) => article.slug === segments[1])
}
