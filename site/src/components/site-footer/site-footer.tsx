import { CertificationStrip } from '@/components/site-footer/certification-strip'
import { FooterBottomBar } from '@/components/site-footer/footer-bottom-bar'
import { FooterContact } from '@/components/site-footer/footer-contact'
import { FooterLinkGroups } from '@/components/site-footer/footer-link-groups'
import { PreFooterCta } from '@/components/site-footer/pre-footer-cta'

type SiteFooterProps = {
  hasEquivalentInquiryClose?: boolean
  blogEnabled?: boolean
}

export function SiteFooter({
  hasEquivalentInquiryClose = false,
  blogEnabled = false,
}: SiteFooterProps) {
  return (
    <footer className="bg-surface-dark text-card">
      {hasEquivalentInquiryClose ? null : <PreFooterCta />}
      <div className="mx-auto w-full max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[repeat(auto-fit,minmax(25%,1fr))]">
          <FooterLinkGroups blogEnabled={blogEnabled} />
          <FooterContact />
        </div>
        <CertificationStrip />
        <FooterBottomBar />
      </div>
    </footer>
  )
}
