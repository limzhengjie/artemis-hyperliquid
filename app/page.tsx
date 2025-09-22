import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'

 

import { getCurrentDate, getStartDate } from '@/lib/dates'

import { fetchHyperliquidPerpVolume, fetchPerpVolumeByVenue, fetchAllSpotDEXVolume } from '@/lib/fetchHyperliquidData'
import { BINANCE_HYPERLIQUID_SPOT_DATA, BINANCE_PERP_WEEKLY } from '@/constants/data/binance-hyperliquid'
import { HYPERLIQUID_INCLUDES_HYPERUNIT_DATA, HYPERLIQUID_INCLUDES_HYPERUNIT_CONFIG } from '@/constants/data/hyperunit-flows'
import { HYPERLIQUID_USDC_TVL_DATA, HYPERLIQUID_USDC_TVL_CONFIG } from '@/constants/data/hyperliquid-usdc-tvl'
import { HYPERLIQUID_USDC_FLOWS_DATA, HYPERLIQUID_USDC_FLOWS_CONFIG } from '@/constants/data/hyperliquid-usdc-flows'
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
    Binance: { label: 'Binance Perps', color: '#FF8C00', type: CHART_TYPES.stacked100, stackId: 'perpsBH' }
  } as const

  const SPOT_PERCENT_CONFIG = {
    Hyperliquid: { label: 'Hyperliquid', color: '#00D4AA', type: CHART_TYPES.stacked100, stackId: 'spot' },
    Binance: { label: 'Binance', color: '#FF8C00', type: CHART_TYPES.stacked100, stackId: 'spot' }
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
    Binance: { label: 'Binance', color: '#FF8C00', type: CHART_TYPES.bar, stackId: 'spot' },
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
                DeFi's Premier Operating System
              </h1>
              <p className="text-muted-foreground max-w-2xl">
              Hyperliquid isn’t just another chain. It begins with the fastest, most liquid perp markets in crypto, layers on unified spot settlement, and opens the door to a full stack of financial applications built directly on top. Each layer amplifies the next, creating a self-reinforcing system where capital flows in, finds deep liquidity, and sticks around.

              </p>
              <div className="flex flex-wrap items-center gap-3">
                
                <Link href="#layer-1-derivatives">
                  <Button variant="cta">See the data</Button>
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
            <Link href="#layer-1-derivatives"><Button variant="ghost" size="sm">Layer 1: Liquidity Gravity</Button></Link>
            <Link href="#layer-2-spot"><Button variant="ghost" size="sm">Layer 2: Capital Efficiency</Button></Link>
            <Link href="#layer-3-infrastructure"><Button variant="ghost" size="sm">Layer 3: Ecosystem Scale</Button></Link>
          </div>
        </div>
      </ContentWrapper>

      {/* Layer 1: Derivatives Dominance */}
      <div id="layer-1-derivatives" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Layer 1: Liquidity Gravity"
            description="Perpetual futures are where Hyperliquid first proved its edge. Better execution brings more traders. More traders create deeper liquidity. Deeper liquidity enables even better execution. It's a simple flywheel that becomes incredibly powerful over time. What started as gradual market share gains is now looking like something much bigger: a fundamental shift in where serious traders choose to execute."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 1: Binance comparison - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="The Gravity Well Forms"
            description="Every percentage point of market share that Hyperliquid takes from Binance represents billions in trading volume making a choice. Sophisticated traders are picking execution quality over brand recognition. They're choosing transparent orderbooks over black box matching. Once you've experienced the difference, it's hard to go back. This looks less like temporary disruption and more like permanent migration."
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
            title="Liquidity Consolidation Accelerates"
            description="The perp landscape is consolidating fast. Early players like dYdX and GMX built solid businesses, but Hyperliquid is redefining what's possible. The numbers tell the story: this is more than just another exchange gaining share. It's capital flowing toward the venue that consistently delivers the best execution. When billions of dollars are on the line, small execution improvements compound into massive advantages."
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
            title="Layer 2: Capital Efficiency"
            description="Spot trading is where Hyperliquid's unified architecture really shines. When you can move seamlessly between perps and spot within the same venue, your capital works harder. No more bridging between exchanges. No more fragmented liquidity. It's not just convenient - it's a completely different way to think about trading. As more of finance moves onchain, this unified approach becomes table stakes."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 3: Binance vs HL Spot - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
            title="The Capital Efficiency Play"
            description="Spot markets are tougher than perps. Binance has massive network effects: more pairs, more volume, more habit. But Hyperliquid is making a different bet. Instead of trying to match Binance's breadth, they're focusing on depth and execution quality. For traders who need to move between spot and derivatives quickly, the unified architecture is a game changer. It's early, but the signs are promising."
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
            title="The Execution Model Wars"
            description="The battle for onchain spot volume comes down to a simple choice: do you want easy or do you want good? AMMs like Uniswap made trading accessible to everyone, but they're not built for size. Professional traders need better execution, tighter spreads, deeper liquidity. Hyperliquid brings traditional orderbook precision to onchain settlement. As more institutional money moves onchain, execution quality becomes the deciding factor."
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
            title="Layer 3: Ecosystem Scale"
            description="This is where things get really interesting. HyperEVM isn't just another smart contract platform. It's built specifically for financial applications that need the performance and liquidity of Hyperliquid's core exchange. Every new app that launches makes the underlying platform more valuable. More apps attract more users. More users create more liquidity. More liquidity attracts more apps. The flywheel is just getting started."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 5: TVL Breakdown - Centered text */}
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="The Three-Layer Capital Stack"
            description="The TVL breakdown tells the whole story. HLP tokens are the engine room - the market making pool that powers the perp exchange. Spot TVL is working capital parked for cross-market opportunities. Apps TVL shows the ecosystem building on top. What's beautiful is how they all reinforce each other. Better HLP liquidity improves spot execution. Better spot execution attracts more applications. More applications bring more HLP deposits. It's a three-layer flywheel that's just hitting its stride."
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
      
      {/* Chart 6: HyperEVM Stablecoins - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="The Stablecoin Settlement Layer"
              description="HyperEVM's stablecoin growth shows something bigger happening. USDC flows in for institutional strategies. USDT brings retail volume. New stablecoins find their home here for specialized use cases. It's not just about having multiple tokens - it's about becoming the place where stablecoins naturally settle. As digital dollars become the backbone of crypto, the platform that handles their settlement becomes incredibly powerful."
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
      
      {/* Chart 7: USDC TVL - Centered text */}
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="The Institutional Capital Magnet"
            description="Whether you’re a trader, LP, or builder, you need USDC to participate. That’s why rising USDC TVL isn’t market noise; it’s the base liquidity fueling perps, spot, and the entire Hyperliquid ecosystem."
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
      
      {/* Chart 8: USDC Flows - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="The Capital Flow Pulse"
            description="The daily USDC flows are fascinating to watch. Massive inflows when opportunities arise. Quick outflows when risks spike. This isn't random: billions moving in and out based on market conditions shows that Hyperliquid has become the place where serious money makes serious decisions. The volatility isn't chaos, it's efficiency."
          />
          <div className="col-span-2">
            <Chart
              title="Hyperliquid USDC Net Flows (Daily)"
              data={HYPERLIQUID_USDC_FLOWS_DATA as any}
              dataConfig={HYPERLIQUID_USDC_FLOWS_CONFIG as any}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={400}
              hidePoweredBy
              yAxisDomainToMax={true}
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 9: HyperUnit Total TVL - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="HyperUnit: Total Capital Capture"
              description="HyperUnit's total TVL shows the full picture of multi-asset adoption. Every token that gets deposited is essentially a vote of confidence in the unified architecture. Market cycles create ups and downs, but the trend is clear: capital is finding its home here. As crypto matures, money flows toward the platforms that offer the best combination of execution, efficiency, and ecosystem depth. HyperUnit is becoming that destination."
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
      
      {/* Chart 10: Capital Flows - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="HyperUnit: The Multi-Asset Gravity Well"
            description="The diversity of tokens flowing into HyperUnit tells an interesting story.  Whales selling off their BTC, or BONK from retail traders. Each deposit represents someone choosing unified architecture over the fragmented mess of bridges and multiple exchanges. It's early, but the pattern is clear: as more assets get support, more capital follows."
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
              yAxisDomainToMax={true}
            />
          </div>
        </div>
      </ContentWrapper>

      {/* Conclusion */}
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6 pt-8">
          <Blurb
            title="The Flywheel is Spinning"
            description="Three layers. One unified system. Each making the others stronger. Hyperliquid started with the best perp trading experience and used that to attract serious capital. That capital enabled unified spot settlement, which attracted more capital and more sophisticated use cases. Now the ecosystem layer is emerging, and each new application makes the entire platform more valuable. This is not a simple  exchange or blockchain. It's a financial operating system where every component amplifies the others. The data shows the flywheel is already spinning. The question isn't whether it will continue: it's how fast it will accelerate."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
    </div>
  )
}
