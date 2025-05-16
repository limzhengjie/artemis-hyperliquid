'use client'

import { Area, AreaChart } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContentSparkline
} from '@/components/ui/chart'

import { ValueFormat } from '@/constants/chart'
import { formatValue } from '@/lib/utils'

interface Props {
  data: { date: string; value: number }[]
  valueFormat: ValueFormat
}

const Sparkline = ({ data, valueFormat }: Props) => {
  const chartConfig = {
    value: {
      label: 'Value'
    }
  } satisfies ChartConfig

  const isNegative = data[data.length - 1].value < data[0].value

  const color = isNegative ? 'var(--color-negative)' : 'var(--color-positive)'

  return (
    <ChartContainer config={chartConfig} className="w-full h-[180px]">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContentSparkline
              hideIndicator
              valueFormatter={value => formatValue(value, valueFormat)}
              valueFormat={valueFormat}
            />
          }
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Area
          dataKey="value"
          type="natural"
          fill="url(#colorGradient)"
          stroke={color}
          activeDot={{ stroke: 'white', strokeWidth: 2, r: 4 }}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default Sparkline
