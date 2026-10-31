import { isCanonicalPath } from '@/navigation/route-registry'

export type LocaleSwitchConfig = {
  releaseApproved: boolean
  coreRoutesPublished: boolean
  currentLocale: string
  currentPath: string
  options: readonly {
    locale: string
    nativeName: string
    path: string
    published: boolean
  }[]
}

export function publishedLocaleOptions(config?: LocaleSwitchConfig) {
  if (!config?.releaseApproved || !config.coreRoutesPublished) return []

  const options = config.options.filter((option) =>
    option.published && option.locale.trim() && option.nativeName.trim() && isCanonicalPath(option.path),
  )
  const current = options.find((option) => option.locale === config.currentLocale && option.path === config.currentPath)
  if (!current || !options.some((option) => option.locale !== config.currentLocale)) return []
  return options
}

export function FooterLocaleSwitch({ config }: { config?: LocaleSwitchConfig }) {
  const options = publishedLocaleOptions(config)
  if (!options.length) return null

  return (
    <nav aria-label="Language" className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {options.map((option) => (
        <a key={option.locale} href={option.path} hrefLang={option.locale} lang={option.locale}
          aria-current={option.locale === config?.currentLocale ? 'page' : undefined}
          className="rounded-sm text-sm text-card/85 underline-offset-4 hover:text-card hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-card">
          {option.nativeName}{option.locale === config?.currentLocale ? ' (current)' : ''}
        </a>
      ))}
    </nav>
  )
}
