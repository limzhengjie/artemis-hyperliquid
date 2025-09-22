import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'

 

import { getCurrentDate, getStartDate } from '@/lib/dates'

import { fetchHyperliquidPerpVolume, fetchPerpVolumeByVenue, fetchAllSpotDEXVolume } from '@/lib/fetchHyperliquidData'
import { BINANCE_HYPERLIQUID_SPOT_DATA, BINANCE_PERP_WEEKLY } from '@/constants/data/binance-hyperliquid'
import { HYPERLIQUID_INCLUDES_HYPERUNIT_DATA, HYPERLIQUID_INCLUDES_HYPERUNIT_CONFIG } from '@/constants/data/hyperunit-flows'
import { HYPERLIQUID_USDC_TVL_DATA, HYPERLIQUID_USDC_TVL_CONFIG } from '@/constants/data/hyperliquid-usdc-tvl'
import { HYPERUNIT_TVL_DATA, HYPERUNIT_TVL_CONFIG } from '@/constants/data/hyperunit-tvl'
import { TVL_DATA } from '@/constants/data/overview'
import { loadHyperevmStablecoinsStackedData, HYPEREVM_STABLECOIN_STACKED_CONFIG } from '@/constants/data/hyperevm-stablecoins'

import type { ChartConfig } from '@/components/ui/chart'

import Chart from '@/components/chart'
import Blurb from '@/components/blurb'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import ArtemisLogo from '@/components/(layout)/artemis-logo'

 
import StatSummaryTile from '@/components/stat-summary-tile'
// Removed unused BlurbHero

