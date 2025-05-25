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
    label: 'Avg Transaction Size',
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

export const AVG_CARD_TXN_SIZE_BY_TYPE_DATA = [
  { card: 'USA Credit', avg_card_txn_size: 95 },
  { card: 'Exa', avg_card_txn_size: 62 },
  { card: 'Gnosis Pay', avg_card_txn_size: 61 },
  { card: 'USA Debit', avg_card_txn_size: 43 },
  { card: 'Europe Card', avg_card_txn_size: 39 }
]

export const AVG_CARD_TXN_SIZE_BY_TYPE_CONFIG = {
  avg_card_txn_size: {
    label: 'Avg Transaction Size',
    color: '#8672F9',
    type: CHART_TYPES.bar
  }
} satisfies ChartConfig

export const P2P_VOLUMES_DATA = [
  { date: '1/1/2023', volume: 1413081322 },
  { date: '2/1/2023', volume: 1483548478 },
  { date: '3/1/2023', volume: 1884957870 },
  { date: '4/1/2023', volume: 1910237156 },
  { date: '5/1/2023', volume: 1861527701 },
  { date: '6/1/2023', volume: 1848129073 },
  { date: '7/1/2023', volume: 1785182034 },
  { date: '8/1/2023', volume: 1596231672 },
  { date: '9/1/2023', volume: 1451414126 },
  { date: '10/1/2023', volume: 1438191924 },
  { date: '11/1/2023', volume: 1577768114 },
  { date: '12/1/2023', volume: 1943309226 },
  { date: '1/1/2024', volume: 1846044182 },
  { date: '2/1/2024', volume: 1768915050 },
  { date: '3/1/2024', volume: 1942037066 },
  { date: '4/1/2024', volume: 1673769283 },
  { date: '5/1/2024', volume: 1583089925 },
  { date: '6/1/2024', volume: 1479394760 },
  { date: '7/1/2024', volume: 1522664583 },
  { date: '8/1/2024', volume: 1494410747 },
  { date: '9/1/2024', volume: 1472010907 },
  { date: '10/1/2024', volume: 1597553794 },
  { date: '11/1/2024', volume: 1731057578 },
  { date: '12/1/2024', volume: 2180134511 },
  { date: '1/1/2025', volume: 1672029774 },
  { date: '2/1/2025', volume: 1506496509 }
]

export const P2P_VOLUMES_CONFIG = {
  volume: {
    label: 'Volume',
    color: '#8672F9',
    type: CHART_TYPES.bar
  }
} satisfies ChartConfig

export const AVG_P2P_TXN_SIZE_BY_APPLICATION_DATA = [
  { entity: 'Zelle', avg_p2p_txn_size: 277 },
  { entity: 'Global Remittance', avg_p2p_txn_size: 250 },
  { entity: 'Venmo', avg_p2p_txn_size: 73 },
  { entity: 'Sling (Estimated)', avg_p2p_txn_size: 47 },
  { entity: 'Celo P2P', avg_p2p_txn_size: 26 }
]

export const AVG_P2P_TXN_SIZE_BY_APPLICATION_CONFIG = {
  avg_p2p_txn_size: {
    label: 'Avg Transaction Size',
    color: '#8672F9',
    type: CHART_TYPES.bar
  }
} satisfies ChartConfig

