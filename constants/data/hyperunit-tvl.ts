import { CHART_TYPES } from '../chart'
import type { ChartConfig } from '@/components/ui/chart'

export const HYPERUNIT_TVL_DATA = [
  { date: '2025-09-01', sol_tvl: 62518165.28385357, fart_tvl: 71528109.48407, pump_tvl: 154962985.29643273, spx_tvl: 4177206.3028296274, bonk_tvl: 1085668.2101741969, eth_tvl: 231174505.46042758, btc_tvl: 361438909.106607, usdc_tvl: 5415316862.526846 },
  { date: '2025-09-08', sol_tvl: 91882214.71929875, fart_tvl: 107908672.56146987, pump_tvl: 266762521.16815037, spx_tvl: 5310172.425754043, bonk_tvl: 1574497.5946493456, eth_tvl: 229534989.8801032, btc_tvl: 515837832.89537126, usdc_tvl: 5975580965.388817 },
  { date: '2025-09-15', sol_tvl: 0, fart_tvl: 0, pump_tvl: 0, spx_tvl: 0, bonk_tvl: 0, eth_tvl: 217189195.69563183, btc_tvl: 449180980.73696965, usdc_tvl: 5956520669.643566 },
]

export const HYPERUNIT_TVL_CONFIG: ChartConfig = {
  usdc_tvl: {
    label: 'USDC',
    color: '#5E9EFD',
    type: CHART_TYPES.bar,
    stackId: 'hyperunit'
  },
  btc_tvl: {
    label: 'BTC',
    color: '#F7931A',
    type: CHART_TYPES.bar,
    stackId: 'hyperunit'
  },
  eth_tvl: {
    label: 'ETH',
    color: '#627EEA',
    type: CHART_TYPES.bar,
    stackId: 'hyperunit'
  },
  sol_tvl: {
    label: 'SOL',
    color: '#9945FF',
    type: CHART_TYPES.bar,
    stackId: 'hyperunit'
  },
  pump_tvl: {
    label: 'PUMP',
    color: '#FF6B6B',
    type: CHART_TYPES.bar,
    stackId: 'hyperunit'
  },
  fart_tvl: {
    label: 'FART',
    color: '#4ECDC4',
    type: CHART_TYPES.bar,
    stackId: 'hyperunit'
  },
  spx_tvl: {
    label: 'SPX',
    color: '#45B7D1',
    type: CHART_TYPES.bar,
    stackId: 'hyperunit'
  },
  bonk_tvl: {
    label: 'BONK',
    color: '#FFA726',
    type: CHART_TYPES.bar,
    stackId: 'hyperunit'
  }
}

export const HYPERUNIT_TVL_CHART_CONFIG = {
  type: CHART_TYPES.bar,
  data: HYPERUNIT_TVL_DATA,
  config: HYPERUNIT_TVL_CONFIG,
  xAxisKey: 'date',
  yAxisKeys: ['usdc_tvl', 'btc_tvl', 'eth_tvl', 'sol_tvl', 'pump_tvl', 'fart_tvl', 'spx_tvl', 'bonk_tvl'],
  title: 'HyperUnit TVL by Asset (Weekly)',
  description: 'Weekly Total Value Locked (TVL) breakdown by asset on HyperUnit',
}
