import { CertificationStrip, type CertificationRecord } from '@/components/site-footer/certification-strip'
import { FooterBottomBar, type LegalContent } from '@/components/site-footer/footer-bottom-bar'
import { FooterBrand, type FooterBrandContent } from '@/components/site-footer/footer-brand'
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
  brand?: FooterBrandContent
}

export function SiteFooter({ hasEquivalentInquiryClose = false, blogEnabled = false, contactMethods = [], renderMode = 'public', certifications = [], legal, localeSwitch, brand }: SiteFooterProps) {
  return (
    <footer className="bg-surface-dark text-card">
      {hasEquivalentInquiryClose ? null : <PreFooterCta />}
      <FooterBrand renderMode={renderMode} brand={brand} />
      <FooterLinkGroups blogEnabled={blogEnabled} contactMethods={contactMethods} />
      <CertificationStrip records={certifications} renderMode={renderMode} />
      <FooterBottomBar legal={legal} localeSwitch={localeSwitch} />
    </footer>
  )
}
