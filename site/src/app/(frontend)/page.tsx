import type { Metadata } from 'next'
import { HomeView } from '@/components/home/home-view'
import { buildHomeModel } from '@/content/home-model'
import { getHomePlatformRecords } from '@/lib/get-home-platforms'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Home implementation preview | WheelSite',
  description: 'A preview of four product platforms and the planned sourcing paths.',
  robots: { index: false, follow: false },
}

// Only the Home preview exists in the application. Other Sitemap destinations
// become active here after their own content, implementation and review pass.
const publicDestinations = new Set<string>()

export default async function HomePage() {
  const records = await getHomePlatformRecords()
  const model = buildHomeModel(records, publicDestinations)

  return <HomeView {...model} />
}
