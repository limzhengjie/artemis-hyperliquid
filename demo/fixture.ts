import {
  normalizeMetric,
  percentageRows,
  qualityNote,
  datesBetween
} from '../lib/market-data'

export const DEMO_START = '2026-08-01'
export const DEMO_END = '2026-08-31'
export const DEMO_VENUES = ['hype', 'drift', 'lighter']
export const DEMO_LABELS: Record<string, string> = {
  hype: 'Hyperliquid',
  drift: 'Drift',
  lighter: 'Lighter'
}
export function buildScenarios() {
  return ['complete', 'missing', 'stale', 'offline'].map(scenario => {
    const symbols = Object.fromEntries(
      DEMO_VENUES.map((symbol, index) => [
        symbol,
        {
          PERP_VOLUME: datesBetween(DEMO_START, DEMO_END)
            .map((date, i) => ({
              date,
              val: Math.round(
                (index === 0
                  ? 2_400_000_000
                  : index === 1
                    ? 450_000_000
                    : 900_000_000) *
                  (1 + i * 0.012 + Math.sin(i * 0.43 + index) * 0.11)
              )
            }))
            .filter((_, i) => scenario !== 'stale' || i < 25)
            .map((point, i) => ({
              ...point,
              val:
                scenario === 'missing' &&
                symbol === 'lighter' &&
                (i === 14 || i === 30)
                  ? null
                  : point.val
            }))
        }
      ])
    )
    const result = normalizeMetric(
      scenario === 'offline' ? {} : { data: { symbols } },
      'PERP_VOLUME',
      DEMO_VENUES,
      DEMO_START,
      DEMO_END
    )
    result.source = 'Synthetic fixture'
    if (scenario === 'offline') result.error = 'Simulated source outage'
    return {
      id: scenario,
      result,
      shares: percentageRows(result.rows, { perps: DEMO_VENUES }),
      note: qualityNote(result)
    }
  })
}
