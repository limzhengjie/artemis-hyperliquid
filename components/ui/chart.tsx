'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'
import {
  ChartType,
  CHART_TYPES,
  VALUE_FORMAT,
  ValueFormat
} from '@/constants/chart'

import { RotateCcwIcon } from 'lucide-react'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    type?: ChartType
    stackId?: string
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >['children']
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`
          )
          .join('\n')
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  labelFormatter,
  labelClassName,
  formatter,
  valueFormatter,
  valueFormat,
  color,
  nameKey,
  labelKey,
  keyMapping = {}
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<'div'> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: 'line' | 'dot' | 'dashed'
    nameKey?: string
    labelKey?: string
    valueFormatter?: (
      value: number,
      name: string,
      format: ValueFormat
    ) => string
    valueFormat?: ValueFormat
    keyMapping?: Record<string, string>
  }) {
  const { config } = useChart()

  const allItemsHaveBarType = Object.values(config).every(
    item => item.type === CHART_TYPES.bar
  )

  const allItemsHaveStacked100Type = Object.values(config).every(
    item => item.type === CHART_TYPES.stacked100
  )

  const allItemsHaveStackId = Object.values(config).every(
    item => item.stackId !== undefined
  )

  const enableTotalValue =
    allItemsHaveStackId && (allItemsHaveBarType || allItemsHaveStacked100Type)

  const reverseKeyMapping: Record<string, string> = {}
  Object.entries(keyMapping).forEach(([originalKey, percentageKey]) => {
    reverseKeyMapping[percentageKey] = originalKey
  })

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || 'value'}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const label = item?.name || item?.dataKey
    const value =
      !labelKey && typeof label === 'string'
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn('font-medium', labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn('font-medium', labelClassName)}>{value}</div>
  }, [
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot'

  return (
    <div
      className={cn(
        'border-[var(--color-background-light-outline)] grid min-w-[8rem] items-start gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs shadow-xl',
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .sort((a, b) => (b.value as number) - (a.value as number))
          .map((item, index) => {
            const dataKey = `${nameKey || item.name || item.dataKey || 'value'}`
            const displayKey = reverseKeyMapping[dataKey] || dataKey
            const itemConfig = getPayloadConfigFromPayload(
              config,
              item,
              displayKey
            )
            const indicatorColor = color || item.payload.fill || item.color

            const isPercentage = reverseKeyMapping[dataKey] !== undefined

            return (
              <div
                key={item.dataKey}
                className={cn(
                  '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                            {
                              'h-2.5 w-2.5': indicator === 'dot',
                              'w-1': indicator === 'line',
                              'w-0 border-[1.5px] border-dashed bg-transparent':
                                indicator === 'dashed',
                              'my-0.5': nestLabel && indicator === 'dashed'
                            }
                          )}
                          style={
                            {
                              '--color-bg': indicatorColor,
                              '--color-border': indicatorColor
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        'flex flex-1 justify-between leading-none',
                        nestLabel ? 'items-end' : 'items-center'
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || displayKey}
                        </span>
                      </div>
                      {item.value !== undefined && (
                        <span className="ml-3 text-foreground font-mono font-medium tabular-nums">
                          {valueFormatter
                            ? valueFormatter(
                                Number(item.value),
                                dataKey,
                                isPercentage
                                  ? VALUE_FORMAT.percentage
                                  : valueFormat || VALUE_FORMAT.number
                              )
                            : isPercentage
                            ? `${Number(item.value).toFixed(1)}%`
                            : item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}

        {/* Add Total row for stacked bar charts */}
        {enableTotalValue && payload.length > 1 && (
          <div className="flex w-full items-center justify-between pt-1 mt-1 border-t border-border">
            <span className="font-medium">Total</span>
            <span className="ml-3 text-foreground font-mono font-medium tabular-nums">
              {(() => {
                const total = payload.reduce(
                  (sum, item) => sum + (Number(item.value) || 0),
                  0
                )
                if (valueFormatter) {
                  return valueFormatter(
                    total,
                    'total',
                    valueFormat || VALUE_FORMAT.number
                  )
                }
                return total.toLocaleString()
              })()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function ChartTooltipContentSparkline({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  labelFormatter,
  labelClassName,
  formatter,
  valueFormatter,
  valueFormat,
  color,
  nameKey
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<'div'> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: 'line' | 'dot' | 'dashed'
    nameKey?: string
    valueFormatter?: (value: number, format: ValueFormat) => string
    valueFormat?: ValueFormat
  }) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload

    const value = item.payload.date

    const formattedDate = new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

    if (labelFormatter) {
      return (
        <div className={cn('font-medium', labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return (
      <div className={cn('font-semibold text-center', labelClassName)}>
        Week of {formattedDate}
      </div>
    )
  }, [
    labelFormatter,
    payload,
    hideLabel,
    labelClassName
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot'

  return (
    <div
      className={cn(
        'border-[var(--color-background-light-outline)] bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl dark:border-[var(--color-moongray-25)]',
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            <div
              key={item.dataKey}
              className={cn(
                '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                indicator === 'dot' && 'items-center'
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                          {
                            'h-2.5 w-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent':
                              indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed'
                          }
                        )}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      'flex flex-1 justify-center leading-none',
                      nestLabel ? 'items-end' : 'items-center'
                    )}
                  >
                    {item.value !== undefined && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {valueFormatter
                          ? valueFormatter(
                              Number(item.value),
                              valueFormat || VALUE_FORMAT.number
                            )
                          : item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
  legendProps,
  setLegendProps,
  keyMapping = {}
}: React.ComponentProps<'div'> &
  Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
    hideIcon?: boolean
    nameKey?: string
    legendProps: Record<string, boolean | null | string>
    setLegendProps: React.Dispatch<
      React.SetStateAction<Record<string, boolean | null | string>>
    >
    keyMapping?: Record<string, string>
  }) {
  const { config } = useChart()

  const reverseKeyMapping: Record<string, string> = {}
  Object.entries(keyMapping).forEach(([originalKey, percentageKey]) => {
    reverseKeyMapping[percentageKey] = originalKey
  })

  if (!payload?.length) {
    return null
  }

  // Count how many items are hidden
  const hiddenItemsCount = Object.entries(legendProps).filter(
    ([key, value]) => key !== 'hover' && value === true
  ).length

  // Determine if we should show the reset button (2+ items hidden)
  const showResetButton = hiddenItemsCount >= 2

  return (
    <div
      className={cn(
        'flex items-center flex-wrap justify-start gap-3',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload.map(item => {
        const originalKey = `${nameKey || item.dataKey || 'value'}`
        const displayKey = reverseKeyMapping[originalKey] || originalKey
        const itemConfig = getPayloadConfigFromPayload(config, item, displayKey)

        // Check if we need to use the original key or the mapped key for legend state
        const legendKey = Object.keys(keyMapping).includes(displayKey)
          ? displayKey
          : originalKey
        const isHidden = legendProps[legendKey] === true

        return (
          <Tooltip key={item.value} delayDuration={800}>
            <TooltipTrigger asChild>
              <div
                key={item.value}
                className={cn(
                  'select-none cursor-pointer flex items-center gap-1.5',
                  isHidden && 'opacity-40'
                )}
                onMouseEnter={() => {
                  if (!legendProps[legendKey]) {
                    setLegendProps(prev => ({ ...prev, hover: legendKey }))
                  }
                }}
                onMouseLeave={() => {
                  setLegendProps(prev => ({ ...prev, hover: null }))
                }}
                onClick={e => {
                  // single click
                  if (e.detail === 1) {
                    const clickTimer = setTimeout(() => {
                      e.preventDefault()
                      e.stopPropagation()
                      setLegendProps(prev => ({
                        ...prev,
                        [legendKey]: !prev[legendKey],
                        hover: null
                      }))
                    }, 250)

                    e.currentTarget.setAttribute(
                      'data-click-timer',
                      clickTimer.toString()
                    )
                  }

                  // double click
                  if (e.detail === 2) {
                    e.preventDefault()
                    e.stopPropagation()
                    const timerId =
                      e.currentTarget.getAttribute('data-click-timer')
                    if (timerId) {
                      clearTimeout(parseInt(timerId))
                      e.currentTarget.removeAttribute('data-click-timer')
                    }

                    window.getSelection()?.removeAllRanges()

                    const allHidden = Object.keys(legendProps)
                      .filter(k => k !== 'hover')
                      .reduce((acc, k) => {
                        acc[k] = true
                        return acc
                      }, {} as Record<string, boolean | null>)
                    allHidden[legendKey] = false

                    setLegendProps({ ...allHidden, hover: null })
                  }
                }}
              >
                {itemConfig?.icon && !hideIcon ? (
                  <itemConfig.icon />
                ) : (
                  <div
                    className="h-3 w-3 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                <span>{itemConfig?.label}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10}>
              <div>Click to toggle visibility.</div>
              <div>Double-click to isolate.</div>
            </TooltipContent>
          </Tooltip>
        )
      })}

      {/* Reset button */}
      {showResetButton && (
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div
              className="cursor-pointer flex items-center gap-1 transition-colors"
              onClick={() => {
                // Reset all items to visible
                const resetState = Object.keys(legendProps)
                  .filter(k => k !== 'hover')
                  .reduce((acc, k) => {
                    acc[k] = false
                    return acc
                  }, {} as Record<string, boolean | null>)

                setLegendProps({ ...resetState, hover: null })
              }}
            >
              <RotateCcwIcon className="h-2.5 w-2" />
              <span className="text-xs">Reset</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={10}>
            <div>Reset all items to visible</div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipContentSparkline,
  ChartLegend,
  ChartLegendContent,
  ChartStyle
}
