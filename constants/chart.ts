import { ChartConfig } from '@/components/ui/chart'

export const CHART_TYPES = {
  area: 'area',
  bar: 'bar',
  line: 'line',
  stacked100: 'stacked100'
} as const

export type ChartType = (typeof CHART_TYPES)[keyof typeof CHART_TYPES]

export const VALUE_FORMAT = {
  number: 'number',
  currency: 'currency',
  percentage: 'percentage'
} as const

export type ValueFormat = (typeof VALUE_FORMAT)[keyof typeof VALUE_FORMAT]

export const AVG_RETENTION_RATE_DATA = [
  { month: 1, Card: 32.85, DEX: 13.73, NFT: 12.88, Chains: 20.5 },
  { month: 2, Card: 28.31, DEX: 6.49, NFT: 8.29, Chains: 13.7 },
  { month: 3, Card: 27.79, DEX: 5.27, NFT: 6.66, Chains: 10.4 },
  { month: 4, Card: 31.88, DEX: 4.43, NFT: 5.71, Chains: 8.2 },
  { month: 5, Card: 27.18, DEX: 4.02, NFT: 5.14, Chains: 6.6 },
  { month: 6, Card: 22.96, DEX: 8.7, NFT: 5.03, Chains: 5.4 },
  { month: 7, Card: 27.09, DEX: 3.47, NFT: 4.83, Chains: 5.1 },
  { month: 8, Card: 21.82, DEX: 3.89, NFT: 4.86, Chains: 5.5 },
  { month: 9, Card: 21.19, DEX: 3.15, NFT: 5.05, Chains: 5.9 },
  { month: 10, Card: 20.68, DEX: 7.73, NFT: 5.33, Chains: 6.5 },
  { month: 11, Card: 22.02, DEX: 3.66, NFT: 6.26, Chains: 7.1 },
  { month: 12, Card: 21.19, DEX: 3.39, NFT: 5.65, Chains: 7.2 }
]

export const AVG_RETENTION_RATE_CONFIG = {
  Card: {
    label: 'Card',
    color: '#8672F9',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  },
  DEX: {
    label: 'DEX',
    color: '#70A9FF',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  },
  NFT: {
    label: 'NFT',
    color: '#51B495',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  },
  Chains: {
    label: 'Chains',
    color: '#F7BD5F',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  }
} satisfies ChartConfig
