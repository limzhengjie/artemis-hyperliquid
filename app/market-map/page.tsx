import { getMarketMapCategoriesAndProtocols } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

import ContentWrapper from '@/components/(layout)/content-wrapper'
import CategoryCard from '@/components/(market-map)/category-card'

const MarketMap = async () => {
  const categories = await getMarketMapCategoriesAndProtocols()

  const ANALYTICS_AND_RATINGS_CATEGORIES = ['analytics', 'rating_agencies']

  const ONCHAIN_CATEGORIES = [
    'p2p',
    'loans',
    'card',
    'bank',
    'payroll',
    'liquidity_providers',
    'yield',
    'b2b_payments',
    'cross_border',
    'wallets',
    'commerce',
    'treasury_management',
    'card_networks'
  ]

  const INFRA_PROVIDERS_CATEGORIES = [
    'blockchains',
    'infrastructure',
    'issuers',
    'orchestrators'
  ]

  const LAST_MILE_CATEGORIES = ['exchanges']

  return (
    <div className="w-full pt-12 pb-12 flex flex-col items-center gap-6 font-[family-name:var(--font-geist-sans)]">
      <ContentWrapper className="max-w-8xl md:px-18 lg:px-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-foreground font-semibold text-[28px] md:text-[32px] leading-[28px] md:leading-[32px] text-left">
            Stablecoin Market Landscape
          </h1>
          <p className="text-muted-foreground">
            The stablecoin market map provides a comprehensive overview of the
            stablecoin ecosystem, showing how money flows from on/off ramps and
            infrastructure to financial services, alongside the analytics and
            rating providers that provide market intelligence.
          </p>
          <Section layout="2-columns">
            {categories
              .filter(category =>
                ANALYTICS_AND_RATINGS_CATEGORIES.includes(category.category)
              )
              .map(category => (
                <CategoryCard key={category.category} category={category} />
              ))}
          </Section>
          <SectionHeader
            title="ON-OFF RAMPS"
            description="Entry and exit points for moving funds between traditional finance and stablecoins"
            gradientStart="#f093fb"
            gradientEnd="#f5576c"
          />
          <Section layout="full">
            {categories
              .filter(category =>
                LAST_MILE_CATEGORIES.includes(category.category)
              )
              .map(category => (
                <CategoryCard key={category.category} category={category} />
              ))}
          </Section>
          <SectionHeader
            title="INFRASTRUCTURE"
            description="Blockchain networks, stablecoin issuers, and backend protocol providers that power the stablecoin ecosystem"
            gradientStart="#667eea"
            gradientEnd="#764ba2"
          />
          <Section layout="full">
            {categories
              .filter(category =>
                INFRA_PROVIDERS_CATEGORIES.includes(category.category)
              )
              .map(category => (
                <CategoryCard key={category.category} category={category} />
              ))}
          </Section>
          <SectionHeader
            title="ONCHAIN FINANCIAL SERVICES"
            description="Applications and services where users manage, spend, and earn with their stablecoins"
            gradientStart="#4FACFE"
            gradientEnd="#00F2FE"
          />
          <Section layout="grid">
            {categories
              .filter(category =>
                ONCHAIN_CATEGORIES.includes(category.category)
              )
              .sort((a, b) => b.protocols.length - a.protocols.length)
              .map(category => (
                <CategoryCard key={category.category} category={category} />
              ))}
          </Section>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default MarketMap

const SectionHeader = ({
  title,
  description,
  gradientStart,
  gradientEnd
}: {
  title: string
  description?: string
  gradientStart: string
  gradientEnd: string
}) => {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`
      }}
      className="flex flex-col p-3 py-2 rounded-lg text-white"
    >
      <h2 className="font-bold text-md text-left">{title}</h2>
      {description && <p className="text-sm">{description}</p>}
    </div>
  )
}

const Section = ({
  layout,
  children
}: {
  layout: 'full' | '2-columns' | 'grid'
  children: React.ReactNode
}) => {
  return (
    <div
      className={`grid ${
        layout === 'full'
          ? 'grid-cols-1'
          : layout === '2-columns'
          ? 'grid-cols-1 sm:grid-cols-2'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      } gap-3`}
    >
      {children}
    </div>
  )
}
