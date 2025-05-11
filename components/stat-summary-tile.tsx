import { Card } from './ui/card'

import { cn } from '@/lib/utils'

import Sparkline from '@/components/sparkline'

import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface StatSummaryTileProps {
  miniStatsData: {
    period: string
    value: number
    pctChange: number
  }[]
}

const StatSummaryTile = ({ miniStatsData }: StatSummaryTileProps) => {
  return (
    <Card className="w-full max-w-[540px] h-[540px] p-0 overflow-hidden gap-0">
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex-col items-center">
            <p className="text-sm text-muted-foreground mb-3">
              ISSUED STABLECOINS
            </p>
            <p className="text-7xl font-bold">$236.2B</p>
          </div>
        </div>
        <Sparkline />
      </div>
      <div className="grid grid-cols-3 gap-0">
        {miniStatsData.map((stat, index) => (
          <MiniStatsBlock
            key={stat.period}
            {...stat}
            isLast={index === miniStatsData.length - 1}
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
}

const MiniStatsBlock = ({
  period,
  value,
  pctChange,
  isLast
}: MiniStatsBlockProps) => {
  return (
    <Card
      className={cn(
        'px-6 pb-3 pt-3 flex flex-col gap-2 border-0 border-t border-r border-t-border-border border-r-border-border rounded-none overflow-hidden',
        isLast && 'border-r-0'
      )}
    >
      <p className="text-sm">{period}</p>
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
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="flex items-center text-xs text-muted-foreground gap-1">
        <p
          className={cn(
            pctChange > 0
              ? 'text-[var(--color-positive)]'
              : 'text-[var(--color-negative)]'
          )}
        >
          {pctChange > 0 && '+'}
          {pctChange}%
        </p>
        <p className="">{period.toLowerCase()}</p>
      </div>
    </Card>
  )
}

export default StatSummaryTile
