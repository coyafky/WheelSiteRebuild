import { CertificationStrip, type CertificationRecord } from '@/components/site-footer/certification-strip'
import { FooterBottomBar, type LegalContent } from '@/components/site-footer/footer-bottom-bar'
import type { LocaleSwitchConfig } from '@/components/site-footer/footer-locale-switch'
import { FooterLinkGroups } from '@/components/site-footer/footer-link-groups'
import type { ContactMethod } from '@/components/site-footer/footer-contact'
import { PreFooterCta } from '@/components/site-footer/pre-footer-cta'

type SiteFooterProps = {
  hasEquivalentInquiryClose?: boolean
  blogEnabled?: boolean
  contactMethods?: readonly ContactMethod[]
  renderMode?: 'preview' | 'public'
  certifications?: readonly CertificationRecord[]
  legal?: LegalContent
  localeSwitch?: LocaleSwitchConfig
}

export function SiteFooter({ hasEquivalentInquiryClose = false, blogEnabled = false, contactMethods = [], renderMode = 'public', certifications = [], legal, localeSwitch }: SiteFooterProps) {
  return (
    <footer className="bg-surface-dark text-card">
      {hasEquivalentInquiryClose ? null : <PreFooterCta />}
      <FooterLinkGroups blogEnabled={blogEnabled} contactMethods={contactMethods} />
      <CertificationStrip records={certifications} renderMode={renderMode} />
      <FooterBottomBar legal={legal} localeSwitch={localeSwitch} />
    </footer>
  )
}
