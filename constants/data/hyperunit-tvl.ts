import { CHART_TYPES } from '../chart'
import type { ChartConfig } from '@/components/ui/chart'

export const HYPERUNIT_TVL_DATA = [
  { date: '2025-09-03', sol_tvl: 65173150.052193604, fart_tvl: 78122383.91500045, pump_tvl: 128657683.0147624, spx_tvl: 4377072.96700705, bonk_tvl: 1187139.016672023, eth_tvl: 258602308.31679216, btc_tvl: 356997709.74304277 },
  { date: '2025-09-04', sol_tvl: 63071684.2509815, fart_tvl: 74598162.29262231, pump_tvl: 138329566.2920017, spx_tvl: 4289857.848225146, bonk_tvl: 1149986.5595999227, eth_tvl: 260345547.07262853, btc_tvl: 355146426.1631306 },
  { date: '2025-09-05', sol_tvl: 65627497.35371008, fart_tvl: 73400214.89751215, pump_tvl: 146223624.6583725, spx_tvl: 4111998.474406065, bonk_tvl: 1167366.5347581697, eth_tvl: 241407351.58980477, btc_tvl: 361074422.90602 },
  { date: '2025-09-06', sol_tvl: 64080535.3925363, fart_tvl: 71307975.15200253, pump_tvl: 152662832.9896171, spx_tvl: 4129034.9082238944, bonk_tvl: 1059855.4097307327, eth_tvl: 234060841.79332235, btc_tvl: 360954924.93822116 },
  { date: '2025-09-07', sol_tvl: 62518165.28385357, fart_tvl: 71528109.48407, pump_tvl: 154962985.29643273, spx_tvl: 4177206.3028296274, bonk_tvl: 1085668.2101741969, eth_tvl: 231174505.46042758, btc_tvl: 361438909.106607 },
  { date: '2025-09-08', sol_tvl: 67354868.06628771, fart_tvl: 78870119.70308393, pump_tvl: 164225970.08194295, spx_tvl: 4952510.624754365, bonk_tvl: 1198491.3479048696, eth_tvl: 230059389.90701395, btc_tvl: 362993405.51963466 },
  { date: '2025-09-09', sol_tvl: 73948265.86495554, fart_tvl: 85504367.17509048, pump_tvl: 168119211.5933051, spx_tvl: 5215672.148162194, bonk_tvl: 1430418.1146892025, eth_tvl: 226085917.201633, btc_tvl: 378746278.41594976 },
  { date: '2025-09-10', sol_tvl: 74155834.27415214, fart_tvl: 92161657.35934584, pump_tvl: 187287047.30772072, spx_tvl: 5419163.549669904, bonk_tvl: 1298812.2316712826, eth_tvl: 221949305.66572165, btc_tvl: 385525140.89216065 },
  { date: '2025-09-11', sol_tvl: 79317756.63707331, fart_tvl: 97073781.12396105, pump_tvl: 199698376.76020938, spx_tvl: 5386148.350040804, bonk_tvl: 1655096.770226095, eth_tvl: 216142403.44960633, btc_tvl: 377963562.71443427 },
  { date: '2025-09-12', sol_tvl: 87149334.87619762, fart_tvl: 102519126.74575365, pump_tvl: 206463229.94861177, spx_tvl: 5455771.09831306, bonk_tvl: 1587756.2701268236, eth_tvl: 216587469.3248857, btc_tvl: 375498883.9866608 },
  { date: '2025-09-13', sol_tvl: 91676067.02050772, fart_tvl: 107858223.49971698, pump_tvl: 220421845.21819863, spx_tvl: 5566752.2774399845, bonk_tvl: 1765853.2411866707, eth_tvl: 235247996.8187157, btc_tvl: 381818084.8504925 },
  { date: '2025-09-14', sol_tvl: 91882214.71929875, fart_tvl: 107908672.56146987, pump_tvl: 266762521.16815037, spx_tvl: 5310172.425754043, bonk_tvl: 1574497.5946493456, eth_tvl: 229534989.8801032, btc_tvl: 515837832.89537126 },
  { date: '2025-09-15', sol_tvl: 82797590.05082484, fart_tvl: 99954732.01925376, pump_tvl: 271721316.22802323, spx_tvl: 4994871.952048029, bonk_tvl: 1428160.3913805883, eth_tvl: 223570141.11289832, btc_tvl: 470170990.200597 },
  { date: '2025-09-16', sol_tvl: 83234006.04527628, fart_tvl: 98271112.27925624, pump_tvl: 274388501.89314926, spx_tvl: 4973672.151711894, bonk_tvl: 1457776.9579746448, eth_tvl: 216657155.69277582, btc_tvl: 527196292.2225983 },
  { date: '2025-09-17', sol_tvl: 86561139.42245436, fart_tvl: 100051944.78729632, pump_tvl: 254896688.15928543, spx_tvl: 5081459.564331259, bonk_tvl: 1308815.6147922657, eth_tvl: 210652183.5698848, btc_tvl: 454168066.67435956 },
]

export const HYPERUNIT_TVL_CONFIG: ChartConfig = {
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
  yAxisKeys: ['btc_tvl', 'eth_tvl', 'sol_tvl', 'pump_tvl', 'fart_tvl', 'spx_tvl', 'bonk_tvl'],
  title: 'HyperUnit TVL by Asset (Weekly)',
  description: 'Weekly Total Value Locked (TVL) breakdown by asset on HyperUnit',
}
