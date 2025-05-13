import { ChartConfig } from '@/components/ui/chart'

export const CHART_TYPES = {
  area: 'area',
  bar: 'bar',
  line: 'line'
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
    type: CHART_TYPES.line
  },
  DEX: {
    label: 'DEX',
    color: '#70A9FF',
    type: CHART_TYPES.line
  },
  NFT: {
    label: 'NFT',
    color: '#51B495',
    type: CHART_TYPES.line
  },
  Chains: {
    label: 'Chains',
    color: '#F7BD5F',
    type: CHART_TYPES.line
  }
} satisfies ChartConfig

export const PAYMENT_USAGE_BY_TYPE_DATA = [
  { date: '1/1/2021', B2B: 138343, B2C: 0, Credit_Card: 0, Loans: 0 },
  { date: '2/1/2021', B2B: 652439, B2C: 0, Credit_Card: 0, Loans: 0 },
  { date: '3/1/2021', B2B: 686340.806, B2C: 0, Credit_Card: 0, Loans: 0 },
  { date: '4/1/2021', B2B: 15532091.9, B2C: 0, Credit_Card: 0, Loans: 0 },
  {
    date: '5/1/2021',
    B2B: 49691999.4,
    B2C: 0,
    Credit_Card: 120309.32,
    Loans: 0
  },
  {
    date: '6/1/2021',
    B2B: 19635705,
    B2C: 0,
    Credit_Card: 99431.17,
    Loans: 0
  },
  {
    date: '7/1/2021',
    B2B: 10631973.1,
    B2C: 0,
    Credit_Card: 534266.93,
    Loans: 0
  },
  {
    date: '8/1/2021',
    B2B: 29225194.4,
    B2C: 0,
    Credit_Card: 680816,
    Loans: 0
  },
  {
    date: '9/1/2021',
    B2B: 12596795.9,
    B2C: 0,
    Credit_Card: 411811,
    Loans: 0
  },
  {
    date: '10/1/2021',
    B2B: 9729395.04,
    B2C: 0,
    Credit_Card: 313419,
    Loans: 0
  },
  {
    date: '11/1/2021',
    B2B: 13974245.7,
    B2C: 0,
    Credit_Card: 508885.16,
    Loans: 0
  },
  {
    date: '12/1/2021',
    B2B: 8156325.06,
    B2C: 0,
    Credit_Card: 2169877,
    Loans: 0
  },
  {
    date: '1/1/2022',
    B2B: 3583604.91,
    B2C: 0,
    Credit_Card: 554609.55,
    Loans: 0
  },
  {
    date: '2/1/2022',
    B2B: 3497095.14,
    B2C: 0,
    Credit_Card: 1671278,
    Loans: 0
  },
  { date: '3/1/2022', B2B: 5119709.6, B2C: 0, Credit_Card: 542628, Loans: 0 },
  {
    date: '4/1/2022',
    B2B: 4137461.17,
    B2C: 0,
    Credit_Card: 322000,
    Loans: 0
  },
  {
    date: '5/1/2022',
    B2B: 8203454.75,
    B2C: 0,
    Credit_Card: 2492336,
    Loans: 0
  },
  {
    date: '6/1/2022',
    B2B: 8148640.53,
    B2C: 0,
    Credit_Card: 408110,
    Loans: 0
  },
  {
    date: '7/1/2022',
    B2B: 6246628.34,
    B2C: 0,
    Credit_Card: 147038.23,
    Loans: 0
  },
  {
    date: '8/1/2022',
    B2B: 7087927.79,
    B2C: 0,
    Credit_Card: 17862.94,
    Loans: 0
  },
  { date: '9/1/2022', B2B: 7359879.66, B2C: 0, Credit_Card: 0, Loans: 0 },
  { date: '10/1/2022', B2B: 10259486.3, B2C: 0, Credit_Card: 0, Loans: 0 },
  {
    date: '11/1/2022',
    B2B: 11487456.7,
    B2C: 0,
    Credit_Card: 0,
    Loans: 10884186
  },
  {
    date: '12/1/2022',
    B2B: 13326857.4,
    B2C: 0,
    Credit_Card: 0,
    Loans: 20117566
  },
  {
    date: '1/1/2023',
    B2B: 119648156.84,
    B2C: 56231897.95,
    Credit_Card: 206847252,
    Loans: 21008473
  },
  {
    date: '2/1/2023',
    B2B: 95495966.23,
    B2C: 64903455.76,
    Credit_Card: 204515991.3,
    Loans: 22916220
  },
  {
    date: '3/1/2023',
    B2B: 146964128.48,
    B2C: 78202546.62,
    Credit_Card: 210606303.34,
    Loans: 25026298
  },
  {
    date: '4/1/2023',
    B2B: 105840515.25,
    B2C: 80882356.71,
    Credit_Card: 202716088.6,
    Loans: 18700524
  },
  {
    date: '5/1/2023',
    B2B: 146319953.43,
    B2C: 98181147.37,
    Credit_Card: 209277064.32,
    Loans: 21454654
  },
  {
    date: '6/1/2023',
    B2B: 154212868.53,
    B2C: 107986054.04,
    Credit_Card: 217238814.4,
    Loans: 24034970
  },
  {
    date: '7/1/2023',
    B2B: 154676403.03,
    B2C: 102682696.55,
    Credit_Card: 239750758.15,
    Loans: 23241274
  },
  {
    date: '8/1/2023',
    B2B: 175177111.7,
    B2C: 111538815.47,
    Credit_Card: 249585544.95,
    Loans: 25647486
  },
  {
    date: '9/1/2023',
    B2B: 166494835.02,
    B2C: 110580429.1,
    Credit_Card: 252966075.76,
    Loans: 28489447
  },
  {
    date: '10/1/2023',
    B2B: 178004990.4,
    B2C: 132560321.81,
    Credit_Card: 365813989.89,
    Loans: 49740163
  },
  {
    date: '11/1/2023',
    B2B: 237614536.41,
    B2C: 126902579.87,
    Credit_Card: 383722928.02,
    Loans: 55032827
  },
  {
    date: '12/1/2023',
    B2B: 244327565.65,
    B2C: 131157506.53,
    Credit_Card: 409540383.63,
    Loans: 53461116
  },
  {
    date: '1/1/2024',
    B2B: 228459010.78,
    B2C: 125756681.98,
    Credit_Card: 423520235.24,
    Loans: 62958678
  },
  {
    date: '2/1/2024',
    B2B: 327386970.18,
    B2C: 119103398.05,
    Credit_Card: 439707041.14,
    Loans: 63251712
  },
  {
    date: '3/1/2024',
    B2B: 445370167.87,
    B2C: 149086266.49,
    Credit_Card: 468168217.61,
    Loans: 63127556
  },
  {
    date: '4/1/2024',
    B2B: 514183715.52,
    B2C: 155736421.68,
    Credit_Card: 486999112.4,
    Loans: 60790302
  },
  {
    date: '5/1/2024',
    B2B: 696082492.15,
    B2C: 155196728.46,
    Credit_Card: 508268815.43,
    Loans: 65712716
  },
  {
    date: '6/1/2024',
    B2B: 591443081.33,
    B2C: 153798450.13,
    Credit_Card: 522343516.26,
    Loans: 63099247
  },
  {
    date: '7/1/2024',
    B2B: 718481563.89,
    B2C: 158659733.26,
    Credit_Card: 627230426.14,
    Loans: 72294437
  },
  {
    date: '8/1/2024',
    B2B: 782041328.39,
    B2C: 161811461.27,
    Credit_Card: 634035923.08,
    Loans: 68840989
  },
  {
    date: '9/1/2024',
    B2B: 797568803.15,
    B2C: 183284592.98,
    Credit_Card: 679090877.15,
    Loans: 89762703
  },
  {
    date: '10/1/2024',
    B2B: 1029484702.21,
    B2C: 194966412.28,
    Credit_Card: 806688281.5,
    Loans: 106383985
  },
  {
    date: '11/1/2024',
    B2B: 982548543.22,
    B2C: 208178673.79,
    Credit_Card: 838951500.15,
    Loans: 117754805
  },
  {
    date: '12/1/2024',
    B2B: 990781611.52,
    B2C: 201602077.5,
    Credit_Card: 885722542.5,
    Loans: 142650665.4
  },
  {
    date: '1/1/2025',
    B2B: 815438017.82,
    B2C: 225844463.29,
    Credit_Card: 987517170.58,
    Loans: 166896660.7
  },
  {
    date: '2/1/2025',
    B2B: 1093585541.6,
    B2C: 218296925.83,
    Credit_Card: 1047371109.67,
    Loans: 190400001
  }
]

export const PAYMENT_USAGE_BY_TYPE_CONFIG = {
  B2B: {
    label: 'B2B',
    color: '#8672F9',
    type: CHART_TYPES.bar,
    stackId: 'a'
  },
  B2C: {
    label: 'B2C',
    color: '#70A9FF',
    type: CHART_TYPES.bar,
    stackId: 'a'
  },
  Credit_Card: {
    label: 'Credit Card',
    color: '#51B495',
    type: CHART_TYPES.bar,
    stackId: 'a'
  },
  Loans: {
    label: 'Loans',
    color: '#F7BD5F',
    type: CHART_TYPES.bar,
    stackId: 'a'
  }
} satisfies ChartConfig
