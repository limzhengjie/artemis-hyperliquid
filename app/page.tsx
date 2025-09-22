import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'



import { getCurrentDate, getStartDate } from '@/lib/dates'

import { fetchHyperliquidPerpVolume, fetchPerpVolumeByVenue, fetchAllSpotDEXVolume, fetchOpenInterestByVenue } from '@/lib/fetchHyperliquidData'
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
  )

  const hyperliquidPerpVolume1YearData = await fetchHyperliquidPerpVolume(
    getStartDate(365 * 1 + 10) as string, // 10 days to buffer extra days to ensure we have data for the last 365 days
    endDate as string
  )

  // Map Hype-only keyed rows -> { date, value } series for sparkline/tiles
  const hyperliquidPerpVolume2YearDailySeries = (hyperliquidPerpVolume2YearData as Array<Record<string, unknown>>).map(row => ({
    date: row.date as string,
    value: Number((row as Record<string, unknown>).hype ?? (row as Record<string, unknown>).HYPE ?? 0)
  }))
  const hyperliquidPerpVolume1YearSeries = (hyperliquidPerpVolume1YearData as Array<Record<string, unknown>>).map(row => ({
    date: row.date as string,
    value: Number((row as Record<string, unknown>).hype ?? (row as Record<string, unknown>).HYPE ?? 0)
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
  const latestPerpVolumeChange = latestHyperliquidPerpVolumeChange

  const allPerpsVolumeData = await fetchPerpVolumeByVenue(
    getStartDate(365) as string,
    endDate as string
  )

  const allSpotDEXVolumeData = await fetchAllSpotDEXVolume(
    getStartDate(365) as string,
    endDate as string
  )

  const allOpenInterestData = await fetchOpenInterestByVenue(
    getStartDate(365) as string
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
  ;(allPerpsVolumeData || []).forEach((row: Record<string, unknown>) => {
    const v = Number(row.hype || 0)
    if (!isNaN(v)) {
      const wk = getWeekStart(row.date as string)
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

  const OPEN_INTEREST_BY_SYMBOL_CONFIG: ChartConfig = {
    hype: { label: 'Hyperliquid', color: '#00D4AA', type: CHART_TYPES.stacked100, stackId: 'openInterest' },
    drift: { label: 'Drift', color: '#8B5A2B', type: CHART_TYPES.stacked100, stackId: 'openInterest' },
    polymarket: { label: 'Polymarket', color: '#3B82F6', type: CHART_TYPES.stacked100, stackId: 'openInterest' },
    lighter: { label: 'Lighter', color: '#06B6D4', type: CHART_TYPES.stacked100, stackId: 'openInterest' },
    kalshi: { label: 'Kalshi', color: '#0891B2', type: CHART_TYPES.stacked100, stackId: 'openInterest' }
  }

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
  const remapSpotRow = (row: Record<string, unknown>) => ({
    date: row.date as string,
    ray: Number(row.ray ?? row.raydium ?? 0),
    cake: Number(row.cake ?? row.pancakeswap ?? 0),
    hype: Number(row.hype ?? 0),
    orca: Number(row.orca ?? 0),
    uni: Number(row.uni ?? row.uniswap ?? 0)
  })
  const spotDEXSeries = Array.isArray(allSpotDEXVolumeData)
    ? (allSpotDEXVolumeData as Array<{ date: string; [k: string]: number | string }>).map(remapSpotRow)
    : []


  const SPOT_VOLUME_BY_SYMBOL_CONFIG: ChartConfig = {
    ray: { label: 'Raydium', color: '#9945FF', type: CHART_TYPES.stacked100, stackId: 'spot' },
    cake: { label: 'PancakeSwap', color: '#D1884F', type: CHART_TYPES.stacked100, stackId: 'spot' },
    hype: { label: 'Hyperliquid', color: '#00D4AA', type: CHART_TYPES.stacked100, stackId: 'spot' },
    orca: { label: 'Orca', color: '#FFD512', type: CHART_TYPES.stacked100, stackId: 'spot' },
    uni: { label: 'Uniswap', color: '#FF007A', type: CHART_TYPES.stacked100, stackId: 'spot' }
  }

  // Build stacked-only series for the chart (HLP, SPOT, APPS only)
  const TVL_STACKED = (TVL_DATA as Array<Record<string, unknown>>).map(d => ({
    date: d.DATE as string,
    TVL_HLP: Number.isFinite(Number(d.TVL_HLP)) ? Number(d.TVL_HLP) : 0,
    TVL_SPOT: Number.isFinite(Number(d.TVL_SPOT)) ? Number(d.TVL_SPOT) : 0,
    TVL_APPS: Number.isFinite(Number(d.TVL_APPS)) ? Number(d.TVL_APPS) : 0
  }))

  const TVL_STACKED_CONFIG: ChartConfig = {
    TVL_HLP: { label: 'TVL_HLP', color: '#00D4AA', type: CHART_TYPES.bar, stackId: 'tvl' },
    TVL_SPOT: { label: 'TVL_SPOT', color: '#F7BD5F', type: CHART_TYPES.bar, stackId: 'tvl' },
    TVL_APPS: { label: 'TVL_APPS', color: '#5E9EFD', type: CHART_TYPES.bar, stackId: 'tvl' }
  }


  return (
    <div className="w-full pb-16 flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Hero: Thesis + KPI + CTA */}
      <div
        className="w-full flex items-center justify-center pt-20 pb-24"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-2xl">
              <p className="text-[var(--color-hyperliquid-teal-500)] text-sm font-medium tracking-wide font-[family-name:var(--font-geist-mono)] uppercase">
                The Hyperliquid Thesis
              </p>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                DeFi Premier Operating System
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Hyperliquid's gameplan is simple:  
                <p>
                <strong className="text-foreground">
                  Win Perps. Own Spot. Grow Apps.</strong></p>
                <br className="hidden sm:block" />

                The flywheel has already started spinning: Ready to see the evidence?
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="#layer-1-derivatives">
                  <Button variant="cta" size="lg">See the data</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg">
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
        <div className="w-full flex items-center justify-center gap-3 py-8">
          <ArtemisLogo poweredBy />
        </div>
      </ContentWrapper>

      {/* Table of Contents */}
      <ContentWrapper>
        <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 border border-[var(--color-background-light-outline)] rounded-xl px-6 py-6 mb-8">
          <div className="text-sm text-muted-foreground font-medium">On this page</div>
          <div className="flex flex-wrap justify-center lg:justify-end gap-3">
            <Link href="#layer-1-derivatives"><Button variant="ghost" size="sm" className="font-medium">Perps: Execution</Button></Link>
            <Link href="#layer-2-spot"><Button variant="ghost" size="sm" className="font-medium">Spot: Unified Settlement</Button></Link>
            <Link href="#layer-3-infrastructure"><Button variant="ghost" size="sm" className="font-medium">HyperEVM: Monetizing Liquidity</Button></Link>
          </div>
        </div>
      </ContentWrapper>

      {/* Layer 1: Derivatives Dominance */}
      <div id="layer-1-derivatives" className="pt-16" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-8 mb-16">
          <Blurb
            title="Perps: The Execution Engine"
            description="Perps attract leverage, hedging, and market makers: whoever wins perps wins depth first. On Hyperliquid, orders match on-chain by price then time, and margin/funding/liquidations settle in the same step, so fills are predictable and liquidations don't spiral. That reliability keeps size at the top of the book, spreads stay tight, and HL's perp price becomes the reference. As depth grows, the futures-spot gap tightens and hedging gets cheaper, pulling more collateral on-chain. With perps setting price and absorbing risk, spot flow and new apps can plug directly into that depth."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 1: Binance comparison - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-1">
            <Blurb
              title="The Gravity Well Forms"
              description="HL's share rises because fills are better, not because of incentives. Pros want predictable queueing, tiny slippage on 1–5 bps moves, and liquidations that clear instantly on-chain (not via slow keepers). HLP helps stabilize books during spikes, so fills and liquidation slippage stay orderly. An uptick here basically says market makers prefer HL's on-chain engine and risk model over CEX/AMM setups."
            />
          </div>
          <div className="lg:col-span-2">
            <Chart
              title="Binance vs Hyperliquid Perp Volume (Weekly)"
              data={[...PERP_VOLUME_BINANCE_HYPERLIQUID_DATA]}
              dataConfig={PERP_VOLUME_BINANCE_HYPERLIQUID_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
              chartHeight={380}
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 2: Asset diversification - Full width with centered text */}
      <ContentWrapper className="max-w-none px-4 sm:px-8 lg:px-16 xl:px-32">
        <div className="w-full flex flex-col items-center gap-8 mb-12">
          <Blurb
            title="Perp DEX Volume by Venue — why Hyperliquid dominates"
            description="The perp landscape is consolidating into Hyperliquid because execution and risk are better where it matters. Early players like dYdX and GMX built solid businesses, but Hyperliquid's on-chain price-time order book + deterministic liquidations keep top-of-book thick and spreads tight when others thin out. HLP standardizes market-making/liquidation flow, so books stay supported in volatility."
            textAlignment="center"
          />
        </div>
        <div className="mb-20">
          {allPerpsVolumeData && allPerpsVolumeData.length > 0 ? (
            <Chart
              title="Perp DEX Volume by Venue — why Hyperliquid dominates"
              data={allPerpsVolumeData}
              dataConfig={PERP_VOLUME_BY_SYMBOL_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
              bare
              chartHeight={500}
              hidePoweredBy
            />
          ) : (
            <div className="w-full h-[500px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-border">
              Unable to load data right now.
            </div>
          )}
        </div>
      </ContentWrapper>

      {/* Chart 3: Open Interest by Protocol - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-2 lg:order-1">
            <Chart
              title="Open Interest by Protocol"
              data={[...allOpenInterestData]}
              dataConfig={OPEN_INTEREST_BY_SYMBOL_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={380}
              hidePoweredBy
            />
          </div>
          <div className="lg:col-span-1 lg:order-2">
            <Blurb
              title="Open Interest by Protocol"
              description="Open interest shows where traders warehouse risk, so price discovery happens here. Rising HL OI means confidence and stickiness."
            />
          </div>
        </div>
      </ContentWrapper>

      {/* Layer 2: Spot Settlement */}
      <div id="layer-2-spot" className="pt-16" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-8 mb-16">
          <Blurb
            title="Spot: Unified Settlement & Collateral"
            description="Spot is how we own settlement. With spot orderbooks and perps on the same stack, collateral and PnL move instantly without bridges or fragmentation. Basis compresses, hedges get cheaper, and every dollar does double duty. Native USD rails make working capital sticky, turning trading flow into durable liquidity. As more markets go on-chain, this unified model becomes the default."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 4: Binance vs HL Spot - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-2 lg:order-1">
            <Chart
              title="Binance vs Hyperliquid Spot Volume (Weekly)"
              data={[...BINANCE_HYPERLIQUID_SPOT_DATA]}
              dataConfig={SPOT_PERCENT_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
              chartHeight={380}
              hidePoweredBy
            />
          </div>
          <div className="lg:col-span-1 lg:order-2">
            <Blurb
              title="The Capital Efficiency Play"
              description="Spot markets are tougher than perps. Binance has massive network effects: more pairs, more volume, more habit. But Hyperliquid is making a different bet. Instead of trying to match Binance's breadth, they're focusing on depth and execution quality. Hyperliquid converts perps flow → spot turnover on the same stack. As traders hedge and settle inside HL, share ticks up on core pairs first"
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 5: DEX comparison - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-1">
            <Blurb
              title="The Execution Model Wars"
              description="The battle for onchain spot volume comes down to a simple choice: do you want easy or do you want good? AMMs like Uniswap made trading accessible to everyone, but they're not built for size. Professional traders need better execution, tighter spreads, deeper liquidity. Hyperliquid brings traditional orderbook precision to onchain settlement. As more institutional money moves onchain, execution quality becomes the deciding factor: one that Hyperliquid is primed to win."
            />
          </div>
          <div className="lg:col-span-2">
            {spotDEXSeries && spotDEXSeries.length > 0 ? (
              <Chart
                title="Spot DEX Volume (Daily)"
                data={spotDEXSeries}
                dataConfig={SPOT_VOLUME_BY_SYMBOL_CONFIG}
                valueFormat={VALUE_FORMAT.currency}
                isTimeSeries
                chartHeight={380}
                hidePoweredBy
              />
            ) : (
              <div className="w-full h-[380px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-border">
                Unable to load spot DEX data right now.
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>

      {/* Layer 3: Infrastructure Scale */}
      <div id="layer-3-infrastructure" className="pt-16" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-8 mb-16">
          <Blurb
            title="HyperEVM: Apps that Monetize Liquidity"
            description="This is where things get really interesting. HyperEVM isn't just another smart contract platform. It plugs straight into Hyperliquid’s execution layer so apps can borrow, stake, and hedge against the same liquidity that powers perps and spot. Each new app increases return on capital, which attracts more deposits, which deepens the books."
            textAlignment="center"
          />
      </div>
      </ContentWrapper>
      
      {/* Chart 6: TVL Breakdown - Centered text */}
      <ContentWrapper>
        <div className="flex flex-col gap-12 items-center mb-20">
          <Blurb
            title="The Three-Layer Capital Stack"
            description="The TVL breakdown shows the flywheel in balance. HLP is the market-making engine that keeps perps tight. Spot TVL is working capital parked for basis/hedging. Apps TVL turns idle dollars into lending, staking, and basis yield. More HLP → better execution → more spot turnover → more collateral for apps → More HLP "
            textAlignment="center"
          />
          <div className="w-full max-w-5xl">
            <Chart
              title="TVL Breakdown (Stacked)"
              data={[...TVL_STACKED]}
              dataConfig={TVL_STACKED_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={400}
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 7: HyperEVM Stablecoins - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-2 lg:order-1">
            <Chart
              title="HyperEVM Stablecoin Balances"
              data={[...HYPEREVM_STABLECOIN_STACKED]}
              dataConfig={HYPEREVM_STABLECOIN_STACKED_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={380}
              hidePoweredBy
            />
          </div>
          <div className="lg:col-span-1 lg:order-2">
            <Blurb
              title="The Stablecoin Settlement Layer"
              description="Think of this as the pulse of DeFi on HYPE.Stablecoins are the system’s cash and margin. On HyperEVM, a mix of USDC/USDT (clean rails), over-collateralized/synthetic dollars (USDe, feUSD, USDH, etc.), and yield-bearing dollars (e.g., T-bill tokens) sits right next to perps and spot. Funds rotate in one stack—wallet → money markets → perps/spot—so LSDFi loops (stake LST/kHYPE → borrow USD → hedge) run natively. As these balances grow, basis tightens, hedge costs fall, and each dollar does more work."
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 8: USDC TVL - Centered text */}
      <ContentWrapper>
        <div className="flex flex-col gap-12 items-center mb-20">
          <Blurb
            title="The Main Capital Indicator"
            description="USDC TVL is the clean signal. Traders, LPs, and builders all need dollar rails to participate. Rising USDC on Hyperliquid means increased base liquidity to fund perps margin, settle spot, and underwrite HyperEVM credit."
            textAlignment="center"
          />
          <div className="w-full max-w-5xl">
            <Chart
              title="Hyperliquid USDC TVL"
              data={[...HYPERLIQUID_USDC_TVL_DATA]}
              dataConfig={HYPERLIQUID_USDC_TVL_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={420}
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 9: USDC Flows - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-1">
            <Blurb
              title="The Capital Flow Pulse"
              description="Daily net flows are the heartbeat of the stack. Sustained positive streaks often line up with listings, funding dislocations, or new app releases. Quick outflows after events are healthy too, it means people are taking profits as well. The point is that real money can enter, rotate, and redeploy inside the same venue."
            />
          </div>
          <div className="lg:col-span-2">
            <Chart
              title="Hyperliquid USDC Net Flows (Daily)"
              data={[...HYPERLIQUID_USDC_FLOWS_DATA]}
              dataConfig={HYPERLIQUID_USDC_FLOWS_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={420}
              hidePoweredBy
              yAxisDomainToMax={true}
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 10: HyperUnit Total TVL - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-2 lg:order-1">
            <Chart
              title="HyperUnit Total TVL"
              data={[...HYPERUNIT_TVL_DATA]}
              dataConfig={HYPERUNIT_TVL_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={420}
              hidePoweredBy
            />
          </div>
          <div className="lg:col-span-1 lg:order-2">
            <Blurb
              title="HyperUnit: Total Capital Capture"
              description="HyperUnit TVL is the import meter, marking how much outside capital chooses to live on Hyperliquid. When it rises, collateral sits next to the perps engine and spot books, cutting frictions and lifting turnover. This is Own Spot → Grow Apps in one number: more imports → deeper books → larger credit/yield capacity for apps"
            />
          </div>
        </div>
      </ContentWrapper>
      
      {/* Chart 11: Capital Flows - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-1">
            <Blurb
              title="HyperUnit: The Multi-Asset Gravity Well"
              description="Token-level inflows show breadth of collateral. BTC/ETH whales opting into one-stack settlement means Hyperliquid is trusted to handle spot settlement with precision rivaling the best CEXes."
            />
          </div>
          <div className="lg:col-span-2">
            <Chart
              title="HyperUnit Token Net Inflows"
              data={[...HYPERLIQUID_INCLUDES_HYPERUNIT_DATA]}
              dataConfig={HYPERLIQUID_INCLUDES_HYPERUNIT_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={420}
              hidePoweredBy
              yAxisDomainToMax={true}
            />
            </div>
          </div>
        </ContentWrapper>

      {/* Conclusion */}
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-10 pt-16 pb-8">
          <Blurb
            title="The Flywheel is Spinning"
            description="Win Perps. Own Spot. Grow Apps. One stack handles execution, settlement, and utility. Perps depth pulls flow; that flow anchors USD collateral; anchored collateral powers apps that create hedging and leverage demand—feeding back into perps. Hyperliquid being a simple perp dex is a fundamental misuderstanding of the platform: In reality it’s a financial operating system where every layer amplifies the next. The data shows the flywheel is already spinning. The question isn't whether it will continue: it's how fast it will accelerate."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
    </div>
  )
}
