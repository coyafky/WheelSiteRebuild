import { getNavigationRoute } from '@/navigation/route-registry'
import { FooterLocaleSwitch, publishedLocaleOptions, type LocaleSwitchConfig } from '@/components/site-footer/footer-locale-switch'

type LegalPage = { reviewed: boolean; published: boolean }

export type LegalContent = {
  privacyPolicy?: LegalPage
  termsOfUse?: LegalPage
  entity?: { name: string; evidenceRef: string; approvedForPublic: boolean }
}

export function FooterBottomBar({ legal = {}, localeSwitch }: { legal?: LegalContent; localeSwitch?: LocaleSwitchConfig }) {
  const privacy = legal.privacyPolicy?.reviewed && legal.privacyPolicy.published
    ? getNavigationRoute('privacy-policy') : null
  const terms = legal.termsOfUse?.reviewed && legal.termsOfUse.published
    ? getNavigationRoute('terms-of-use') : null
  const entity = legal.entity?.approvedForPublic && legal.entity.evidenceRef.trim() && legal.entity.name.trim()
    ? legal.entity.name.trim() : null

  const hasLegal = Boolean(privacy || terms || entity)
  if (!hasLegal && !publishedLocaleOptions(localeSwitch).length) return null

  return (
    <div className="border-t border-card/20">
      <div className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-6 text-sm text-card/85 sm:px-8 lg:px-10">
        {hasLegal ? (
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {privacy ? <a href={privacy.path} className="rounded-sm underline-offset-4 hover:text-card hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-card">{privacy.label}</a> : null}
            {terms ? <a href={terms.path} className="rounded-sm underline-offset-4 hover:text-card hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-card">{terms.label}</a> : null}
            {entity ? <span>© {new Date().getFullYear()} {entity}</span> : null}
          </nav>
        ) : null}
        <FooterLocaleSwitch config={localeSwitch} />
      </div>
    </div>
  )
}
