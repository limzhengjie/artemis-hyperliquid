import { promises as fs } from 'fs'
import path from 'path'

import { CHART_TYPES } from '../chart'
import type { ChartConfig } from '@/components/ui/chart'

// Canonical token keys we will expose in the chart/config
const TOKEN_KEYS = [
  'USDT',
  'USDC',
  'USDe',
  'feUSD',
  'USDHL',
  'USDXL',
  'USR',
  'USH',
  'thBILL',
  'USDH'
] as const

export type HyperevmStablecoinToken = (typeof TOKEN_KEYS)[number]

export type HyperevmStablecoinRow = {
  date: string
} & Partial<Record<HyperevmStablecoinToken, number>>

// Map raw CSV names to canonical keys used in the chart config
function normalizeTokenName(raw: string): HyperevmStablecoinToken | undefined {
  switch (raw) {
    // Tether on HyperEVM is labelled with the T-symbol in the CSV
    case 'USD₮0':
      return 'USDT'
    // Pass-through canonical names
    case 'USDC':
    case 'USDe':
    case 'feUSD':
    case 'USDHL':
    case 'USDXL':
    case 'USR':
    case 'USH':
    case 'thBILL':
    case 'USDH':
      return raw as HyperevmStablecoinToken
    default:
      return undefined
  }
}

// Colors chosen to be distinct and consistent with other charts in the app
export const HYPEREVM_STABLECOIN_STACKED_CONFIG: ChartConfig = {
  USDT: { label: 'USDT', color: '#26A17B', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  USDC: { label: 'USDC', color: '#2775CA', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  USDe: { label: 'USDe', color: '#5E9EFD', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  feUSD: { label: 'feUSD', color: '#8C7CF7', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  USDHL: { label: 'USDHL', color: '#F7BD5F', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  USDXL: { label: 'USDXL', color: '#BA68C8', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  USR: { label: 'USR', color: '#26C6DA', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  USH: { label: 'USH', color: '#51B495', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  thBILL: { label: 'thBILL', color: '#FF8A65', type: CHART_TYPES.bar, stackId: 'hyperevm' },
  USDH: { label: 'USDH', color: '#90A4AE', type: CHART_TYPES.bar, stackId: 'hyperevm' }
}

// Load and aggregate the CSV into stacked-bar friendly rows
export async function loadHyperevmStablecoinsStackedData(): Promise<HyperevmStablecoinRow[]> {
  const csvPath = path.join(process.cwd(), 'HyperEVM_Stablecoins.csv')
  const raw = await fs.readFile(csvPath, 'utf-8')

  const lines = raw.split(/\r?\n/).filter(Boolean)
  // Expect header: day,contract_address,name,total_supply,total_stablecoin_supply
  const [, ...rows] = lines

  const byDate: Record<string, Partial<Record<HyperevmStablecoinToken, number>>> = {}

  for (const line of rows) {
    const parts = line.split(',')
    if (parts.length < 5) continue
    const day = parts[0]
    const nameRaw = parts[2]
    const totalSupplyStr = parts[3]

    const key = normalizeTokenName(nameRaw)
    if (!key) continue

    const totalSupply = Number(totalSupplyStr)
    if (!Number.isFinite(totalSupply)) continue

    if (!byDate[day]) byDate[day] = {}
    byDate[day][key] = (byDate[day][key] || 0) + totalSupply
  }

  const dates = Object.keys(byDate).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))

  const result: HyperevmStablecoinRow[] = dates.map(date => {
    const base: HyperevmStablecoinRow = { date }
    for (const token of TOKEN_KEYS) {
      const value = byDate[date][token]
      if (typeof value === 'number' && Number.isFinite(value)) {
        base[token] = value
      } else {
        base[token] = 0
      }
    }
    return base
  })

  return result
}


