import { Card } from './ui/card'

import { VALUE_FORMAT, type ValueFormat } from '@/constants/chart'

import { formatValue } from '@/lib/utils'
import { cn } from '@/lib/utils'

import Sparkline from '@/components/sparkline'

import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface StatSummaryTileProps {
  mainStatLabel: string
  mainStat: { value: number; type: ValueFormat }
  mainStatChange: { value: number; type: ValueFormat; label: string }
  sparklineData: { date: string; value: number }[]
  miniStatsData: { date: string; value: number }[]
}

const StatSummaryTile = ({
  mainStatLabel,
  mainStat,
  mainStatChange,
  sparklineData,
  miniStatsData
}: StatSummaryTileProps) => {
  const PERIODS = [
    { daysBack: 30, label: 'Last Month' },
    { daysBack: 365, label: 'Last Year' },
    { daysBack: 365 * 3, label: 'Last 3 Years' }
  ]

  const createMiniStatsData = () => {
    if (!miniStatsData || miniStatsData.length === 0) return []

    // Sort data by date (newest first)
    const sortedData = [...miniStatsData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    // Get the most recent value
    const mostRecentValue = sortedData[0].value

    // Calculate stats for each period
    return PERIODS.map(({ daysBack, label }) => {
      // Find the data point closest to daysBack days ago
      const targetDate = new Date()
      targetDate.setDate(targetDate.getDate() - daysBack)

      // Find the closest date in our data
      const closestDataPoint =
        sortedData.find(item => new Date(item.date) <= targetDate) ||
        sortedData[sortedData.length - 1]

      const pastValue = closestDataPoint.value

      // Calculate percentage change
      const pctChange = ((mostRecentValue - pastValue) / pastValue) * 100

      return {
        period: label,
        value: Math.round(mostRecentValue - pastValue),
        pctChange: Math.round(pctChange * 10) / 10,
        isCurrency: true
      }
    })
  }

  return (
    <Card className="w-full max-w-[540px] h-[540px] p-0 overflow-hidden gap-0">
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center flex-col items-center">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              {mainStatLabel}
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-7xl font-bold">
                {formatValue(mainStat.value, mainStat.type)}
              </p>
              <div className="flex items-center justify-center gap-1">
                <div className="flex items-center">
                  {mainStatChange.value > 0 ? (
                    <ArrowUpIcon
                      className="text-[var(--color-positive)]"
                      strokeWidth={3}
                    />
                  ) : (
                    <ArrowDownIcon
                      className="text-[var(--color-negative)]"
                      strokeWidth={3}
                    />
                  )}
                  <p className="text-md font-semibold">
                    {formatValue(mainStatChange.value, mainStatChange.type)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {mainStatChange.label}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Sparkline data={sparklineData} valueFormat={VALUE_FORMAT.currency} />
      </div>
      <div className="grid grid-cols-3 gap-0">
        {createMiniStatsData().map((stat, index) => (
          <MiniStatsBlock
            key={stat.period}
            {...stat}
            isLast={index === createMiniStatsData().length - 1}
          />
        ))}
      </div>
    </Card>
  )
}

interface MiniStatsBlockProps {
  period: string
  value: number
  pctChange: number
  isLast: boolean
  isCurrency?: boolean
}

const MiniStatsBlock = ({
  period,
  value,
  pctChange,
  isLast,
  isCurrency = false
}: MiniStatsBlockProps) => {
  return (
    <Card
      className={cn(
        'px-6 pb-3 pt-3 flex flex-col gap-2 border-0 border-t border-r border-t-border-border border-r-border-border rounded-none overflow-hidden',
        isLast && 'border-r-0'
      )}
    >
      <p className="text-sm font-medium">{period}</p>
      <div className="flex items-center">
        {pctChange > 0 ? (
          <ArrowUpIcon
            className="text-[var(--color-positive)]"
            strokeWidth={3}
          />
        ) : (
          <ArrowDownIcon
            className="text-[var(--color-negative)]"
            strokeWidth={3}
          />
        )}
        <p className="text-2xl font-bold">
          {formatValue(
            value,
            isCurrency ? VALUE_FORMAT.currency : VALUE_FORMAT.number
          )}
        </p>
      </div>
      <div className="flex items-center flex-wrap text-xs text-muted-foreground gap-1">
        <p
          className={cn(
            pctChange > 0
              ? 'text-[var(--color-positive)]'
              : 'text-[var(--color-negative)]'
          )}
        >
          {pctChange > 0 && '+'}
          {Number(pctChange).toFixed(1)}%
        </p>
        <p className="">{period.toLowerCase()}</p>
      </div>
    </Card>
  )
}

export default StatSummaryTile
