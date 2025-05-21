import { CHART_TYPES } from '../chart'
import { ChartConfig } from '@/components/ui/chart'

export const REGION_BY_CURRENCY_CONFIG = {
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

export const REGION_BY_CHAIN_CONFIG = {
  Ethereum: {
    label: 'Ethereum',
    color: '#7297F3',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  },
  Tron: {
    label: 'Tron',
    color: '#E84142',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  },
  Polygon: {
    label: 'Polygon',
    color: '#7B3FE4',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  },
  BSC: {
    label: 'BSC',
    color: '#F5AC37',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  }
} satisfies ChartConfig

export const REGION_BY_CHAIN_CONFIG_WITH_XRP = {
  ...REGION_BY_CHAIN_CONFIG,
  XRP: {
    label: 'XRP',
    color: '#23292F',
    type: CHART_TYPES.stacked100,
    stackId: 'a'
  }
} satisfies ChartConfig

export const LATIN_AMERICA_BY_CHAIN_DATA = [
  {
    country: 'Argentina',
    Polygon: 5.97983168,
    Tron: 35.9339466,
    BSC: 0.45658061,
    Ethereum: 57.622788
  },
  {
    country: 'Brazil',
    Polygon: 0.03356166,
    Tron: 80.69763,
    BSC: 18.1887142,
    Ethereum: 1.07511615
  },
  {
    country: 'Chile',
    Polygon: 0.00846813,
    Tron: 46.0406604,
    BSC: 33.4374595,
    Ethereum: 20.4818464
  },
  {
    country: 'Colombia',
    Polygon: 0.00776979,
    Tron: 95.3844043,
    BSC: 0.04617211,
    Ethereum: 4.56131395
  },
  {
    country: 'Ecuador',
    Polygon: 0.07974209,
    Tron: 78.1930902,
    BSC: 12.2299558,
    Ethereum: 9.47678751
  },
  {
    country: 'Peru',
    Polygon: 0.70973709,
    Tron: 30.8406346,
    BSC: 1.93191281,
    Ethereum: 66.516684
  }
]

export const LATIN_AMERICA_BY_CURRENCY_DATA = [
  {
    country: 'Argentina',
    USDC: 46.64,
    USDT: 53.35
  },
  {
    country: 'Brazil',
    USDC: 6.03,
    USDT: 93.97
  },
  {
    country: 'Chile',
    USDC: 8.95,
    USDT: 91.05
  },
  {
    country: 'Colombia',
    USDC: 1.67,
    USDT: 98.33
  },
  {
    country: 'Ecuador',
    USDC: 0.21,
    USDT: 99.79
  },
  {
    country: 'Peru',
    USDC: 0.01,
    USDT: 99.99
  }
]

export const AFRICA_BY_CHAIN_DATA = [
  {
    country: 'Egypt',
    Polygon: 0.39599143,
    Tron: 75.5267357,
    BSC: 13.9086563,
    Ethereum: 10.1660881
  },
  {
    country: 'Ethiopia',
    Polygon: 0,
    Tron: 81.576233,
    BSC: 3.61076208,
    Ethereum: 14.7872127
  },
  {
    country: 'Ghana',
    Polygon: 0.00360745,
    Tron: 74.6530909,
    BSC: 1.86785206,
    Ethereum: 23.3816399
  },
  {
    country: 'Kenya',
    Polygon: 0.00680641,
    Tron: 44.7975747,
    BSC: 1.07639575,
    Ethereum: 54.1181618
  },
  {
    country: 'Mauritius',
    Polygon: 0.00038395,
    Tron: 79.2534849,
    BSC: 0.01771039,
    Ethereum: 20.7283923
  },
  {
    country: 'Morocco',
    Polygon: 0.09331289,
    Tron: 82.2701034,
    BSC: 8.84628373,
    Ethereum: 8.78530031
  },
  {
    country: 'Nigeria',
    Polygon: 0.00132921,
    Tron: 6.12483108,
    BSC: 0.07765371,
    Ethereum: 93.7939881
  },
  {
    country: 'Seychelles',
    Polygon: 0.00078387,
    Tron: 76.6674942,
    BSC: 5.33354006,
    Ethereum: 17.9978024
  },
  {
    country: 'South Africa',
    Polygon: 0.14594021,
    Tron: 32.4088974,
    BSC: 9.04902271,
    Ethereum: 58.2321797
  },
  {
    country: 'Uganda',
    Polygon: 0.03682915,
    Tron: 26.9816982,
    BSC: 2.2992607,
    Ethereum: 70.6777248
  }
]

export const AFRICA_BY_CURRENCY_DATA = [
  {
    country: 'Egypt',
    USDC: 0.45,
    USDT: 99.55
  },
  {
    country: 'Ethiopia',
    USDC: 0.03,
    USDT: 99.97
  },
  {
    country: 'Ghana',
    USDC: 15.37,
    USDT: 84.63
  },
  {
    country: 'Kenya',
    USDC: 23.59,
    USDT: 76.41
  },
  {
    country: 'Mauritius',
    USDC: 4.83,
    USDT: 95.17
  },
  {
    country: 'Morocco',
    USDC: 0.62,
    USDT: 99.29
  },
  {
    country: 'Nigeria',
    USDC: 29.21,
    USDT: 70.79
  },
  {
    country: 'Seychelles',
    USDC: 0.11,
    USDT: 99.89
  },
  {
    country: 'South Africa',
    USDC: 22.12,
    USDT: 77.88
  },
  {
    country: 'Uganda',
    USDC: 27.34,
    USDT: 72.66
  }
]

export const AMERICAS_BY_CHAIN_DATA = [
  {
    country: 'Bermuda',
    BSC: 6.71997521,
    Ethereum: 0,
    Polygon: 0,
    Tron: 89.9529811
  },
  {
    country: 'Canada',
    BSC: 0.26114366,
    Ethereum: 29.4542219,
    Polygon: 0.01151601,
    Tron: 69.4429391
  },
  {
    country: 'Dominican Republic',
    BSC: 6.36463054,
    Ethereum: 5.44335515,
    Polygon: 0.01259241,
    Tron: 88.0198488
  },
  {
    country: 'Jamaica',
    BSC: 7.09941584,
    Ethereum: 49.2260344,
    Polygon: 0.25648418,
    Tron: 39.6514739
  },
  {
    country: 'Mexico',
    BSC: 0.50189263,
    Ethereum: 35.6500762,
    Polygon: 0.00764546,
    Tron: 63.8361505
  },
  {
    country: 'Panama',
    BSC: 0.00479883,
    Ethereum: 20.3696248,
    Polygon: 0,
    Tron: 79.6255763
  },
  {
    country: 'Puerto Rico',
    BSC: 0.00080744,
    Ethereum: 4.94646262,
    Polygon: 0.0000841,
    Tron: 95.0525891
  },
  {
    country: 'United States',
    BSC: 0.23210207,
    Ethereum: 36.6310878,
    Polygon: 0.54949396,
    Tron: 62.4078213
  }
]

export const AMERICAS_BY_CURRENCY_DATA = [
  {
    country: 'Bermuda',
    USDC: 0.0,
    USDT: 100.0
  },
  {
    country: 'Canada',
    USDC: 2.93,
    USDT: 97.07
  },
  {
    country: 'Dominican Republic',
    USDC: 0.67,
    USDT: 99.31
  },
  {
    country: 'Jamaica',
    USDC: 7.83,
    USDT: 92.17
  },
  {
    country: 'Mexico',
    USDC: 37.19,
    USDT: 62.81
  },
  {
    country: 'Panama',
    USDC: 17.04,
    USDT: 82.96
  },
  {
    country: 'Puerto Rico',
    USDC: 0.89,
    USDT: 99.11
  },
  {
    country: 'United States',
    USDC: 24.73,
    USDT: 75.27
  }
]

export const ASIA_BY_CHAIN_DATA = [
  {
    country: 'China',
    BSC: 2.3833986,
    Ethereum: 5.44971877,
    Polygon: 0.45083498,
    Tron: 91.7160057,
    XRP: 0
  },
  {
    country: 'Hong Kong',
    BSC: 0.1761855,
    Ethereum: 75.7802045,
    Polygon: 0.03615715,
    Tron: 23.9976307,
    XRP: 0.0000181
  },
  {
    country: 'India',
    BSC: 1.63653435,
    Ethereum: 32.2001153,
    Polygon: 45.6940419,
    Tron: 20.4675972,
    XRP: 0.00046977
  },
  {
    country: 'Indonesia',
    BSC: 21.7660454,
    Ethereum: 3.036856,
    Polygon: 0.04950358,
    Tron: 75.1344458,
    XRP: 0.01089954
  },
  {
    country: 'Israel',
    BSC: 0.0998007,
    Ethereum: 96.7556935,
    Polygon: 0.0002178,
    Tron: 3.12973009,
    XRP: 0
  },
  {
    country: 'Japan',
    BSC: 7.94025517,
    Ethereum: 44.5733971,
    Polygon: 0.34077787,
    Tron: 32.2506978,
    XRP: 6.63718474
  },
  {
    country: 'Pakistan',
    BSC: 13.4295262,
    Ethereum: 5.16690145,
    Polygon: 0.26371629,
    Tron: 81.1177376,
    XRP: 0.00017865
  },
  {
    country: 'Philippines',
    BSC: 1.62449582,
    Ethereum: 10.2579611,
    Polygon: 0.13959641,
    Tron: 87.6885599,
    XRP: 0.00011142
  },
  {
    country: 'Singapore',
    BSC: 1.06837887,
    Ethereum: 64.3663828,
    Polygon: 0.04866164,
    Tron: 33.4909401,
    XRP: 0.0204521
  },
  {
    country: 'South Korea',
    BSC: 14.8302498,
    Ethereum: 5.31520751,
    Polygon: 0.24290675,
    Tron: 79.4165579,
    XRP: 0.11116629
  },
  {
    country: 'Thailand',
    BSC: 13.9395844,
    Ethereum: 15.0025027,
    Polygon: 0.29345496,
    Tron: 70.667332,
    XRP: 0.01083968
  },
  {
    country: 'Turkey',
    BSC: 2.85141274,
    Ethereum: 3.89565558,
    Polygon: 0.29714911,
    Tron: 92.9135041,
    XRP: 0.00311622
  },
  {
    country: 'United Arab Emirates',
    BSC: 0.61527309,
    Ethereum: 42.2297598,
    Polygon: 0.00969469,
    Tron: 57.1440624,
    XRP: 0.000042
  },
  {
    country: 'Vietnam',
    BSC: 32.1628022,
    Ethereum: 3.35932688,
    Polygon: 0.49313224,
    Tron: 63.9847132,
    XRP: 0
  }
]

export const ASIA_BY_CURRENCY_DATA = [
  {
    country: 'China',
    USDC: 0.03,
    USDT: 99.97
  },
  {
    country: 'Hong Kong',
    USDC: 1.07,
    USDT: 98.93
  },
  {
    country: 'India',
    USDC: 47.44,
    USDT: 52.56
  },
  {
    country: 'Indonesia',
    USDC: 0.05,
    USDT: 99.95
  },
  {
    country: 'Israel',
    USDC: 0.39,
    USDT: 99.61
  },
  {
    country: 'Japan',
    USDC: 0.22,
    USDT: 99.77
  },
  {
    country: 'Pakistan',
    USDC: 0.02,
    USDT: 99.98
  },
  {
    country: 'Philippines',
    USDC: 1.63,
    USDT: 97.7
  },
  {
    country: 'Singapore',
    USDC: 5.15,
    USDT: 94.85
  },
  {
    country: 'South Korea',
    USDC: 0.04,
    USDT: 99.96
  },
  {
    country: 'Thailand',
    USDC: 0.17,
    USDT: 99.83
  },
  {
    country: 'Turkey',
    USDC: 0.03,
    USDT: 99.97
  },
  {
    country: 'United Arab Emirates',
    USDC: 9.53,
    USDT: 90.47
  },
  {
    country: 'Vietnam',
    USDC: 0.06,
    USDT: 99.94
  }
]

export const EUROPE_BY_CHAIN_DATA = [
  {
    country: 'Belgium',
    BSC: 6.60773604,
    Ethereum: 12.0038118,
    Polygon: 0.52240079,
    Tron: 80.859267,
    XRP: 0
  },
  {
    country: 'Finland',
    BSC: 17.4218786,
    Ethereum: 17.0824107,
    Polygon: 0.87706561,
    Tron: 64.6039328,
    XRP: 0
  },
  {
    country: 'France',
    BSC: 4.49957644,
    Ethereum: 12.7402227,
    Polygon: 1.14370968,
    Tron: 81.3126354,
    XRP: 0.01812881
  },
  {
    country: 'Germany',
    BSC: 2.85918573,
    Ethereum: 29.1205895,
    Polygon: 0.24847758,
    Tron: 67.6986516,
    XRP: 0.00048979
  },
  {
    country: 'Ireland',
    BSC: 2.37143594,
    Ethereum: 27.6578138,
    Polygon: 0.23512455,
    Tron: 69.5059987,
    XRP: 0.00424637
  },
  {
    country: 'Netherlands',
    BSC: 5.38240766,
    Ethereum: 34.3053643,
    Polygon: 0.01434099,
    Tron: 59.915312,
    XRP: 0.02070103
  },
  {
    country: 'Portugal',
    BSC: 2.77826535,
    Ethereum: 26.013178,
    Polygon: 0.37524841,
    Tron: 70.8199992,
    XRP: 0.01247178
  },
  {
    country: 'Spain',
    BSC: 2.13846565,
    Ethereum: 71.3229189,
    Polygon: 0.04063197,
    Tron: 26.4922112,
    XRP: 0.00557901
  },
  {
    country: 'Switzerland',
    BSC: 1.73489574,
    Ethereum: 33.4539878,
    Polygon: 0.06161065,
    Tron: 64.7313488,
    XRP: 0.00093677
  },
  {
    country: 'United Kingdom',
    BSC: 3.72273769,
    Ethereum: 23.2909741,
    Polygon: 0.65820324,
    Tron: 71.7581974,
    XRP: 0.1989903
  }
]

export const EUROPE_BY_CURRENCY_DATA = [
  {
    country: 'Belgium',
    USDC: 1.48,
    USDT: 98.52
  },
  {
    country: 'Finland',
    USDC: 0.13,
    USDT: 99.87
  },
  {
    country: 'France',
    USDC: 6.01,
    USDT: 93.99
  },
  {
    country: 'Germany',
    USDC: 1.86,
    USDT: 98.14
  },
  {
    country: 'Ireland',
    USDC: 0.77,
    USDT: 99.22
  },
  {
    country: 'Netherlands',
    USDC: 0.08,
    USDT: 99.92
  },
  {
    country: 'Portugal',
    USDC: 2.55,
    USDT: 97.45
  },
  {
    country: 'Spain',
    USDC: 1.46,
    USDT: 98.54
  },
  {
    country: 'Switzerland',
    USDC: 0.64,
    USDT: 99.36
  },
  {
    country: 'United Kingdom',
    USDC: 6.58,
    USDT: 93.42
  }
]