export default async function Overview() {
  const endDate = getCurrentDate()

  const hyperliquidPerpVolume2YearData = await fetchHyperliquidPerpVolume(
    getStartDate(365 * 2) as string,
    endDate as string,
    'daily' // API only supports daily, we'll aggregate to weekly client-side
  )

  const hyperliquidPerpVolume1YearData = await fetchHyperliquidPerpVolume(
    getStartDate(365 * 1 + 10) as string, // 10 days to buffer extra days to ensure we have data for the last 365 days
    endDate as string,
    'daily'
  )

  // Map Hype-only keyed rows -> { date, value } series for sparkline/tiles
  const hyperliquidPerpVolume2YearDailySeries = (hyperliquidPerpVolume2YearData as any[]).map(row => ({
    date: row.date,
    value: Number((row as any).hype ?? (row as any).HYPE ?? 0)
  }))
  const hyperliquidPerpVolume1YearSeries = (hyperliquidPerpVolume1YearData as any[]).map(row => ({
    date: row.date,
    value: Number((row as any).hype ?? (row as any).HYPE ?? 0)
  }))

  // Helper function to get week start (Monday)
  function getWeekStartForSparkline(dateStr: string) {
    const d = new Date(dateStr)
    const day = d.getUTCDay() // 0=Sun..6=Sat
    const diffToMonday = (day + 6) % 7
    const ms = d.getTime() - diffToMonday * 24 * 60 * 60 * 1000
    const monday = new Date(ms)
    const yyyy = monday.getUTCFullYear()
    const mm = String(monday.getUTCMonth() + 1).padStart(2, '0')
    const dd = String(monday.getUTCDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  // Aggregate daily data to weekly for the sparkline
  const weeklyVolumeMap: Record<string, number> = {}
  hyperliquidPerpVolume2YearDailySeries.forEach(item => {
    const weekStart = getWeekStartForSparkline(item.date)
    weeklyVolumeMap[weekStart] = (weeklyVolumeMap[weekStart] || 0) + item.value
  })

  // Convert back to series format for sparkline
  const hyperliquidPerpVolume2YearSeries = Object.entries(weeklyVolumeMap)
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const latestHyperliquidPerpVolume =
    hyperliquidPerpVolume1YearSeries?.[hyperliquidPerpVolume1YearSeries.length - 1]?.value || 0

  const latestHyperliquidPerpVolumeChange =
    (hyperliquidPerpVolume1YearSeries?.[hyperliquidPerpVolume1YearSeries.length - 1]?.value || 0) -
    (hyperliquidPerpVolume1YearSeries?.[hyperliquidPerpVolume1YearSeries.length - 2]?.value || 0)

  // Alias for clarity with current hero label
  const latestPerpVolume = latestHyperliquidPerpVolume
  const latestPerpVolumeChange = latestHyperliquidPerpVolumeChange

  const allPerpsVolumeData = await fetchPerpVolumeByVenue(
    getStartDate(365) as string,
    endDate as string
  )

  const allSpotDEXVolumeData = await fetchAllSpotDEXVolume(
    getStartDate(365) as string,
    endDate as string
  )

  // HyperEVM Stablecoin balances from CSV, aggregated by token
  const HYPEREVM_STABLECOIN_STACKED = await loadHyperevmStablecoinsStackedData()

  // Build Binance vs Hyperliquid Weekly Perp Comparison (reuse logic from /binance-hyperliquid)
  function getWeekStart(dateStr: string) {
    const d = new Date(dateStr)
    const day = d.getUTCDay() // 0=Sun..6=Sat
    const diffToMonday = (day + 6) % 7
    const ms = d.getTime() - diffToMonday * 24 * 60 * 60 * 1000
    const monday = new Date(ms)
    const yyyy = monday.getUTCFullYear()
    const mm = String(monday.getUTCMonth() + 1).padStart(2, '0')
    const dd = String(monday.getUTCDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const weeklyHypeMap: Record<string, number> = {}
  ;(allPerpsVolumeData || []).forEach((row: any) => {
    const v = Number(row.hype || 0)
    if (!isNaN(v)) {
      const wk = getWeekStart(row.date)
      weeklyHypeMap[wk] = (weeklyHypeMap[wk] || 0) + v
    }
  })

  const PERP_VOLUME_BINANCE_HYPERLIQUID_DATA = BINANCE_PERP_WEEKLY.map(entry => ({
    date: entry.date as string,
    Binance: Number(entry.Binance),
    Hyperliquid: Number(weeklyHypeMap[entry.date] || 0)
  })) as Array<{ date: string; Binance: number; Hyperliquid: number }>

  const PERP_VOLUME_BINANCE_HYPERLIQUID_CONFIG = {
    Hyperliquid: { label: 'Hyperliquid Perps', color: '#00D4AA', type: CHART_TYPES.stacked100, stackId: 'perpsBH' },
    Binance: { label: 'Binance Perps', color: '#5E9EFD', type: CHART_TYPES.stacked100, stackId: 'perpsBH' }
  } as const

  const SPOT_PERCENT_CONFIG = {
    Hyperliquid: { label: 'Hyperliquid', color: '#00D4AA', type: CHART_TYPES.stacked100, stackId: 'spot' },
    Binance: { label: 'Binance', color: '#5E9EFD', type: CHART_TYPES.stacked100, stackId: 'spot' }
  } as const

  // Removed unused ALL_PERPS_CONFIG

  const PERP_VOLUME_BY_SYMBOL_CONFIG: ChartConfig = {
    aevo: { label: 'Aevo', color: '#8B5CF6', type: CHART_TYPES.stacked100, stackId: 'perps' },
    apex: { label: 'Apex', color: '#3B82F6', type: CHART_TYPES.stacked100, stackId: 'perps' },
    avantis: { label: 'Avantis', color: '#10B981', type: CHART_TYPES.stacked100, stackId: 'perps' },
    blue: { label: 'Bluefin', color: '#0EA5E9', type: CHART_TYPES.stacked100, stackId: 'perps' },
    drift: { label: 'Drift', color: '#8B5A2B', type: CHART_TYPES.stacked100, stackId: 'perps' },
    dydx: { label: 'dYdX', color: '#6366F1', type: CHART_TYPES.stacked100, stackId: 'perps' },
    gns: { label: 'Gains', color: '#22C55E', type: CHART_TYPES.stacked100, stackId: 'perps' },
    gmx: { label: 'GMX', color: '#3B82F6', type: CHART_TYPES.stacked100, stackId: 'perps' },
    hold: { label: 'Hold', color: '#64748B', type: CHART_TYPES.stacked100, stackId: 'perps' },
    hype: { label: 'Hyperliquid', color: '#00D4AA', type: CHART_TYPES.stacked100, stackId: 'perps' },
    jup: { label: 'Jupiter', color: '#C2410C', type: CHART_TYPES.stacked100, stackId: 'perps' },
    ktc: { label: 'KTX', color: '#0891B2', type: CHART_TYPES.stacked100, stackId: 'perps' },
    mcb: { label: 'MCB', color: '#84CC16', type: CHART_TYPES.stacked100, stackId: 'perps' },
    perp: { label: 'Perpetual', color: '#A855F7', type: CHART_TYPES.stacked100, stackId: 'perps' },
    vrtx: { label: 'Vertex', color: '#F59E0B', type: CHART_TYPES.stacked100, stackId: 'perps' },
    lighter: { label: 'Lighter', color: '#06B6D4', type: CHART_TYPES.stacked100, stackId: 'perps' }
  }

  // Remap Spot DEX keys to match config and guard empty
  const remapSpotRow = (row: any) => ({
    date: row.date,
    ray: Number(row.ray ?? row.raydium ?? 0),
    cake: Number(row.cake ?? row.pancakeswap ?? 0),
    hype: Number(row.hype ?? 0),
    orca: Number(row.orca ?? 0),
    uni: Number(row.uni ?? row.uniswap ?? 0)
  })
  const spotDEXSeries = Array.isArray(allSpotDEXVolumeData)
    ? (allSpotDEXVolumeData as any[]).map(remapSpotRow)
    : []


  const SPOT_VOLUME_BY_SYMBOL_CONFIG: ChartConfig = {
    ray: { label: 'Raydium', color: '#9945FF', type: CHART_TYPES.stacked100, stackId: 'spot' },
    cake: { label: 'PancakeSwap', color: '#D1884F', type: CHART_TYPES.stacked100, stackId: 'spot' },
    hype: { label: 'Hyperliquid', color: '#00D4AA', type: CHART_TYPES.stacked100, stackId: 'spot' },
    orca: { label: 'Orca', color: '#FFD512', type: CHART_TYPES.stacked100, stackId: 'spot' },
    uni: { label: 'Uniswap', color: '#FF007A', type: CHART_TYPES.stacked100, stackId: 'spot' }
  }

  // Build stacked-only series for the chart (HLP, SPOT, APPS only)
  const TVL_STACKED = (TVL_DATA as any[]).map(d => ({
    date: d.DATE,
    TVL_HLP: Number.isFinite(d.TVL_HLP) ? d.TVL_HLP : 0,
    TVL_SPOT: Number.isFinite(d.TVL_SPOT) ? d.TVL_SPOT : 0,
    TVL_APPS: Number.isFinite(d.TVL_APPS) ? d.TVL_APPS : 0
  }))

  const TVL_STACKED_CONFIG: ChartConfig = {
    TVL_HLP: { label: 'TVL_HLP', color: '#00D4AA', type: CHART_TYPES.bar, stackId: 'tvl' },
    TVL_SPOT: { label: 'TVL_SPOT', color: '#F7BD5F', type: CHART_TYPES.bar, stackId: 'tvl' },
    TVL_APPS: { label: 'TVL_APPS', color: '#5E9EFD', type: CHART_TYPES.bar, stackId: 'tvl' }
  }

  const SPOT_VOLUME_BINANCE_HYPERLIQUID_CONFIG: ChartConfig = {
    Binance: { label: 'Binance', color: '#5E9EFD', type: CHART_TYPES.bar, stackId: 'spot' },
    Hyperliquid: { label: 'Hyperliquid', color: '#00D4AA', type: CHART_TYPES.bar, stackId: 'spot' }
  }

  return (
    <div className="w-full pb-12 flex flex-col items-center gap-18 font-[family-name:var(--font-geist-sans)]">
      {/* Hero: Thesis + KPI + CTA */}
      <div
        className="w-full flex items-center justify-center gap-12 pt-16 pb-16"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-5">
              <p className="text-[var(--color-hyperliquid-teal-500)] text-sm font-medium tracking-wide font-[family-name:var(--font-geist-mono)]">
                The Hyperliquid Thesis
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                The unified liquidity stack
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Hyperliquid is building the financial infrastructure of the future. The platform unifies derivatives, spot, and settlement into a single composable system. This report examines how three architectural layers create sustainable competitive advantages and network effects that compound over time.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                
                <Link href="#layer-1-derivatives">
                  <Button variant="cta">Explore the thesis</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full">
              <StatSummaryTile
                mainStatLabel="PERP VOLUME"
                mainStat={{
                  value: latestHyperliquidPerpVolume,
                  type: VALUE_FORMAT.currency
                }}
                mainStatChange={{
                  value: latestPerpVolumeChange,
                  type: VALUE_FORMAT.currency,
                  label: 'over the last day'
                }}
                sparklineData={hyperliquidPerpVolume2YearSeries}
                miniStatsData={hyperliquidPerpVolume1YearSeries}
              />
            </div>
          </div>
        </ContentWrapper>
      </div>

      {/* Powered by Artemis */}
      <ContentWrapper>
        <div className="w-full flex items-center justify-center gap-3 py-2">
          <ArtemisLogo poweredBy />
        </div>
      </ContentWrapper>

      {/* Table of Contents */}
      <ContentWrapper>
        <div className="w-full max-w-[900px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-4 border border-[var(--color-background-light-outline)] rounded-lg px-4 py-4">
          <div className="text-sm text-muted-foreground">On this page</div>
          <div className="flex flex-wrap gap-3">
            <Link href="#layer-1-derivatives"><Button variant="ghost" size="sm">Layer 1: Derivatives Dominance</Button></Link>
            <Link href="#layer-2-spot"><Button variant="ghost" size="sm">Layer 2: Spot Settlement</Button></Link>
            <Link href="#layer-3-infrastructure"><Button variant="ghost" size="sm">Layer 3: Infrastructure Scale</Button></Link>
          </div>
        </div>
      </ContentWrapper>

      {/* Layer 1: Derivatives Dominance */}
      <div id="layer-1-derivatives" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Layer 1: Derivatives Dominance"
            description="Perpetual futures are Hyperliquid's foundation: the proving ground where superior execution, deep liquidity, and transparent settlement create sustainable competitive moats. Market share gains against incumbents reveal structural advantages that compound over time."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 1: Binance comparison - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="Market Share Momentum"
            description="Hyperliquid's rise in perpetual futures represents more than growth. It signals a structural shift in how sophisticated traders value execution quality over raw size. The steady climb from single digits to meaningful market share against Binance demonstrates that transparent orderbooks and onchain settlement create sustainable competitive advantages."
          />
          <div className="col-span-2">
            <Chart
              title="Binance vs Hyperliquid Perp Volume (Weekly)"
              data={PERP_VOLUME_BINANCE_HYPERLIQUID_DATA as any}
              dataConfig={PERP_VOLUME_BINANCE_HYPERLIQUID_CONFIG as any}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
              chartHeight={360}
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 2: Asset diversification - Full width with centered text */}
      <ContentWrapper className="max-w-none px-8 md:px-32">
        <div className="w-full flex flex-col items-center gap-6 mb-4">
          <Blurb
            title="Perpetual Futures Market Share"
            description="The competitive landscape of perpetual futures reveals Hyperliquid's remarkable ascent among decentralized venues. While established players like dYdX, GMX, and Gains Network maintain significant positions, Hyperliquid's consistent growth demonstrates the power of superior execution and transparent settlement. The platform's ability to capture and retain market share across market cycles signals sustainable competitive advantages."
            textAlignment="center"
          />
        </div>
        {allPerpsVolumeData && allPerpsVolumeData.length > 0 ? (
          <Chart
            title="Perpetual Futures Volume by Venue"
            data={allPerpsVolumeData}
            dataConfig={PERP_VOLUME_BY_SYMBOL_CONFIG}
            valueFormat={VALUE_FORMAT.percentage}
            isTimeSeries
            bare
            chartHeight={480}
            hidePoweredBy
          />
        ) : (
          <div className="w-full h-[480px] flex items-center justify-center text-muted-foreground">
            Unable to load data right now.
          </div>
        )}
      </ContentWrapper>

      {/* Layer 2: Spot Settlement */}
      <div id="layer-2-spot" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Layer 2: Spot Settlement"
            description="Spot trading completes the liquidity loop, enabling seamless capital flows between derivatives and underlying assets. As onchain settlement becomes the standard, Hyperliquid's unified orderbook architecture provides execution advantages that traditional exchanges cannot match."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 3: Binance vs HL Spot - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
            title="The Spot Challenge"
            description="Spot markets reveal different competitive dynamics than derivatives. While Hyperliquid dominates perps through execution quality, spot trading is driven by network effects: listings, liquidity depth, and user habits. The early data shows Hyperliquid's focus on fewer pairs with superior execution, positioning for the inevitable shift toward onchain settlement."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Binance vs Hyperliquid Spot Volume (Weekly)"
              data={BINANCE_HYPERLIQUID_SPOT_DATA as any}
              dataConfig={SPOT_PERCENT_CONFIG as any}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
              chartHeight={360}
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 4: DEX comparison - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="Orderbook vs AMM"
            description="The battle for onchain spot volume showcases two competing paradigms: AMM simplicity versus orderbook precision. While Uniswap, Raydium, and PancakeSwap rely on automated market making, Hyperliquid brings professional-grade execution to decentralized settlement. The question isn't whether DEXs will capture market share, but which execution model wins institutional adoption."
          />
          <div className="col-span-2">
            {spotDEXSeries && spotDEXSeries.length > 0 ? (
              <Chart
                title="Spot DEX Volume (Daily)"
                data={spotDEXSeries as any}
                dataConfig={SPOT_VOLUME_BY_SYMBOL_CONFIG as any}
                valueFormat={VALUE_FORMAT.currency}
                isTimeSeries
                chartHeight={360}
                hidePoweredBy
              />
            ) : (
              <div className="w-full h-[360px] flex items-center justify-center text-muted-foreground">
                Unable to load spot DEX data right now.
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>

      {/* Layer 3: Infrastructure Scale */}
      <div id="layer-3-infrastructure" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Layer 3: Infrastructure Scale"
            description="The infrastructure layer transforms Hyperliquid from exchange to financial operating system. HyperEVM enables composable applications while maintaining the performance of native execution. This architectural foundation supports the next generation of financial innovation."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 5: TVL Breakdown - Centered text */}
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="TVL Breakdown: The Capital Stack"
            description="Total Value Locked tells the story of capital formation. HLP (Hyperliquid Liquidity Provider) tokens represent the core perps market making pool, the engine room of the exchange. Spot TVL captures the settlement layer where traders park collateral. Apps TVL shows nascent but growing ecosystem activity. This isn't just about size; it's about composition. A healthy exchange needs all three layers firing, with HLP providing the liquidity backbone that makes everything else possible."
            textAlignment="center"
          />
          <div className="w-full max-w-[1000px]">
            <Chart
              title="TVL Breakdown (Stacked)"
              data={TVL_STACKED}
              dataConfig={TVL_STACKED_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={375}
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 6: HyperUnit Flows - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="Capital Flows: The Liquidity Magnet"
            description="Token net inflows reveal Hyperliquid's role as crypto's central clearing house. When traders deposit diverse assets, from SOL and BONK to emerging meme coins, they're signaling conviction in the platform's execution and custody capabilities. The diversity of inflows demonstrates evolution from Bitcoin-focused to multi-chain liquidity hub."
          />
          <div className="col-span-2">
            <Chart
              title="HyperUnit Token Net Inflows"
              data={HYPERLIQUID_INCLUDES_HYPERUNIT_DATA as any}
              dataConfig={HYPERLIQUID_INCLUDES_HYPERUNIT_CONFIG as any}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={400}
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 7: HyperEVM Stablecoins - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="HyperEVM Stablecoin Ecosystem"
              description="HyperEVM's stablecoin supply growth reveals the platform's evolution from trading venue to financial infrastructure. Each token represents a different use case: USDC for institutional flows, USDT for retail adoption, and emerging alternatives for specific verticals. The stacked growth pattern shows not just adoption, but diversification, a sign of a maturing ecosystem. As more stablecoins migrate onchain, HyperEVM becomes the settlement layer for a new generation of financial applications."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="HyperEVM Stablecoin Balances"
              data={HYPEREVM_STABLECOIN_STACKED as any}
              dataConfig={HYPEREVM_STABLECOIN_STACKED_CONFIG as any}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={360}
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 8: USDC TVL - Centered text */}
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="USDC: The Stability Anchor"
            description="USDC TVL growth reflects institutional adoption patterns. Unlike volatile crypto assets, stablecoin deposits signal serious intent: traders and institutions parking working capital for systematic strategies. The steady upward trend shows Hyperliquid earning trust as a custody solution, not just a trading venue. Each plateau represents consolidation; each growth spurt shows new capital allocation decisions. This is the foundation upon which everything else is built."
            textAlignment="center"
          />
          <div className="w-full max-w-[1000px]">
            <Chart
              title="Hyperliquid USDC TVL"
              data={HYPERLIQUID_USDC_TVL_DATA as any}
              dataConfig={HYPERLIQUID_USDC_TVL_CONFIG as any}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={400}
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 9: HyperUnit Total TVL - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="HyperUnit Total TVL: The Full Picture"
              description="The combined TVL across all HyperUnit assets tells the complete capital formation story. This isn't just about individual tokens, but about the platform's role in the broader crypto capital stack. Growth phases correlate with market cycles, but the underlying trend shows sticky capital finding a permanent home. As DeFi matures, platforms like HyperUnit become the infrastructure layer where serious money parks for serious strategies. The total is greater than the sum of its parts."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="HyperUnit Total TVL"
              data={HYPERUNIT_TVL_DATA as any}
              dataConfig={HYPERUNIT_TVL_CONFIG as any}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={400}
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>

 
      
    </div>
  )
}
