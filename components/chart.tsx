'use client'

import { useState } from 'react'
import Image from 'next/image'

import {
  Area,
  Bar,
  Line,
  CartesianGrid,
  ComposedChart,
  XAxis,
  YAxis,
  Label
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent
} from '@/components/ui/chart'

import {
  CHART_TYPES,
  ChartType,
  VALUE_FORMAT,
  ValueFormat
} from '@/constants/chart'

import { formatValue } from '@/lib/utils'

import ArtemisLogo from '@/components/(layout)/artemis-logo'

type ChartData = {
  [key: string]: number | string
}

interface Props {
  title: string
  data: ChartData[]
  dataConfig: ChartConfig
  isTimeSeries?: boolean
  valueFormat?: ValueFormat
  xAxisLabel?: string
  chartHeight?: number
  hideLegend?: boolean
  hidePoweredBy?: boolean
  yAxisDomainToMax?: boolean
  bare?: boolean
  tickCount?: number
}

const Chart = ({
  title,
  data,
  dataConfig,
  isTimeSeries = false,
  valueFormat = VALUE_FORMAT.number,
  xAxisLabel,
  chartHeight = 260,
  hideLegend = false,
  hidePoweredBy = false,
  yAxisDomainToMax = false,
  bare = false,
  tickCount
}: Props) => {
  const [legendProps, setLegendProps] = useState(
    Object.keys(dataConfig)
      .map(key => {
        return {
          key: key,
          color: dataConfig[key].color
        }
      })
      .reduce(
        (a, { key }) => {
          a[key] = false
          return a
        },
        { hover: null } as Record<string, boolean | null | string>
      )
  )
  const XAxisDataKey = isTimeSeries
    ? 'date'
    : Object.keys(data[0] || {}).find(key => !dataConfig[key]) || 'month'

  // calculate dynamic height for XAxis based on label length
  const calculateXAxisHeight = () => {
    if (isTimeSeries) return 40

    // get all unique X-axis values
    const xAxisValues = data.map(item => String(item[XAxisDataKey]))

    // find the longest label
    const longestLabel = xAxisValues.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      ''
    )

    // Estimate height based on label length and rotation
    // Base height (40) + additional height based on label length
    // The multiplier 3
    const estimatedHeight = 40 + Math.min(longestLabel.length * 3, 60)

    return Math.round(estimatedHeight)
  }

  const xAxisHeight = calculateXAxisHeight()

  const processDataForStacked100 = (originalData: ChartData[]) => {
    // create a deep copy of the data
    const processedData = JSON.parse(JSON.stringify(originalData))

    // Find all stackable keys (stacked100 type with same stackId)
    const stackableKeys: Record<string, string[]> = {}
    let hasStacked100 = false

    Object.entries(dataConfig).forEach(([key, config]) => {
      if (
        (config.type as ChartType) === CHART_TYPES.stacked100 &&
        config.stackId
      ) {
        hasStacked100 = true
        if (!stackableKeys[config.stackId]) {
          stackableKeys[config.stackId] = []
        }
        stackableKeys[config.stackId].push(key)
      }
    })

    // if no stacked100 charts, return original data
    if (!hasStacked100) return originalData

    // calculate percentages for each stack
    processedData.forEach((item: ChartData) => {
      Object.entries(stackableKeys).forEach(([stackId, keys]) => {
        // calculate total for this stack
        const total = keys.reduce((sum, key) => {
          return (
            sum + (typeof item[key] === 'number' ? (item[key] as number) : 0)
          )
        }, 0)

        // Convert each value to percentage and store in a new field
        if (total > 0) {
          keys.forEach(key => {
            if (typeof item[key] === 'number') {
              // Create a new field for the percentage value that includes the stackId
              item[`${key}_percentage_${stackId}`] =
                ((item[key] as number) / total) * 100
            }
          })
        }
      })
    })
    return processedData
  }

  // process data for stacked100 chart types
  const chartData = processDataForStacked100(data)

  // Helper function to determine date range and appropriate formatting
  const getDateRangeInfo = () => {
    if (!isTimeSeries || !chartData.length) return { isLongRange: false, totalDays: 0 }
    
    const dates = chartData
      .map((item: ChartData) => new Date(item.date as string))
      .filter((date: Date) => !isNaN(date.getTime()))
      .sort((a: Date, b: Date) => a.getTime() - b.getTime())
    
    if (dates.length < 2) return { isLongRange: false, totalDays: 0 }
    
    const firstDate = dates[0]
    const lastDate = dates[dates.length - 1]
    const totalDays = Math.abs((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))
    const isLongRange = totalDays > 365 || chartData.length > 24
    
    return { isLongRange, totalDays, firstDate, lastDate }
  }

  const dateRangeInfo = getDateRangeInfo()

  // Calculate optimal tick interval based on data range and chart width
  const getOptimalTickInterval = () => {
    if (!isTimeSeries || !chartData.length) return 'preserveStartEnd'
    
    const dataPointCount = chartData.length
    const estimatedChartWidth = chartHeight * 2 // Rough estimate
    const availableSpace = Math.max(estimatedChartWidth - 100, 400) // Account for margins
    const optimalTickCount = Math.floor(availableSpace / 80) // ~80px per tick for readability
    
    if (dataPointCount <= optimalTickCount) {
      return 0 // Show all ticks
    } else if (dateRangeInfo.isLongRange) {
      // For long ranges, show fewer ticks
      return Math.ceil(dataPointCount / Math.min(optimalTickCount, 8))
    } else {
      // For shorter ranges, show more ticks but still respect spacing
      return Math.ceil(dataPointCount / Math.min(optimalTickCount, 12))
    }
  }

  // create a mapping of original keys to percentage keys for stacked100 charts
  const keyToPercentageKeyMap: Record<string, string> = {}
  Object.entries(dataConfig).forEach(([key, config]) => {
    if (
      (config.type as ChartType) === CHART_TYPES.stacked100 &&
      config.stackId
    ) {
      keyToPercentageKeyMap[key] = `${key}_percentage_${config.stackId}`
    }
  })

  // check if we have any stacked100 chart types
  const hasStacked100 = Object.values(dataConfig).some(
    config => (config.type as ChartType) === CHART_TYPES.stacked100
  )

  const renderChart = () => {
    return (
      <ComposedChart data={chartData}>
        <CartesianGrid
          vertical={false}
          horizontal={true}
          stroke="var(--color-moongray-25)"
        />
        <XAxis
          dataKey={XAxisDataKey}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          minTickGap={isTimeSeries ? 20 : 0}
          interval={isTimeSeries ? getOptimalTickInterval() : 0}
          angle={isTimeSeries ? 0 : -45}
          textAnchor={isTimeSeries ? 'middle' : 'end'}
          height={xAxisHeight}
          tickFormatter={value => {
            if (isTimeSeries) {
              const date = new Date(value)
              
              // For data spanning more than 1 year or many data points, show month + year
              if (dateRangeInfo.isLongRange) {
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  year: '2-digit'
                })
              }
              // For shorter time ranges, show month + day
              else {
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }
            }
            return value
          }}
        >
          {xAxisLabel && (
            <Label value={xAxisLabel} offset={-5} position="insideBottom" />
          )}
        </XAxis>
        <YAxis
          width={55}
          tickLine={false}
          axisLine={false}
          orientation={isTimeSeries ? 'right' : 'left'}
          tickFormatter={value => formatValue(value, valueFormat)}
          domain={
            hasStacked100
              ? [0, 100]
              : yAxisDomainToMax
              ? ['dataMin', 'dataMax']
              : undefined
          }
          tickCount={tickCount}
        />
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              hideLabel={!isTimeSeries}
              labelFormatter={label => {
                if (isTimeSeries) {
                  const date = new Date(label)
                  // Tooltips always show full date for clarity
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                }
              }}
              valueFormatter={(value, name) => {
                // If this is a percentage key, use percentage format
                const originalKey = Object.entries(keyToPercentageKeyMap).find(
                  entry => entry[1] === name
                )?.[0]

                if (originalKey) {
                  return formatValue(value, VALUE_FORMAT.percentage)
                }
                return formatValue(value, valueFormat)
              }}
              valueFormat={valueFormat}
              indicator="dot"
              // Map percentage keys back to original keys for display
              keyMapping={keyToPercentageKeyMap}
            />
          }
          wrapperStyle={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            opacity: 1,
            zIndex: 9999
          }}
        />

        {/* First render all bar charts */}
        {Object.entries(dataConfig).map(([key, config], index, array) => {
          if (
            (config.type as ChartType) === CHART_TYPES.bar ||
            (config.type as ChartType) === CHART_TYPES.stacked100
          ) {
            // Check if this is the last bar element in the dataConfig
            const isLastBarElement = array
              .slice(index + 1)
              .every(
                ([label, cfg]) =>
                  (cfg.type as ChartType) !== CHART_TYPES.bar &&
                  (cfg.type as ChartType) !== CHART_TYPES.stacked100 &&
                  label
              )

            // Determine if this is a stacked100 bar
            const isStacked100 =
              (config.type as ChartType) === CHART_TYPES.stacked100

            // Use the percentage data for stacked100 bars with stackId
            const dataKey =
              isStacked100 && config.stackId
                ? `${key}_percentage_${config.stackId}`
                : key

            return (
              <Bar
                key={key}
                dataKey={dataKey}
                fill={`var(--color-${key})`}
                stackId={config.stackId || undefined}
                radius={isLastBarElement ? [2, 2, 0, 0] : [0, 0, 0, 0]}
                fillOpacity={Number(
                  String(legendProps.hover) === key ||
                    legendProps.hover === null
                    ? 1
                    : 0.2
                )}
                hide={legendProps[key] === true}
              />
            )
          }
          return null
        })}

        {/* Then render all area charts */}
        {Object.entries(dataConfig).map(([key, config]) => {
          if ((config.type as ChartType) === CHART_TYPES.area) {
            return (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                fill={`url(#fill${key.charAt(0).toUpperCase() + key.slice(1)})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ stroke: 'white', strokeWidth: 2, r: 4 }}
                fillOpacity={Number(
                  String(legendProps.hover) === key ||
                    legendProps.hover === null
                    ? 1
                    : 0.2
                )}
                hide={legendProps[key] === true}
              />
            )
          }
          return null
        })}

        {/* Finally render all line charts */}
        {Object.entries(dataConfig).map(([key, config]) => {
          if ((config.type as ChartType) === CHART_TYPES.line) {
            return (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ stroke: 'white', strokeWidth: 2, r: 4 }}
                strokeOpacity={Number(
                  String(legendProps.hover) === key ||
                    legendProps.hover === null
                    ? 1
                    : 0.2
                )}
                hide={legendProps[key] === true}
              />
            )
          }
          return null
        })}

        {!hideLegend && (
          <ChartLegend
            content={
              <ChartLegendContent
                legendProps={legendProps}
                setLegendProps={setLegendProps}
                // Pass the key mapping to the legend content
                keyMapping={keyToPercentageKeyMap}
              />
            }
            verticalAlign="bottom"
            className="mt-4 select-none"
          />
        )}

        {/* Define gradients for area charts */}
        <defs>
          {Object.entries(dataConfig).map(([key, config]) => {
            if ((config.type as ChartType) === CHART_TYPES.area) {
              const gradientId = `fill${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`
              return (
                <linearGradient
                  key={key}
                  id={gradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              )
            }
            return null
          })}
        </defs>
      </ComposedChart>
    )
  }

  if (bare) {
    return (
      <ChartContainer
        config={dataConfig}
        className="w-full"
        style={{ height: `${chartHeight}px` }}
      >
        {renderChart()}
      </ChartContainer>
    )
  }

  return (
    <Card className="w-full gap-4 p-4 md:p-6 relative">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-4">
        <ChartContainer
          config={dataConfig}
          className="w-full"
          style={{ height: `${chartHeight}px` }}
        >
          {renderChart()}
        </ChartContainer>
        {!hidePoweredBy && (
          <div className="ml-auto">
            <ArtemisLogo poweredBy />
          </div>
        )}
      </CardContent>
      <Image
        src="/watermark.svg"
        alt="Artemis Logo"
        width={150}
        height={100}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
      />
    </Card>
  )
}

export default Chart