export const B2C_VOLUMES_DATA = [
  { date: '1/1/2023', volume: 56231897.95 },
  { date: '2/1/2023', volume: 71169604.03 },
  { date: '3/1/2023', volume: 86549861.88 },
  { date: '4/1/2023', volume: 92478098.91 },
  { date: '5/1/2023', volume: 116669157.77 },
  { date: '6/1/2023', volume: 127976590.54 },
  { date: '7/1/2023', volume: 126318640.15 },
  { date: '8/1/2023', volume: 138276430.17 },
  { date: '9/1/2023', volume: 142535977.3 },
  { date: '10/1/2023', volume: 165929283.91 },
  { date: '11/1/2023', volume: 163861824.57 },
  { date: '12/1/2023', volume: 169208483.53 },
  { date: '1/1/2024', volume: 170755825.28 },
  { date: '2/1/2024', volume: 166980925.55 },
  { date: '3/1/2024', volume: 191996450.49 },
  { date: '4/1/2024', volume: 198884620.28 },
  { date: '5/1/2024', volume: 206907119.46 },
  { date: '6/1/2024', volume: 211928426.03 },
  { date: '7/1/2024', volume: 208851810.76 },
  { date: '8/1/2024', volume: 231550783.17 },
  { date: '9/1/2024', volume: 263549833.28 },
  { date: '10/1/2024', volume: 272823714.98 },
  { date: '11/1/2024', volume: 302221265.09 },
  { date: '12/1/2024', volume: 291953086.8 },
  { date: '1/1/2025', volume: 311088556.39 },
  { date: '2/1/2025', volume: 274708023.33 }
]

export const B2C_VOLUMES_CONFIG = {
  volume: {
    label: 'Volume',
    color: '#8672F9',
    type: CHART_TYPES.bar
  }
} satisfies ChartConfig

export const PREFUNDING_DATA = [
  { date: '11/1/2022', Arf: 10884186.0, Mansa: 0 },
  { date: '12/1/2022', Arf: 20117566.0, Mansa: 0 },
  { date: '1/1/2023', Arf: 21008473.0, Mansa: 0 },
  { date: '2/1/2023', Arf: 22916220.0, Mansa: 0 },
  { date: '3/1/2023', Arf: 25026298.0, Mansa: 0 },
  { date: '4/1/2023', Arf: 18700524.0, Mansa: 0 },
  { date: '5/1/2023', Arf: 21454654.0, Mansa: 0 },
  { date: '6/1/2023', Arf: 24034970.0, Mansa: 0 },
  { date: '7/1/2023', Arf: 23241274.0, Mansa: 0 },
  { date: '8/1/2023', Arf: 25647486.0, Mansa: 0 },
  { date: '9/1/2023', Arf: 28489447.0, Mansa: 0 },
  { date: '10/1/2023', Arf: 49740163.0, Mansa: 0 },
  { date: '11/1/2023', Arf: 55032827.0, Mansa: 0 },
  { date: '12/1/2023', Arf: 53461116.0, Mansa: 0 },
  { date: '1/1/2024', Arf: 62958678.0, Mansa: 0 },
  { date: '2/1/2024', Arf: 63251712.0, Mansa: 0 },
  { date: '3/1/2024', Arf: 63127556.0, Mansa: 0 },
  { date: '4/1/2024', Arf: 60790302.0, Mansa: 0 },
  { date: '5/1/2024', Arf: 65712716.0, Mansa: 0 },
  { date: '6/1/2024', Arf: 63099247.0, Mansa: 0 },
  { date: '7/1/2024', Arf: 72194437.0, Mansa: 100000.0 },
  { date: '8/1/2024', Arf: 67478569.0, Mansa: 1362420.0 },
  { date: '9/1/2024', Arf: 88134528.0, Mansa: 1628175.0 },
  { date: '10/1/2024', Arf: 104403100.0, Mansa: 1980885.0 },
  { date: '11/1/2024', Arf: 117650000.0, Mansa: 104805.0 },
  { date: '12/1/2024', Arf: 136350000.0, Mansa: 6300665.39 },
  { date: '1/1/2025', Arf: 160100000.0, Mansa: 11497686.0 },
  { date: '2/1/2025', Arf: 190400001.0, Mansa: 20424886.0 }
]

export const PREFUNDING_CONFIG = {
  Arf: {
    label: 'Arf',
    color: '#8672F9',
    type: CHART_TYPES.bar,
    stackId: 'a'
  },
  Mansa: {
    label: 'Mansa',
    color: '#F7BD5F',
    type: CHART_TYPES.bar,
    stackId: 'a'
  }
} satisfies ChartConfig
