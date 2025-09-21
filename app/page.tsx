import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'

import { QUOTES } from '@/constants/quotes'
import { DATA_PARTNERS } from '@/constants/data-partners'

import { getCurrentDate, getStartDate } from '@/lib/dates'

import { fetchHyperliquidPerpVolume, fetchAllPerpsVolume, fetchPerpVolumeByVenue } from '@/lib/fetchStablecoinsData'
import { BINANCE_HYPERLIQUID_SPOT_DATA, BINANCE_PERP_WEEKLY } from '@/constants/data/binance-hyperliquid'
import { TVL_DATA } from '@/constants/data/overview'

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
import BlurbHero from '@/components/blurb-hero'

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

  // Fetch symbol breakdown for stacked-percent chart in hero
  const hyperliquidPerpVolumeData = await fetchHyperliquidPerpVolume(
    getStartDate(365) as string,
    endDate as string
  )

  const allPerpsVolumeData = await fetchPerpVolumeByVenue(
    getStartDate(365) as string,
    endDate as string
  )

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

  const ALL_PERPS_CONFIG: ChartConfig = {
    value: { label: 'All Perps Volume', color: '#5E9EFD', type: CHART_TYPES.line }
  }

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
      <div
        className="w-full flex items-center justify-center gap-12 pt-12 pb-12"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-8">
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
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <div className="w-full flex items-center justify-center gap-3 py-2">
          <ArtemisLogo poweredBy />
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

      <div id="binance-hyperliquid" />
      <ContentWrapper>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-6 items-center">
          <Blurb
            title="Binance vs Hyperliquid Spot Volume (Weekly)"
            description="Stacked share view comparing Binance vs Hyperliquid spot volume by week."
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

     

      <div id="stablecoin-payments-by-type" />
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="Hyperliquid TVL (Daily)"
            description="Daily TVL for Hyperliquid (and total chain apps) showing growth from late 2024 into 2025."
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

      <div
        className="w-full flex items-center justify-center gap-12 pt-18 pb-18"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <Quotes quotes={QUOTES} />
        </ContentWrapper>
      </div>

      <div id="stablecoin-volume-by-blockchain" />
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Top Blockchains Used for Stablecoin Transactions in 2024"
              description="The most popular blockchains employed to settle customer flows, as a share of value sent, were Tron, followed by Ethereum, Polygon (Ethereum L2), and Binance Smart Chain. This mirrors survey findings from our 2024 report which found that users preferentially used those same five blockchains, albeit with Ethereum being the most popular network."
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

      <div id="stablecoin-payments-by-token" />
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="The Most Used Stablecoins for Global Transactions"
            description="Tether's USDT was by far the most popular stablecoin used to settle flows for firms in the study. We explore the breakdown of USDT versus Circle's USDC on a country-by-country basis later in the report."
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

      <div id="percent-of-stablecoin-flows-by-country" />
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Which Countries Send the Most Stablecoins?"
              description="Based on the geographic data provided by firms for the study, combined with additional geographic attribution estimates obtained by looking at IP addresses and timezones of on-chain entities as their transactions reach blockchain nodes, we were able to identify countries originating the bulk of stablecoin transactions. The USA, Singapore, Hong Kong, Japan, and the UK were the top stablecoin sending countries."
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

      <div
        className="w-full flex items-center justify-center pt-24 pb-24"
        style={{ background: 'var(--gradient-background-download)' }}
      >
        <ContentWrapper>
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
