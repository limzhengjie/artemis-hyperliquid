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
}

const Chart = ({
  title,
  data,
  dataConfig,
  isTimeSeries = false,
  valueFormat = VALUE_FORMAT.number,
  xAxisLabel,
  chartHeight = 260
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

  const renderChart = () => {
    return (
      <ComposedChart data={data}>
        <CartesianGrid
          vertical={false}
          horizontal={true}
          stroke="var(--color-moongray-25)"
        />
        <XAxis
          dataKey={isTimeSeries ? 'date' : 'month'}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={value => {
            if (isTimeSeries) {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })
            }
            return value
          }}
        >
          {xAxisLabel && (
            <Label value={xAxisLabel} offset={-5} position="insideBottom" />
          )}
        </XAxis>
        <YAxis
          // dataKey="desktop"
          width={55}
          tickLine={false}
          axisLine={false}
          orientation="right"
          tickFormatter={value => formatValue(value, valueFormat)}
        />
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              hideLabel={!isTimeSeries}
              labelFormatter={label => {
                if (isTimeSeries) {
                  return new Date(label).toLocaleDateString('en-US', {
                    month: 'short',
                    // day: 'numeric',
                    year: 'numeric'
                  })
                }
              }}
              valueFormatter={value => formatValue(value, valueFormat)}
              valueFormat={valueFormat}
              indicator="dot"
            />
          }
          wrapperStyle={{
            backgroundColor: 'white',
            opacity: 1,
            zIndex: 9999
          }}
        />

        {/* First render all bar charts */}
        {Object.entries(dataConfig).map(([key, config], index, array) => {
          if ((config.type as ChartType) === CHART_TYPES.bar) {
            // Check if this is the last bar element in the dataConfig
            const isLastBarElement = array
              .slice(index + 1)
              .every(
                ([label, cfg]) =>
                  (cfg.type as ChartType) !== CHART_TYPES.bar && label
              )

            return (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                stackId={config.stackId || undefined}
                radius={isLastBarElement ? [2, 2, 0, 0] : [0, 0, 0, 0]} // Only round top corners for the last bar
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

        <ChartLegend
          content={
            <ChartLegendContent
              legendProps={legendProps}
              setLegendProps={setLegendProps}
            />
          }
          verticalAlign="top"
          className="mb-4 select-none"
        />

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

  return (
    <Card className="w-full gap-4 relative">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-4">
        <ChartContainer
          config={dataConfig}
          className="w-full"
          style={{ height: `${chartHeight}px` }}
        >
          {renderChart()}
        </ChartContainer>
        <div className="ml-auto">
          <ArtemisLogo poweredBy />
        </div>
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
