import { Button } from '@/components/ui/button'
import { requireNavigationRoute } from '@/navigation/route-registry'

const focusOnDark = 'focus-visible:outline-primary-foreground'

export function PreFooterCta() {
  const quote = requireNavigationRoute('request-quote')
  const contact = requireNavigationRoute('contact')

  return (
    <section aria-labelledby="pre-footer-heading" className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-24">
      <h2 id="pre-footer-heading" className="max-w-[720px] text-[30px] leading-9 font-[650] tracking-[-0.025em] lg:text-[40px] lg:leading-[44px]">
        Start a sourcing inquiry
      </h2>
      <div className="flex flex-wrap items-center gap-4 sm:gap-5">
        <Button asChild className={focusOnDark} variant="default">
          <a href={quote.path}>{quote.label}</a>
        </Button>
        <Button
          asChild
          className={`${focusOnDark} text-card underline underline-offset-4 hover:text-card`}
          variant="link"
        >
          <a href={contact.path}>{contact.label}</a>
        </Button>
      </div>
    </section>
  )
}
