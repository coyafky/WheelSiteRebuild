import { Button } from '@/components/ui/button'
import { getNavigationRoute } from '@/navigation/route-registry'

export function HeaderActions({ currentPath = '' }: { currentPath?: string }) {
  const quote = getNavigationRoute('request-quote')
  const current = currentPath === quote.path

  return (
    <Button asChild variant="default">
      <a href={quote.path} aria-current={current ? 'page' : undefined}>
        {quote.label}
      </a>
    </Button>
  )
}
