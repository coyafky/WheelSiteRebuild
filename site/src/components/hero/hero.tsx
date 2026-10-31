import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { requireNavigationRoute, type NavigationRouteId } from '@/navigation/route-registry'

/* type.display and type.h1 from Design.md each define exactly two steps:
   narrow below the 1024 breakpoint and wide at 1024 and above. No
   intermediate step is invented. */
const displaySize =
  'text-[40px] leading-[44px] font-[650] tracking-[-0.03em] lg:text-[60px] lg:leading-[64px]'
const pageSize =
  'text-[34px] leading-[40px] font-[650] tracking-[-0.025em] lg:text-[48px] lg:leading-[54px]'

const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

export type HeroPageType = 'home' | 'page'

/* A hero action either names a shared route id or scrolls to a section that
   already exists on the same page. The anchor form is not a placeholder: it
   must reference a real in-page section id. */
export type HeroAction =
  | { label: string; routeId: NavigationRouteId }
  | { label: string; anchor: string }

export type HeroMedia =
  | {
      url: string
      alt: string
      width: number
      height: number
      decorative?: boolean
    }
  | { pending: true; label: string }

export type HeroProps = {
  title: string
  description: string
  pageType?: HeroPageType
  media?: HeroMedia | ReactNode
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  /* Embedded tells the hero the page already supplies its own section and
     container, so the hero only renders the text/media grid. */
  embedded?: boolean
  className?: string
}

/* Shared hero for every page. The page supplies the message; this component
   owns the single H1, the type token and the action/media slots. Destinations
   come from the shared route registry so the hero never keeps its own URL
   list, and an unpublished destination is a configuration error. */
export function Hero({
  title,
  description,
  pageType = 'page',
  media,
  primaryAction,
  secondaryAction,
  embedded = false,
  className = '',
}: HeroProps) {
  if (!title.trim()) throw new Error('Hero requires a page title')
  if (!description.trim()) throw new Error('Hero requires a page description')

  const sizeToken = pageType === 'home' ? 'type.display' : 'type.h1'
  const primary = primaryAction ? resolveAction(primaryAction) : undefined
  const secondary = secondaryAction ? resolveAction(secondaryAction) : undefined

  const grid = (
      <div
        className={`grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-10 ${embedded ? '' : 'mx-auto w-full max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24'} ${className}`.trim()}
      >
        <div className="max-w-[720px]">
          <h1
            id="hero-title"
            data-size-token={sizeToken}
            className={`mb-5 text-foreground ${pageType === 'home' ? displaySize : pageSize}`}
          >
            {title}
          </h1>
          <p className="max-w-[55ch] text-base leading-6 text-muted-foreground lg:text-[17px] lg:leading-[26px]">
            {description}
          </p>
          {primary || secondary ? (
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-5">
              {primary ? (
                <Button asChild>
                  <a href={primary.path}>{primary.label}</a>
                </Button>
              ) : null}
              {secondary ? (
                <a
                  className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground hover:text-primary ${focus}`}
                  href={secondary.path}
                >
                  {secondary.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        {media ? <div className="min-w-0">{renderMedia(media)}</div> : null}
      </div>
  )

  if (embedded) return grid

  return (
    <section aria-labelledby="hero-title" className="bg-background">
      {grid}
    </section>
  )
}

/* A hero visual is either approved media with reserved dimensions or an
   explicitly labelled pending slot. Text never sits on an unverified photo;
   the drawing below is a placeholder, not product evidence. */
function renderMedia(media: HeroMedia | ReactNode): ReactNode {
  if (isPendingMedia(media)) {
    return (
      <div
        role="img"
        aria-label={`${media.label} (not verified product imagery)`}
        className="relative flex min-h-48 items-center justify-center overflow-hidden rounded-[var(--radius-info-card)] border border-border bg-card p-6 lg:min-h-[400px]"
      >
        <span
          className="absolute -right-16 bottom-[-4.5rem] size-72 rounded-full border-[44px] border-foreground/10 lg:size-[420px]"
          aria-hidden="true"
        />
        <span
          className="absolute right-6 bottom-8 size-40 rounded-full border-2 border-brand-accent/60 lg:size-56"
          aria-hidden="true"
        />
        <span className="relative z-10 max-w-[24ch] border-l-2 border-brand-accent bg-card py-2 pr-4 pl-4 text-sm font-semibold text-muted-foreground">
          {media.label}
        </span>
      </div>
    )
  }

  if (isMediaImage(media)) {
    return (
      <div className="overflow-hidden rounded-[var(--radius-info-card)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="size-full object-cover"
          src={media.url}
          alt={media.decorative ? '' : media.alt}
          width={media.width}
          height={media.height}
        />
      </div>
    )
  }

  return media
}

function isPendingMedia(media: HeroMedia | ReactNode): media is { pending: true; label: string } {
  return typeof media === 'object' && media !== null && 'pending' in media && media.pending === true
}

function isMediaImage(
  media: HeroMedia | ReactNode,
): media is { url: string; alt: string; width: number; height: number; decorative?: boolean } {
  return typeof media === 'object' && media !== null && 'url' in media && 'alt' in media
}

function resolveAction(action: HeroAction) {
  if ('anchor' in action) {
    if (!/^#[a-z][a-z0-9-]*$/.test(action.anchor)) {
      throw new Error(`Hero action anchor must be an in-page section id: ${action.anchor}`)
    }
    if (!action.label.trim()) throw new Error('Hero action requires a label')
    return { path: action.anchor, label: action.label }
  }

  const route = requireNavigationRoute(action.routeId)

  if (!route.published) {
    throw new Error(`Hero action points at unpublished route: ${action.routeId}`)
  }

  return { path: route.path, label: action.label || route.label }
}
