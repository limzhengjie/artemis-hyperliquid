import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'

import { QUOTES } from '@/constants/quotes'
import { DATA_PARTNERS } from '@/constants/data-partners'

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
import Quotes from '@/components/quotes'
import LogoGrid from '@/components/logo-grid'
import DownloadReportForm from '@/components/download-report'
import ArtemisLogo from '@/components/(layout)/artemis-logo'

import {
  STABLECOIN_VOLUME_BY_CHAIN_DATA,
  STABLECOIN_VOLUME_BY_CHAIN_CONFIG,
  STABLECOIN_VOLUME_BY_CURRENCY_DATA,
  STABLECOIN_VOLUME_BY_CURRENCY_CONFIG,
  STABLECOIN_FLOWS_BY_COUNTRY_DATA,
  STABLECOIN_FLOWS_BY_COUNTRY_CONFIG
} from '@/constants/data/overview'

import ReportImage from '@/public/report.png'
import StatSummaryTile from '@/components/stat-summary-tile'
// Removed unused BlurbHero

export default async function Overview() {
  const endDate = getCurrentDate()

  const hyperliquidPerpVolume2YearData = await fetchHyperliquidPerpVolume(
    getStartDate(365 * 2) as string,
    endDate as string,
    'weekly'
  )

  const hyperliquidPerpVolume1YearData = await fetchHyperliquidPerpVolume(
    getStartDate(365 * 1 + 10) as string, // 10 days to buffer extra days to ensure we have data for the last 365 days
    endDate as string,
    'daily'
  )

  // Map Hype-only keyed rows -> { date, value } series for sparkline/tiles
  const hyperliquidPerpVolume2YearSeries = (hyperliquidPerpVolume2YearData as any[]).map(row => ({
    date: row.date,
    value: Number((row as any).hype ?? (row as any).HYPE ?? 0)
  }))
  const hyperliquidPerpVolume1YearSeries = (hyperliquidPerpVolume1YearData as any[]).map(row => ({
    date: row.date,
    value: Number((row as any).hype ?? (row as any).HYPE ?? 0)
  }))

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
    Hyperliquid: { label: 'Hyperliquid Perps', color: '#EF5350', type: CHART_TYPES.stacked100, stackId: 'perpsBH' },
    Binance: { label: 'Binance Perps', color: '#5E9EFD', type: CHART_TYPES.stacked100, stackId: 'perpsBH' }
  } as const

  const SPOT_PERCENT_CONFIG = {
    Hyperliquid: { label: 'Hyperliquid', color: '#EF5350', type: CHART_TYPES.stacked100, stackId: 'spot' },
    Binance: { label: 'Binance', color: '#5E9EFD', type: CHART_TYPES.stacked100, stackId: 'spot' }
  } as const

  // Removed unused ALL_PERPS_CONFIG

  const PERP_VOLUME_BY_SYMBOL_CONFIG: ChartConfig = {
    aevo: { label: 'Aevo', color: '#8C7CF7', type: CHART_TYPES.stacked100, stackId: 'perps' },
    apex: { label: 'Apex', color: '#70A9FF', type: CHART_TYPES.stacked100, stackId: 'perps' },
    avantis: { label: 'Avantis', color: '#51B495', type: CHART_TYPES.stacked100, stackId: 'perps' },
    blue: { label: 'Bluefin', color: '#F7BD5F', type: CHART_TYPES.stacked100, stackId: 'perps' },
    drift: { label: 'Drift', color: '#FF8A65', type: CHART_TYPES.stacked100, stackId: 'perps' },
    dydx: { label: 'dYdX', color: '#4DB6AC', type: CHART_TYPES.stacked100, stackId: 'perps' },
    gns: { label: 'Gains', color: '#BA68C8', type: CHART_TYPES.stacked100, stackId: 'perps' },
    gmx: { label: 'GMX', color: '#FFD54F', type: CHART_TYPES.stacked100, stackId: 'perps' },
    hold: { label: 'Hold', color: '#90A4AE', type: CHART_TYPES.stacked100, stackId: 'perps' },
    hype: { label: 'Hyperliquid', color: '#EF5350', type: CHART_TYPES.stacked100, stackId: 'perps' },
    jup: { label: 'Jupiter', color: '#66BB6A', type: CHART_TYPES.stacked100, stackId: 'perps' },
    ktc: { label: 'KTX', color: '#26C6DA', type: CHART_TYPES.stacked100, stackId: 'perps' },
    mcb: { label: 'MCB', color: '#D4E157', type: CHART_TYPES.stacked100, stackId: 'perps' },
    perp: { label: 'Perpetual', color: '#9575CD', type: CHART_TYPES.stacked100, stackId: 'perps' },
    vrtx: { label: 'Vertex', color: '#FFB74D', type: CHART_TYPES.stacked100, stackId: 'perps' },
    lighter: { label: 'Lighter', color: '#26A69A', type: CHART_TYPES.stacked100, stackId: 'perps' }
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
    ray: { label: 'Raydium', color: '#8C7CF7', type: CHART_TYPES.stacked100, stackId: 'spot' },
    cake: { label: 'PancakeSwap', color: '#70A9FF', type: CHART_TYPES.stacked100, stackId: 'spot' },
    hype: { label: 'Hyperliquid', color: '#EF5350', type: CHART_TYPES.stacked100, stackId: 'spot' },
    orca: { label: 'Orca', color: '#51B495', type: CHART_TYPES.stacked100, stackId: 'spot' },
    uni: { label: 'Uniswap', color: '#FF8A65', type: CHART_TYPES.stacked100, stackId: 'spot' }
  }

  // Build stacked-only series for the chart (HLP, SPOT, APPS only)
  const TVL_STACKED = (TVL_DATA as any[]).map(d => ({
    date: d.DATE,
    TVL_HLP: Number.isFinite(d.TVL_HLP) ? d.TVL_HLP : 0,
    TVL_SPOT: Number.isFinite(d.TVL_SPOT) ? d.TVL_SPOT : 0,
    TVL_APPS: Number.isFinite(d.TVL_APPS) ? d.TVL_APPS : 0
  }))

  const TVL_STACKED_CONFIG: ChartConfig = {
    TVL_HLP: { label: 'TVL_HLP', color: '#EF5350', type: CHART_TYPES.bar, stackId: 'tvl' },
    TVL_SPOT: { label: 'TVL_SPOT', color: '#F7BD5F', type: CHART_TYPES.bar, stackId: 'tvl' },
    TVL_APPS: { label: 'TVL_APPS', color: '#5E9EFD', type: CHART_TYPES.bar, stackId: 'tvl' }
  }

  const SPOT_VOLUME_BINANCE_HYPERLIQUID_CONFIG: ChartConfig = {
    Binance: { label: 'Binance', color: '#5E9EFD', type: CHART_TYPES.bar, stackId: 'spot' },
    Hyperliquid: { label: 'Hyperliquid', color: '#EF5350', type: CHART_TYPES.bar, stackId: 'spot' }
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
              <p className="text-[var(--color-pluto-purple-500)] text-sm font-medium tracking-wide font-[family-name:var(--font-geist-mono)]">
                The Hyperliquid Thesis
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Hyperliquid is the house of finance
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Hyperliquid unifies perps, spot, and settlement rails into a single
                liquidity fabric. This report lays out the thesis and backs it with data across
                market structure, onchain volumes, and capital formation.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                
                <Link href="#level-1-perps">
                  <Button variant="cta">Explore the data</Button>
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
            <Link href="#level-1-perps"><Button variant="ghost" size="sm">Level 1: Perps</Button></Link>
            <Link href="#level-2-spot"><Button variant="ghost" size="sm">Level 2: Spot</Button></Link>
            <Link href="#level-3-hypercore"><Button variant="ghost" size="sm">Level 3: Hypercore + HyperEVM</Button></Link>
          </div>
        </div>
      </ContentWrapper>

      {/* Level 1: Perps */}
      <div id="level-1-perps" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Level 1: Perps"
            description="Perps are the heartbeat of Hyperliquid. Depth, spreads, and venue share demonstrate durable leadership across market cycles."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 1: Asset breakdown - Full width with centered text */}
      <ContentWrapper className="max-w-none px-8 md:px-32">
        <div className="w-full flex flex-col items-center gap-6 mb-4">
          <Blurb
            title="Perp Volume Share by Assets"
            description="Hyperliquid's asset diversification tells the story of institutional adoption. While Bitcoin and Ethereum maintain their dominance, the long tail of altcoin perps demonstrates sophisticated trader demand. The platform's ability to bootstrap liquidity across 200+ assets speaks to both market-making efficiency and organic user growth. Notice how meme coins and AI tokens surge during narrative cycles, while blue chips provide the stable base load that keeps the engine running."
            textAlignment="center"
          />
        </div>
        {allPerpsVolumeData && allPerpsVolumeData.length > 0 ? (
          <Chart
            title="Perp Volume Share by Assets"
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
      
      {/* Chart 2: Binance comparison - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="Binance vs Hyperliquid Perp Volume"
            description="The David vs Goliath story plays out in weekly volume share. Hyperliquid's climb from single digits to meaningful market share reflects more than just growth—it signals a structural shift. While Binance remains the incumbent, Hyperliquid's transparent orderbook and onchain settlement attract sophisticated flow. The inflection point comes when institutional traders prioritize composability over raw size."
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

      {/* Level 2: Spot */}
      <div id="level-2-spot" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Level 2: Spot"
            description="Spot is the settlement layer for liquidity to orbit. We track share against centralized and decentralized venues as flows migrate onchain."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 3: Binance vs HL Spot - Right-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Binance vs Hyperliquid Spot Volume"
              description="Spot trading reveals the platform's maturation from derivatives-first to full-stack exchange. Unlike perps where Hyperliquid carved out meaningful share, spot remains Binance's fortress. The challenge isn't just liquidity—it's network effects. Retail traders follow where their coins are listed, and institutions need deep books for size. Hyperliquid's spot growth story is about quality over quantity: fewer pairs, better execution, onchain transparency."
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
            title="Spot DEX Volume Landscape"
            description="The DEX wars play out differently than CEX competition. Uniswap's AMM model democratized market making but sacrificed efficiency. Hyperliquid brings orderbook precision to onchain settlement—the best of both worlds. While Raydium rides Solana's momentum and PancakeSwap dominates BSC, Hyperliquid's differentiation lies in professional-grade tools. The question isn't whether DEXs will eat CEX lunch, but which model wins the institutional flow."
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

      {/* Level 3: Hypercore + HyperEVM */}
      <div id="level-3-hypercore" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Level 3: Hypercore + HyperEVM"
            description="Hypercore powers intent settlement; HyperEVM scales application liquidity. Together they anchor TVL growth and token flows across the stack."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      
      {/* Chart 5: TVL Breakdown - Centered text */}
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="TVL Breakdown: The Capital Stack"
            description="Total Value Locked tells the story of capital formation. HLP (Hyperliquid Liquidity Provider) tokens represent the core perps market making pool—the engine room of the exchange. Spot TVL captures the settlement layer where traders park collateral. Apps TVL shows nascent but growing ecosystem activity. This isn't just about size; it's about composition. A healthy exchange needs all three layers firing, with HLP providing the liquidity backbone that makes everything else possible."
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
              title="HyperEVM Stablecoin Ecosystem"
              description="HyperEVM's stablecoin supply growth reveals the platform's evolution from trading venue to financial infrastructure. Each token represents a different use case: USDC for institutional flows, USDT for retail adoption, and emerging alternatives for specific verticals. The stacked growth pattern shows not just adoption, but diversification—a sign of a maturing ecosystem. As more stablecoins migrate onchain, HyperEVM becomes the settlement layer for a new generation of financial applications."
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
      
      {/* Chart 7: HyperUnit Flows - Left-aligned text */}
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="HyperUnit: The Flow Engine"
            description="Token net inflows reveal the platform's role as crypto's central clearing house. When traders deposit SOL, BONK, or meme coins like FART and PUMP, they're not just parking assets—they're signaling conviction. Positive flows during market stress show trust; negative flows during rallies show profit-taking discipline. The diversity of assets flowing through HyperUnit demonstrates its evolution from Bitcoin-focused to multi-chain liquidity hub. Each spike tells a story of narrative, momentum, and trader psychology."
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
      
      {/* Chart 8: USDC TVL - Centered text */}
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="USDC: The Stability Anchor"
            description="USDC TVL growth reflects institutional adoption patterns. Unlike volatile crypto assets, stablecoin deposits signal serious intent—traders and institutions parking working capital for systematic strategies. The steady upward trend shows Hyperliquid earning trust as a custody solution, not just a trading venue. Each plateau represents consolidation; each growth spurt shows new capital allocation decisions. This is the foundation upon which everything else is built."
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
              description="The combined TVL across all HyperUnit assets tells the complete capital formation story. This isn't just about individual tokens—it's about the platform's role in the broader crypto capital stack. Growth phases correlate with market cycles, but the underlying trend shows sticky capital finding a permanent home. As DeFi matures, platforms like HyperUnit become the infrastructure layer where serious money parks for serious strategies. The total is greater than the sum of its parts."
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
