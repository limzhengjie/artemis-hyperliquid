import { CHART_TYPES } from '../chart'
import { ChartConfig } from '@/components/ui/chart'

export const USE_CASE_BY_CURRENCY_CONFIG = {
  USDT: {
    label: 'USDT',
    color: '#26A17B',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  },
  USDC: {
    label: 'USDC',
    color: '#2775CA',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  }
} satisfies ChartConfig

export const B2B_VOLUMES_DATA = [
  { date: '1/1/2023', b2b_volumes: 119648156.84 },
  { date: '2/1/2023', b2b_volumes: 95545966.23 },
  { date: '3/1/2023', b2b_volumes: 149084639.83 },
  { date: '4/1/2023', b2b_volumes: 107684515.25 },
  { date: '5/1/2023', b2b_volumes: 161812578.38 },
  { date: '6/1/2023', b2b_volumes: 311168255.88 },
  { date: '7/1/2023', b2b_volumes: 321178204.65 },
  { date: '8/1/2023', b2b_volumes: 362932576.89 },
  { date: '9/1/2023', b2b_volumes: 352222341.55 },
  { date: '10/1/2023', b2b_volumes: 380915111.46 },
  { date: '11/1/2023', b2b_volumes: 534180669.7 },
  { date: '12/1/2023', b2b_volumes: 620152379.27 },
  { date: '1/1/2024', b2b_volumes: 564049025.24 },
  { date: '2/1/2024', b2b_volumes: 772267621.89 },
  { date: '3/1/2024', b2b_volumes: 1043486435.92 },
  { date: '4/1/2024', b2b_volumes: 1189066829.1 },
  { date: '5/1/2024', b2b_volumes: 1532028187.14 },
  { date: '6/1/2024', b2b_volumes: 1324593863.99 },
  { date: '7/1/2024', b2b_volumes: 1603134527.56 },
  { date: '8/1/2024', b2b_volumes: 1786383689.2 },
  { date: '9/1/2024', b2b_volumes: 1789086265.21 },
  { date: '10/1/2024', b2b_volumes: 2349236450.78 },
  { date: '11/1/2024', b2b_volumes: 2217709856.93 },
  { date: '12/1/2024', b2b_volumes: 2740539497.0 },
  { date: '1/1/2025', b2b_volumes: 2458009762.34 },
  { date: '2/1/2025', b2b_volumes: 2960104660.28 }
]

export const B2B_VOLUMES_DATA_CONFIG = {
  b2b_volumes: {
    label: 'B2B Volumes',
    color: '#8672F9',
    type: CHART_TYPES.bar
  }
} satisfies ChartConfig

export const B2B_PERCENT_OF_CURRENCY_FLOWS_DATA = [
  { date: '1/1/2024', USDT: 97, USDC: 3 },
  { date: '2/1/2024', USDT: 93, USDC: 7 },
  { date: '3/1/2024', USDT: 65, USDC: 35 },
  { date: '4/1/2024', USDT: 100, USDC: 0 },
  { date: '5/1/2024', USDT: 91, USDC: 9 },
  { date: '6/1/2024', USDT: 75, USDC: 25 },
  { date: '7/1/2024', USDT: 82, USDC: 18 },
  { date: '8/1/2024', USDT: 81, USDC: 19 },
  { date: '9/1/2024', USDT: 74, USDC: 26 },
  { date: '10/1/2024', USDT: 71, USDC: 29 },
  { date: '11/1/2024', USDT: 75, USDC: 25 },
  { date: '12/1/2024', USDT: 76, USDC: 24 },
  { date: '1/1/2025', USDT: 90, USDC: 10 },
  { date: '2/1/2025', USDT: 84, USDC: 16 },
  { date: '3/1/2025', USDT: 64, USDC: 36 }
]

export const AVG_B2B_TXN_SIZE_BY_CHAIN_DATA = [
  { chain: 'Tron', avg_b2b_txn_size: 219820 },
  { chain: 'Ethereum', avg_b2b_txn_size: 219228 },
  { chain: 'BSC', avg_b2b_txn_size: 23395 },
  { chain: 'Polygon', avg_b2b_txn_size: 8811 }
]

export const AVG_B2B_TXN_SIZE_BY_CHAIN_CONFIG = {
  avg_b2b_txn_size: {
    label: 'Avg B2B Txn Size',
    color: '#8672F9',
    type: CHART_TYPES.bar
  }
} satisfies ChartConfig
