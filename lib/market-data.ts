/** Shared by the live dashboard and the offline demo. Daily observations use UTC. */
export type MetricRow = { date: string; [key: string]: string | number | null }
export type Observation = { date: string; value: number | null }
export type MetricResult = {
  rows: MetricRow[]
  symbols: string[]
  metric: string
  source: string
  startDate: string
  endDate: string
  asOf: string | null
  observed: number
  expected: number
  status: 'complete' | 'partial' | 'unavailable'
  error?: string
}
const DAY = 86_400_000
export const finiteValue = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null
export function isDay(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  )
}
export function datesBetween(start: string, end: string): string[] {
  if (!isDay(start) || !isDay(end) || start > end)
    throw new Error('Invalid daily date range')
  const count = Math.round((Date.parse(end) - Date.parse(start)) / DAY) + 1
  if (count > 3660) throw new Error('Daily range exceeds ten years')
  return Array.from({ length: count }, (_, i) =>
    new Date(Date.parse(start) + i * DAY).toISOString().slice(0, 10)
  )
}
const record = (input: unknown): Record<string, unknown> =>
  input !== null && typeof input === 'object' && !Array.isArray(input)
    ? (input as Record<string, unknown>)
    : {}
export function normalizeMetric(
  input: unknown,
  metric: string,
  requested: string[],
  startDate: string,
  endDate: string
): MetricResult {
  const symbols = [...new Set(requested.map(s => s.toLowerCase()))]
  if (!symbols.length) throw new Error('At least one venue is required')
  const rows: MetricRow[] = datesBetween(startDate, endDate).map(date =>
    Object.assign({ date }, Object.fromEntries(symbols.map(s => [s, null])))
  )
  const byDate = new Map(rows.map(row => [row.date, row]))
  const rawSymbols = record(record(record(input).data).symbols)
  const seen = new Set<string>()
  for (const [rawSymbol, rawRecord] of Object.entries(rawSymbols)) {
    const symbol = rawSymbol.toLowerCase()
    if (!symbols.includes(symbol)) continue
    const points = record(rawRecord)[metric]
    if (!Array.isArray(points)) continue
    for (const rawPoint of points) {
      const point = record(rawPoint)
      if (!isDay(point.date)) continue
      const row = byDate.get(point.date)
      if (!row) continue
      const key = `${symbol}:${point.date}`
      // Duplicate/conflicting observations need upstream resolution, not silent double counting.
      const value = finiteValue(point.val)
      row[symbol] = seen.has(key) || value === null || value < 0 ? null : value
      seen.add(key)
    }
  }
  const observed = rows.reduce(
    (total, row) =>
      total + symbols.filter(s => finiteValue(row[s]) !== null).length,
    0
  )
  const expected = rows.length * symbols.length
  const asOf =
    rows.filter(row => symbols.some(s => finiteValue(row[s]) !== null)).at(-1)
      ?.date ?? null
  return {
    rows,
    symbols,
    metric,
    startDate,
    endDate,
    source: 'Artemis API',
    asOf,
    observed,
    expected,
    status:
      observed === 0
        ? 'unavailable'
        : observed === expected
          ? 'complete'
          : 'partial'
  }
}
export function qualityNote(result: MetricResult): string {
  if (result.status === 'unavailable')
    return `${result.source} · Unavailable${result.error ? ` (${result.error})` : ' — no valid observations'}`
  const lag = Math.round(
    (Date.parse(result.endDate) - Date.parse(result.asOf!)) / DAY
  )
  return `${result.source} · Latest observation ${result.asOf} · ${result.observed}/${result.expected} observations${result.status === 'partial' ? ' · Partial coverage' : ''}${lag > 0 ? ` · ${lag} day${lag === 1 ? '' : 's'} behind requested end` : ''}`
}
export function sumRows(rows: MetricRow[], keys: string[]): Observation[] {
  return rows.map(row => ({
    date: row.date,
    value:
      keys.length > 0 && keys.every(k => finiteValue(row[k]) !== null)
        ? keys.reduce((sum, k) => sum + (row[k] as number), 0)
        : null
  }))
}
export function percentageRows<
  T extends Record<string, string | number | null>
>(
  rows: T[],
  groups: Record<string, string[]>
): Array<T & Record<string, string | number | null>> {
  return rows.map(row => {
    const copy = { ...row } as T & Record<string, string | number | null>
    for (const [stack, keys] of Object.entries(groups)) {
      const complete =
        keys.length > 0 &&
        keys.every(k => finiteValue(row[k]) !== null && (row[k] as number) >= 0)
      const total = complete
        ? keys.reduce((sum, k) => sum + (row[k] as number), 0)
        : 0
      for (const key of keys)
        (copy as Record<string, string | number | null>)[
          `${key}_percentage_${stack}`
        ] = complete && total > 0 ? ((row[key] as number) / total) * 100 : null
    }
    return copy
  })
}
export function aggregateWeeks(series: Observation[]): Observation[] {
  const groups = new Map<string, Observation[]>()
  for (const point of series) {
    if (!isDay(point.date)) continue
    const timestamp = Date.parse(point.date)
    const monday = new Date(
      timestamp - ((new Date(timestamp).getUTCDay() + 6) % 7) * DAY
    )
      .toISOString()
      .slice(0, 10)
    groups.set(monday, [...(groups.get(monday) ?? []), point])
  }
  return [...groups]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, points]) => ({
      date,
      value:
        points.length === 7 &&
        new Set(points.map(p => p.date)).size === 7 &&
        points.every(p => finiteValue(p.value) !== null)
          ? points.reduce((sum, p) => sum + p.value!, 0)
          : null
    }))
}
export function comparison(
  series: Observation[],
  daysBack: number
): { value: number | null; pctChange: number | null } {
  const sorted = series
    .filter(p => isDay(p.date))
    .toSorted((a, b) => a.date.localeCompare(b.date))
  const latest = sorted.at(-1)
  if (!latest || finiteValue(latest.value) === null)
    return { value: null, pctChange: null }
  const target = new Date(Date.parse(latest.date) - daysBack * DAY)
    .toISOString()
    .slice(0, 10)
  const past = sorted.find(p => p.date === target)
  if (!past || finiteValue(past.value) === null)
    return { value: null, pctChange: null }
  const value = latest.value! - past.value!
  return {
    value,
    pctChange: past.value === 0 ? null : (value / past.value!) * 100
  }
}
