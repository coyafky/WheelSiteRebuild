import { Button } from '@/components/ui/button'
import { getNavigationRoute } from '@/navigation/route-registry'

export function HeaderActions({ currentPath = '' }: { currentPath?: string }) {
  const quote = getNavigationRoute('request-quote')
  const current = currentPath === quote.path

  return (
    <Button asChild variant="default">
      <a href={quote.path} aria-label={quote.label} aria-current={current ? 'page' : undefined}>
        <span className="hidden lg:inline">{quote.label}</span>
        <span className="lg:hidden">Quote</span>
      </a>
    </Button>
  )
}
