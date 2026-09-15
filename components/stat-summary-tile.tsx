import { Card } from './ui/card'
import { VALUE_FORMAT, type ValueFormat } from '@/constants/chart'
import { formatValue } from '@/lib/utils'
import { comparison, type Observation, type MetricRow } from '@/lib/market-data'
import Sparkline from '@/components/sparkline'
import Chart from '@/components/chart'
import type { ChartConfig } from '@/components/ui/chart'

interface StatSummaryTileProps {
  mainStatLabel: string
  mainStat: { value: number | null; type: ValueFormat }
  mainStatChange: { value: number | null; type: ValueFormat; label: string }
  sparklineData: Observation[]
  miniStatsData: Observation[]
  sourceNote?: string
  stackedPercentData?: MetricRow[]
  stackedPercentConfig?: ChartConfig
}
export default function StatSummaryTile({
  mainStatLabel,
  mainStat,
  mainStatChange,
  sparklineData,
  miniStatsData,
  sourceNote,
  stackedPercentData,
  stackedPercentConfig
}: StatSummaryTileProps) {
  const stats = [
    { days: 7, label: '7 days' },
    { days: 30, label: '30 days' },
    { days: 90, label: '90 days' }
  ].map(period => ({ ...period, ...comparison(miniStatsData, period.days) }))
  return (
    <Card className="w-full max-w-[540px] overflow-hidden p-0 gap-0">
      <div className="px-6 pt-10 pb-5 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-4">
          {mainStatLabel}
        </p>
        <p className="text-5xl lg:text-6xl font-bold">
          {formatValue(mainStat.value, mainStat.type)}
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          {formatValue(mainStatChange.value, mainStatChange.type)}{' '}
          {mainStatChange.label}
        </p>
        {sourceNote && (
          <p className="text-xs text-muted-foreground mt-4">{sourceNote}</p>
        )}
      </div>
      {stackedPercentData && stackedPercentConfig ? (
        <Chart
          title=""
          data={stackedPercentData}
          dataConfig={stackedPercentConfig}
          valueFormat={VALUE_FORMAT.percentage}
          isTimeSeries
          bare
          chartHeight={180}
          hidePoweredBy
        />
      ) : (
        <Sparkline data={sparklineData} valueFormat={VALUE_FORMAT.currency} />
      )}
      <div className="grid grid-cols-3 border-t">
        {stats.map(stat => (
          <div key={stat.days} className="p-4 border-r last:border-r-0">
            <p className="text-xs text-muted-foreground mb-2">
              vs. {stat.label} earlier
            </p>
            <p className="text-lg font-semibold">
              {formatValue(stat.value, VALUE_FORMAT.currency)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatValue(stat.pctChange, VALUE_FORMAT.percentage)}
            </p>
          </div>
        ))}
      </div>
      <p className="px-4 py-3 text-xs text-muted-foreground border-t">
        — means unavailable. Comparisons require both dates; weekly chart
        requires seven complete days.
      </p>
    </Card>
  )
}
