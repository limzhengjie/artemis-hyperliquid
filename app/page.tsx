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
            <Link href="#appendix"><Button variant="ghost" size="sm">Appendix</Button></Link>
          </div>
        </div>
      </ContentWrapper>

      {/* Level 1: Perps */}
      <div id="level-1-perps" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Level 1: Perps"
            description="Placeholder: Perps are the heartbeat of Hyperliquid. Depth, spreads, and venue share demonstrate durable leadership across market cycles."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      <ContentWrapper className="max-w-none px-4 md:px-8">
        <div className="w-full flex flex-col items-center gap-6 mb-4">
          <Blurb
            title="Perp Volume Share by Assets"
            description="Daily percentage share of perp volume across supported assets."
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
      <ContentWrapper>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-6 items-center">
          <Blurb
            title="Binance vs Hyperliquid Perp Volume (Weekly)"
            description="Stacked share view comparing Binance vs Hyperliquid perp volume by week (HL aggregated from daily)."
            textAlignment="center"
          />
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
      </ContentWrapper>

      {/* Level 2: Spot */}
      <div id="level-2-spot" />
      <ContentWrapper>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-6 items-center">
          <Blurb
            title="Level 2: Spot"
            description="Placeholder: Spot is the settlement layer for liquidity to orbit. We track share against centralized and decentralized venues as flows migrate onchain."
            textAlignment="center"
          />
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
      </ContentWrapper>
      <ContentWrapper>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-6 items-center">
          <Blurb
            title="Spot DEX Volume (Daily)"
            description="Daily spot volume for DEXs."
            textAlignment="center"
          />
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
      </ContentWrapper>

      {/* Level 3: Hypercore + HyperEVM */}
      <div id="level-3-hypercore" />
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="Level 3: Hypercore + HyperEVM"
            description="Placeholder: Hypercore powers intent settlement; HyperEVM scales application liquidity. Together they anchor TVL growth and token flows across the stack."
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
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="HyperEVM Stablecoin Balances (Daily)"
            description="Total supply of stablecoins issued on HyperEVM, broken out by token."
            textAlignment="center"
          />
          <div className="w-full max-w-[1000px]">
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
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="HyperUnit Token Net Inflows (Daily)"
            description="Daily net inflows across SOL, FART, PUMP, SPX, BONK, ETH, BTC, and USDC. Positive values indicate net deposits; negatives indicate withdrawals."
            textAlignment="center"
          />
          <div className="w-full max-w-[1000px]">
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
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="Hyperliquid USDC TVL (Weekly)"
            description="Weekly USDC deposits held on-platform, aggregated by week."
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
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="HyperUnit Total TVL (Weekly)"
            description="Combined TVL across all assets on HyperUnit over time."
            textAlignment="center"
          />
          <div className="w-full max-w-[1000px]">
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

      {/* Social proof */}
      <div
        className="w-full flex items-center justify-center gap-12 pt-18 pb-18"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <Quotes quotes={QUOTES} />
        </ContentWrapper>
      </div>

      {/* Download CTA */}
      <div
        className="w-full flex items-center justify-center pt-24 pb-24"
        style={{ background: 'var(--gradient-background-download)' }}
      >
        <ContentWrapper id="download-report">
          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            <div
              className="absolute left-0 top-1/2 -translate-x-1/2"
              style={{
                width: '508px',
                height: '2px',
                background:
                  'linear-gradient(180deg, #5E4EB5 0%, rgba(255, 255, 255, 0) 100%)',
                transform: 'rotate(90deg)',
                opacity: 0.1
              }}
            />
            <div
              className="absolute right-0 top-1/2 translate-x-1/2"
              style={{
                width: '508px',
                height: '2px',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #5E4EB5 100%)',
                transform: 'rotate(90deg)',
                opacity: 0.1
              }}
            />
            <Image
              src={ReportImage}
              alt="Report Download"
              width={555}
              height={100}
            />
            <div className="flex flex-col gap-8">
              <p className="text-[var(--color-pluto-purple-500)] text-sm font-medium font-[family-name:var(--font-geist-mono)]">
                2025 REPORT
              </p>
              <Blurb
                title="Get a Copy of Our Report Here"
                description="Discover the latest stablecoin trends, data, and insights shaping 2025. Download your copy today."
                textAlignment="left"
              />
              <DownloadReportForm disableForm />
            </div>
          </div>
        </ContentWrapper>
      </div>

      {/* Appendix */}
      <div id="appendix" />
      <ContentWrapper>
        <div className="w-full flex flex-col items-center gap-6">
          <Blurb
            title="Appendix: Stablecoin Context"
            description="Background readings on broader stablecoin flows to contextualize Hyperliquid’s growth."
            textAlignment="center"
          />
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Top Blockchains Used for Stablecoin Transactions in 2024"
              description="The most popular blockchains by share of value sent: Tron, Ethereum, Polygon (L2), and BSC."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Stablecoin Volume by Blockchain"
              data={STABLECOIN_VOLUME_BY_CHAIN_DATA}
              dataConfig={STABLECOIN_VOLUME_BY_CHAIN_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
            />
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="The Most Used Stablecoins for Global Transactions"
            description="USDT dominates global settlement volumes, followed by USDC."
          />
          <div className="col-span-2">
            <Chart
              title="Stablecoin Payments by Token"
              data={STABLECOIN_VOLUME_BY_CURRENCY_DATA}
              dataConfig={STABLECOIN_VOLUME_BY_CURRENCY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
            />
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Which Countries Send the Most Stablecoins?"
              description="Geographic breakdown of stablecoin originators across the US, Singapore, Hong Kong, Japan, the UK and more."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Percent of Stablecoin Flows by Country"
              data={STABLECOIN_FLOWS_BY_COUNTRY_DATA}
              dataConfig={STABLECOIN_FLOWS_BY_COUNTRY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hideLegend
            />
          </div>
        </div>
      </ContentWrapper>

      {/* Partners */}
      <ContentWrapper>
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-4xl font-bold">Artemis Data Partners</p>
          <p className="text-muted-foreground">
            Join us to define the stablecoin data standard of the future
          </p>
          <LogoGrid dataPartners={DATA_PARTNERS} />
          <Link
            href="https://ry0v9n8oa4l.typeform.com/to/pibk76PA"
            target="_blank"
          >
            <Button variant="cta" className="mt-3">
              Join Us
            </Button>
          </Link>
        </div>
      </ContentWrapper>
    </div>
  )
}
