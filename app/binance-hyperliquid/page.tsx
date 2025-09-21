import Chart from '@/components/chart'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Blurb from '@/components/blurb'
import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'
import { BINANCE_HYPERLIQUID_SPOT_DATA, BINANCE_HYPERLIQUID_SPOT_CONFIG, BINANCE_PERP_WEEKLY } from '@/constants/data/binance-hyperliquid'
import { getCurrentDate, getStartDate } from '@/lib/dates'
import { fetchAllPerpsVolume } from '@/lib/fetchStablecoinsData'

const BinanceHyperliquid = async () => {
  const endDate = getCurrentDate()
  const startDate = getStartDate(1000) as string

  // Build perps comparison dataset (Binance from provided weekly series; Hyperliquid from endpoint aggregated weekly)
  const perpsBySymbol = await fetchAllPerpsVolume(
    startDate,
    endDate as string
  )
  // Aggregate Hyperliquid (hype) into weekly buckets matching Monday-based weeks
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
  ;(perpsBySymbol || []).forEach((row: any) => {
    const v = Number(row.hype || 0)
    if (!isNaN(v)) {
      const wk = getWeekStart(row.date)
      weeklyHypeMap[wk] = (weeklyHypeMap[wk] || 0) + v
    }
  })

  let PERP_VOLUME_BINANCE_HYPERLIQUID_DATA = BINANCE_PERP_WEEKLY.map(entry => ({
    date: entry.date as string,
    Binance: Number(entry.Binance),
    Hyperliquid: Number(weeklyHypeMap[entry.date] || 0)
  })) as Array<{ date: string; Binance: number; Hyperliquid: number }>

  // Fallback: if upstream times out or returns empty, fetch Hyperliquid-only perps directly
  if (!PERP_VOLUME_BINANCE_HYPERLIQUID_DATA || PERP_VOLUME_BINANCE_HYPERLIQUID_DATA.length === 0) {
    try {
      const url = `https://data-svc.artemisxyz.com/data/PERP_VOLUME?symbols=hype&startDate=${startDate}&endDate=${endDate}`
      const res = await fetch(url, { cache: 'no-store' })
      if (res.ok) {
        const json = await res.json()
        const series: Array<{ date: string; val: number | null }> = json?.data?.symbols?.hype?.PERP_VOLUME || []
        PERP_VOLUME_BINANCE_HYPERLIQUID_DATA = series.map(p => ({
          date: p.date,
          Binance: 0,
          Hyperliquid: typeof p.val === 'number' ? p.val : 0
        }))
      }
    } catch (e) {
      // ignore; leave as empty to show placeholder
    }
  }

  const PERP_VOLUME_BINANCE_HYPERLIQUID_CONFIG = {
    Hyperliquid: { label: 'Hyperliquid Perps', color: '#EF5350', type: CHART_TYPES.stacked100, stackId: 'perpsBH' },
    Binance: { label: 'Binance Perps', color: '#5E9EFD', type: CHART_TYPES.stacked100, stackId: 'perpsBH' },
  } as const

  // Override spot config locally to stacked percentage (do not change shared constant)
  const SPOT_PERCENT_CONFIG = {
    Hyperliquid: { label: 'Hyperliquid', color: '#EF5350', type: CHART_TYPES.stacked100, stackId: 'spot' },
    Binance: { label: 'Binance', color: '#5E9EFD', type: CHART_TYPES.stacked100, stackId: 'spot' },
  } as const

  return (
    <div className="w-full flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <div className="w-full pt-8 pb-6 flex flex-col items-center">
        <ContentWrapper>
          <Blurb
            title="Binance vs Hyperliquid"
            description="Weekly spot and daily perp volume comparison. Binance dominates spot volume; Hyperliquid shows rapid growth on both spot and perps in 2025."
            textAlignment="left"
            titleAlignment="center"
            descriptionAlignment="left"
            fullWidth
          />
        </ContentWrapper>
      </div>

      <div className="w-full pb-12 flex flex-col items-center gap-12">
        <ContentWrapper>
          <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-4">
            <Blurb
              title="Spot share takeaways"
              description="Binance retains the overwhelming majority of spot volume across the period. Hyperliquid’s share trends upward through 2025 with several pronounced spikes, but remains a minority of total spot activity."
              textAlignment="left"
              titleAlignment="center"
              descriptionAlignment="left"
              fullWidth
            />
            <Chart
              title="Binance vs Hyperliquid Spot Volume (Weekly)"
              data={BINANCE_HYPERLIQUID_SPOT_DATA as any}
              dataConfig={SPOT_PERCENT_CONFIG as any}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
              hidePoweredBy
              chartHeight={360}
            />
          </div>
        </ContentWrapper>

        <ContentWrapper>
          <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-4">
            <Blurb
              title="Perps share takeaways"
              description="Hyperliquid’s perp share appears elevated here while Binance perp data is pending integration. This view currently reflects Hyperliquid-only share; we’ll update once Binance perp volumes are wired in."
              textAlignment="left"
              titleAlignment="center"
              descriptionAlignment="left"
              fullWidth
            />
            {PERP_VOLUME_BINANCE_HYPERLIQUID_DATA && PERP_VOLUME_BINANCE_HYPERLIQUID_DATA.length > 0 ? (
              <Chart
                title="Binance vs Hyperliquid Perp Volume (Weekly)"
                data={PERP_VOLUME_BINANCE_HYPERLIQUID_DATA as any}
                dataConfig={PERP_VOLUME_BINANCE_HYPERLIQUID_CONFIG as any}
                valueFormat={VALUE_FORMAT.percentage}
                isTimeSeries
                hidePoweredBy
                chartHeight={360}
              />
            ) : (
              <div className="w-full h-[360px] flex items-center justify-center text-muted-foreground">
                Unable to load daily perps data right now.
              </div>
            )}
          </div>
        </ContentWrapper>
      </div>
    </div>
  )
}

export default BinanceHyperliquid


