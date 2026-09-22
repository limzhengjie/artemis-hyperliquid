import { normalizeMetric, type MetricResult } from './market-data'

// Fixed, explicitly disclosed comparison cohort. Never shrink it automatically on an outage.
export const PERP_VENUES = [
  'apex',
  'avantis',
  'dydx',
  'gns',
  'gmx',
  'hype',
  'jup',
  'lighter'
]
export const SPOT_VENUES = ['ray', 'cake', 'hype', 'orca', 'uni']
export const OI_VENUES = ['hype', 'drift', 'polymarket', 'lighter', 'kalshi']

export async function fetchMetric(
  metric: string,
  symbols: string[],
  startDate: string,
  endDate: string,
  fetcher: typeof fetch = fetch
): Promise<MetricResult> {
  // Validate before the request. Failures are surfaced to the UI; demo fixtures never replace live data.
  const empty = normalizeMetric({}, metric, symbols, startDate, endDate)
  const url = new URL(`https://data-svc.artemisxyz.com/data/${metric}`)
  url.search = new URLSearchParams({
    symbols: symbols.join(','),
    startDate,
    endDate
  }).toString()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)
  try {
    const response = await fetcher(url, {
      signal: controller.signal,
      next: { revalidate: 300 }
    })
    if (!response.ok)
      return { ...empty, rows: [], error: `HTTP ${response.status}` }
    return normalizeMetric(
      await response.json(),
      metric,
      symbols,
      startDate,
      endDate
    )
  } catch (error) {
    return {
      ...empty,
      rows: [],
      error:
        error instanceof Error && error.name === 'AbortError'
          ? 'Request timed out'
          : 'Source could not be read'
    }
  } finally {
    clearTimeout(timeout)
  }
}
export const fetchPerpVolumeByVenue = (start: string, end: string) =>
  fetchMetric('PERP_VOLUME', PERP_VENUES, start, end)
export const fetchAllSpotDEXVolume = (start: string, end: string) =>
  fetchMetric('SPOT_VOLUME', SPOT_VENUES, start, end)
export const fetchHyperliquidPerpVolume = (start: string, end: string) =>
  fetchMetric('PERP_VOLUME', ['hype'], start, end)
export const fetchOpenInterestByVenue = (start: string, end: string) =>
  fetchMetric('OPEN_INTEREST', OI_VENUES, start, end)
