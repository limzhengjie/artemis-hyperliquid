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

export const CRYPTO_CARD_LINKED_VOLUMES_DATA = [
  { date: '1/1/2023', card: 231156585.7 },
  { date: '2/1/2023', card: 233624482.4 },
  { date: '3/1/2023', card: 244317401.14 },
  { date: '4/1/2023', card: 244796401.2 },
  { date: '5/1/2023', card: 257253935.52 },
  { date: '6/1/2023', card: 264349888.5 },
  { date: '7/1/2023', card: 293799864.05 },
  { date: '8/1/2023', card: 284271303.05 },
  { date: '9/1/2023', card: 299354899.76 },
  { date: '10/1/2023', card: 427455041.29 },
  { date: '11/1/2023', card: 466864376.42 },
  { date: '12/1/2023', card: 504799873.33 },
  { date: '1/1/2024', card: 533158276.24 },
  { date: '2/1/2024', card: 543389819.14 },
  { date: '3/1/2024', card: 543689585.61 },
  { date: '4/1/2024', card: 588099545.4 },
  { date: '5/1/2024', card: 618837410.43 },
  { date: '6/1/2024', card: 618245464.56 },
  { date: '7/1/2024', card: 729579819.14 },
  { date: '8/1/2024', card: 751460234.08 },
  { date: '9/1/2024', card: 770379157.85 },
  { date: '10/1/2024', card: 909796401.5 },
  { date: '11/1/2024', card: 957405944.15 },
  { date: '12/1/2024', card: 969935930.3 },
  { date: '1/1/2025', card: 1044194323.78 },
  { date: '2/1/2025', card: 1102790316.47 }
]

export const CRYPTO_CARD_LINKED_VOLUMES_CONFIG = {
  card: {
    label: 'Volume',
    color: '#8672F9',
    type: CHART_TYPES.bar
  }
} satisfies ChartConfig
