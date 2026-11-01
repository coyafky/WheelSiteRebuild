import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Hero } from '@/components/hero/hero'
import type { HomePlatform, HomeWheelPath } from '@/content/home-model'

type HomeViewProps = {
  platforms: HomePlatform[]
  wheelPaths: HomeWheelPath[]
}

const container = 'mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10'
const section = 'py-16 sm:py-20 lg:py-24'

function SectionLabel({ children, number }: { children: React.ReactNode; number: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
      <span>{number}</span>
      <span className="h-px w-10 bg-brand-accent" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

function ImagePlaceholder({ index }: { index: number }) {
  return (
    <div className="relative flex aspect-[5/3] items-center overflow-hidden border-b border-border bg-background p-6">
      <span className="absolute -right-8 -bottom-20 size-64 rounded-full border-[28px] border-foreground/10" aria-hidden="true" />
      <span className="absolute right-4 -bottom-11 text-[128px] leading-none font-semibold tracking-[-0.09em] text-foreground/10" aria-hidden="true">0{index}</span>
      <span className="relative max-w-[15ch] text-sm leading-5 font-semibold text-muted-foreground">
        Approved imagery pending
      </span>
      <span className="absolute top-5 left-6 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Media slot / 0{index}</span>
    </div>
  )
}

function PlatformCard({ platform, index }: { platform: HomePlatform; index: number }) {
  const content = (
    <>
      {platform.media ? (
        <div className="aspect-[5/3] overflow-hidden border-b border-border bg-background">
          {/* The image URL comes from an approved Payload Media record. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="size-full object-cover" src={platform.media.url} alt={platform.media.alt} />
        </div>
      ) : (
        <ImagePlaceholder index={index} />
      )}
      <CardHeader className="gap-3">
        <span className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
          {platform.status === 'ready' ? 'Product platform' : 'Preview · content pending'}
        </span>
        <h3 className="text-[21px] leading-7 font-[650] text-foreground">{platform.title}</h3>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <p className="text-sm leading-[21px] text-muted-foreground">
          {platform.intro || 'Platform details will appear after content and media review.'}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {platform.href ? 'Explore platform' : 'Page pending release'}
          {platform.href && <ArrowUpRight className="size-4" aria-hidden="true" />}
        </span>
      </CardContent>
    </>
  )

  return (
    <Card
      variant="product"
      className={
        platform.href
          ? 'h-full gap-0 pt-0 transition-transform duration-[var(--motion-fast)] hover:-translate-y-[3px] hover:border-brand-accent motion-reduce:transform-none'
          : 'h-full gap-0 pt-0'
      }
    >
      {platform.href ? (
        <Link className="group flex h-full flex-col rounded-[var(--radius-product-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href={platform.href}>
          {content}
        </Link>
      ) : (
        <div className="flex h-full flex-col">{content}</div>
      )}
    </Card>
  )
}

function WheelPathCard({ path, index }: { path: HomeWheelPath; index: number }) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-info-card)] border border-border bg-card p-6 lg:min-h-72">
      <div className="mb-8 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
          {path.kind === 'process' ? 'Process route' : 'Project route'}
        </span>
        <span className="text-sm font-semibold text-muted-foreground">0{index}</span>
      </div>
      <h4 className="mb-3 text-[21px] leading-7 font-[650]">{path.title}</h4>
      <p className="mb-3 text-sm leading-[21px] text-muted-foreground">{path.buyerTask}</p>
      <p className="mb-8 text-sm leading-[21px] text-muted-foreground">{path.inputs}</p>
      <div className="mt-auto border-t border-border pt-4 text-sm font-semibold text-primary">
        {path.href ? (
          <Link className="inline-flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href={path.href}>
            Explore this path <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        ) : (
          <span>Destination pending release</span>
        )}
      </div>
    </article>
  )
}

/* Preview hierarchy: the buyer's task and four-platform orientation share the
   first viewport; platform detail, nested Wheels paths, evidence, cooperation
   and one inquiry close follow. The primary action is product discovery.
   Light surfaces, red accents, type and spacing follow Design.md. The large
   abstract drawing is a labeled media placeholder, not a product claim. */
export function HomeView({ platforms, wheelPaths }: HomeViewProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only fixed top-3 left-3 z-50 rounded-lg bg-card px-4 py-3 text-foreground focus:not-sr-only focus:outline-2 focus:outline-ring"
      >
        Skip to content
      </a>
      <main id="main">
        <section className="overflow-hidden bg-background" aria-label="Home hero">
          <div className={`${container} flex min-h-[calc(100svh-4.5rem)] flex-col justify-between gap-6 py-6 sm:py-8 lg:gap-8 lg:py-12`}>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              <span className="sm:hidden">Products / sourcing / development</span>
              <span className="hidden sm:inline">Automotive components / sourcing and development</span>
              <span className="hidden lg:inline">01 — 04 / product platforms</span>
            </div>
            <Hero
              pageType="home"
              embedded
              headingId="home-hero"
              title="Four platforms. Two ways to work."
              description="Explore Wheels, EV Housings, Custom Aluminum and Safety Tires. Start with a defined sourcing requirement or a custom development brief."
              primaryAction={{ label: 'Explore platforms', anchor: '#platforms' }}
              secondaryAction={{ label: 'Work paths', anchor: '#work-paths' }}
              media={{ pending: true, label: 'Approved product imagery pending' }}
            />
            <div className="grid grid-cols-2 border-t border-border lg:grid-cols-4" aria-label="Four planned product platforms">
              {platforms.map((platform, index) => (
                <div key={platform.id} className="flex min-h-20 flex-col justify-center gap-1 border-b border-border py-3 pr-3 lg:border-b-0 lg:border-r lg:pl-5 lg:first:pl-0 lg:last:border-r-0">
                  <span className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">0{index + 1} / platform</span>
                  <span className="text-base font-semibold text-foreground">{platform.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="platforms" className={`${section} scroll-mt-24 bg-card`} aria-labelledby="platforms-title">
          <div className={container}>
            <SectionLabel number="01">Product platforms</SectionLabel>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <h2 id="platforms-title" className="max-w-[760px] text-[30px] leading-9 font-[650] tracking-[-0.025em] lg:text-[40px] lg:leading-[44px]">
                Four platforms. Wheels first.
              </h2>
              <p className="max-w-[420px] text-base leading-6 text-muted-foreground">
                These preview slots identify the planned catalog. A platform becomes a link only after its content and destination page are public.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {platforms.map((platform, index) => (
                <PlatformCard key={platform.id} platform={platform} index={index + 1} />
              ))}
            </div>
          </div>
        </section>

        <section id="wheel-paths" className={`${section} scroll-mt-24 bg-background`} aria-labelledby="wheel-paths-title">
          <div className={container}>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <SectionLabel number="01 / Wheels">Within Wheels</SectionLabel>
                <h2 id="wheel-paths-title" className="text-[30px] leading-9 font-[650] tracking-[-0.025em] lg:text-[40px] lg:leading-[44px]">Choose a wheel path.</h2>
              </div>
              <p className="max-w-[510px] text-base leading-6 text-muted-foreground">
                Two process topics and one custom project path within Wheels. Choose by the brief you have and the inputs you can share.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
              {wheelPaths.map((path, index) => (
                <WheelPathCard key={path.id} path={path} index={index + 1} />
              ))}
            </div>
            <p className="mt-6 text-sm leading-[21px] text-muted-foreground">
              Wheels overview and Wheel Engineering links will appear when those destination pages are published.
            </p>
          </div>
        </section>

        <section id="evidence" className={`${section} scroll-mt-24 bg-card`} aria-labelledby="evidence-title">
          <div className={container}>
            <SectionLabel number="02">Engineering and manufacturing</SectionLabel>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <h2 id="evidence-title" className="max-w-[720px] text-[30px] leading-9 font-[650] tracking-[-0.025em] lg:text-[40px] lg:leading-[44px]">
                Evidence should stay with the product it supports.
              </h2>
              <p className="max-w-[410px] text-base leading-6 text-muted-foreground">
                Process, testing and facility details will appear here only when their source and product scope have been reviewed.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
              {[
                ['Engineering', 'Product-specific design and validation material'],
                ['Manufacturing', 'Product-line process and facility context'],
              ].map(([title, description]) => (
                <Card key={title} className="min-h-56 justify-between bg-background">
                  <CardHeader>
                    <span className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">Evidence pending</span>
                    <h3 className="text-[21px] leading-7 font-[650]">{title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-[21px] text-muted-foreground">{description}. Verified details and destination links are pending.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="work-paths" className={`${section} scroll-mt-24 bg-background`} aria-labelledby="work-paths-title">
          <div className={container}>
            <SectionLabel number="03">Ways to work</SectionLabel>
            <h2 id="work-paths-title" className="mb-8 max-w-[760px] text-[30px] leading-9 font-[650] tracking-[-0.025em] lg:text-[40px] lg:leading-[44px]">
              Start with the kind of brief you have.
            </h2>
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
              <div className="flex min-h-72 flex-col rounded-[var(--radius-info-card)] border border-border border-t-2 border-t-brand-accent bg-card p-8">
                <span className="mb-8 block text-xs font-semibold tracking-[0.12em] text-primary uppercase">01 / Standard sourcing</span>
                <h3 className="mb-4 text-[26px] leading-8 font-[650]">A defined product requirement.</h3>
                <p className="max-w-[55ch] text-base leading-6 text-muted-foreground">Bring the platform, intended application, specifications and target quantity. The product route will guide the next question once its reviewed content is public.</p>
              </div>
              <div className="flex min-h-72 flex-col rounded-[var(--radius-info-card)] border border-border border-t-2 border-t-foreground bg-card p-8">
                <span className="mb-8 block text-xs font-semibold tracking-[0.12em] text-primary uppercase">02 / Custom development</span>
                <h3 className="mb-4 text-[26px] leading-8 font-[650]">A drawing, sample or project brief.</h3>
                <p className="max-w-[55ch] text-base leading-6 text-muted-foreground">Start with the application, key dimensions, material preferences and validation needs. The How We Work route will explain the evaluation stages when published.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  )
}
