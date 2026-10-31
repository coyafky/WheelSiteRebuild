import { PreFooterCta } from '@/components/site-footer/pre-footer-cta'

type SiteFooterProps = {
  hasEquivalentInquiryClose?: boolean
}

export function SiteFooter({ hasEquivalentInquiryClose = false }: SiteFooterProps) {
  return (
    <footer className="bg-surface-dark text-card">
      {hasEquivalentInquiryClose ? null : <PreFooterCta />}
    </footer>
  )
}
