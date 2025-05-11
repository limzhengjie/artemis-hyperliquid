'use client'

import { Area, AreaChart } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContentSparkline
} from '@/components/ui/chart'

// interface SparklineProps {
//   data: { date: string; value: number }[]
// }

const Sparkline = () => {
  // Generate 5 years of weekly data
  const generateWeeklyData = () => {
    const data = []
    const startDate = new Date(2019, 0, 1) // Start from January 1, 2019
    const endDate = new Date(2024, 3, 30) // End around April 30, 2024 (5+ years)

    // Function to generate somewhat realistic looking data with upward trend
    let value = 150 + Math.random() * 30 // Start a bit lower
    let trend = 0.8 // Positive base trend

    while (startDate <= endDate) {
      // Add some randomness and trend
      const noise = (Math.random() - 0.5) * 40

      value += trend + noise
      value = Math.max(50, Math.min(400, value)) // Keep values in reasonable range

      // Occasionally adjust trend direction, but keep it mostly positive
      if (Math.random() < 0.05) {
        trend = 0.3 + Math.random() * 1.2 // Range from 0.3 to 1.5 (always positive)
      }

      data.push({
        date: startDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        value: Math.round(value)
      })

      // Add 7 days for weekly data
      startDate.setDate(startDate.getDate() + 7)
    }

    return data
  }

  const chartData = generateWeeklyData()

  const chartConfig = {
    value: {
      label: 'Value'
    }
  } satisfies ChartConfig

  const isNegative = chartData[chartData.length - 1].value < chartData[0].value

  const color = isNegative ? 'var(--color-negative)' : 'var(--color-positive)'

  return (
    <ChartContainer config={chartConfig} className="w-full h-[180px]">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContentSparkline hideIndicator />}
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
          activeDot={{ stroke: 'white', strokeWidth: 1, r: 4 }}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default Sparkline
