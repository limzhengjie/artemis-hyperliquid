export async function fetchAllPerpsVolume(
  startDate: string,
  endDate: string
): Promise<Array<{ date: string; value: number }>> {
  const symbols = 'aevo,apex,avantis,blue,drift,dydx,gns,gmx,hold,hype,jup,ktc,mcb,perp,snx,vrtx,lighter'
  const url = `https://data-svc.artemisxyz.com/data/PERP_VOLUME?symbols=${symbols}&startDate=${startDate}&endDate=${endDate}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  let json: unknown
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Failed to fetch PERP_VOLUME data: ${res.status} ${res.statusText}`)
    }
    json = await res.json()
  } catch {
    clearTimeout(timeout)
    return []
  }
  clearTimeout(timeout)

  // Expected shape: { data: { symbols: { [symbol]: { PERP_VOLUME: [{ date, val }] } } } }
  const symbolsObj = (json as { data?: { symbols?: Record<string, unknown> } })?.data?.symbols ?? {}
  const dateToValueSum: Record<string, number> = {}

  Object.values(symbolsObj as Record<string, { PERP_VOLUME?: Array<{ date: string; val: number | null }> }> ).forEach((symbolRecord) => {
    const seriesRaw = symbolRecord?.PERP_VOLUME
    const series: Array<{ date: string; val: number | null }> = Array.isArray(seriesRaw) ? seriesRaw : []
    series.forEach(point => {
      const d = point.date
      const v = point.val ?? 0
      dateToValueSum[d] = (dateToValueSum[d] || 0) + (typeof v === 'number' ? v : 0)
    })
  })

  const formatted = Object.entries(dateToValueSum)
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Trim trailing null/zero totals if present
  let lastIdx = formatted.length - 1
  while (lastIdx >= 0 && (!formatted[lastIdx].value || formatted[lastIdx].value === 0)) {
    lastIdx--
  }
  return lastIdx < formatted.length - 1 ? formatted.slice(0, lastIdx + 1) : formatted
}



export async function fetchAllSpotDEXVolume(
  startDate: string,
  endDate: string
): Promise<Array<{ date: string; [symbol: string]: number | string }>> {
  const symbols = 'ray,cake,hype,orca,uni'
  const url = `https://data-svc.artemisxyz.com/data/SPOT_VOLUME?symbols=${symbols}&startDate=${startDate}&endDate=${endDate}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  let json: unknown
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Failed to fetch SPOT_VOLUME data: ${res.status} ${res.statusText}`)
    }
    json = await res.json()
  } catch {
    clearTimeout(timeout)
    return []
  }
  clearTimeout(timeout)

  // Expected shape: { data: { symbols: { [symbol]: { SPOT_VOLUME: [{ date, val }] } } } }
  const symbolsObj = (json as { data?: { symbols?: Record<string, unknown> } })?.data?.symbols ?? {}
  const dateToRow: Record<string, { date: string; [k: string]: number | string }> = {}

  Object.entries(symbolsObj as Record<string, { SPOT_VOLUME?: Array<{ date: string; val: number | null }> }>).forEach(([symbol, symbolRecord]) => {
    const seriesRaw = symbolRecord?.SPOT_VOLUME
    const series: Array<{ date: string; val: number | null }> = Array.isArray(seriesRaw) ? seriesRaw : []
    series.forEach(point => {
      const d = point.date
      const v = point.val ?? 0
      if (!dateToRow[d]) dateToRow[d] = { date: d }
      dateToRow[d][symbol] = typeof v === 'number' ? v : 0
    })
  })

  const rows = Object.values(dateToRow).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Trim trailing rows where all symbol values are 0 or missing
  const symbolKeys = Object.keys(symbolsObj)
  let lastIdx = rows.length - 1
  const isRowZero = (row: { [k: string]: number | string }) =>
    symbolKeys.every(key => typeof row[key] !== 'number' || (row[key] as number) === 0)
  while (lastIdx >= 0 && isRowZero(rows[lastIdx])) lastIdx--

  return lastIdx < rows.length - 1 ? rows.slice(0, lastIdx + 1) : rows
}

export async function fetchHyperliquidPerpVolume(
  startDate: string,
  endDate: string
): Promise<Array<{ date: string; [symbol: string]: number | string }>> {
  const symbols = 'hype'
  const url = `https://data-svc.artemisxyz.com/data/PERP_VOLUME?symbols=${symbols}&startDate=${startDate}&endDate=${endDate}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  let json: unknown
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Failed to fetch PERP_VOLUME data: ${res.status} ${res.statusText}`)
    }
    json = await res.json()
  } catch {
    clearTimeout(timeout)
    return []
  }
  clearTimeout(timeout)

  const symbolsObj = (json as { data?: { symbols?: Record<string, unknown> } })?.data?.symbols ?? {}
  const dateToRow: Record<string, { date: string; [k: string]: number | string }> = {}

  Object.entries(symbolsObj as Record<string, { PERP_VOLUME?: Array<{ date: string; val: number | null }> }> ).forEach(([symbol, symbolRecord]) => {
    const seriesRaw = symbolRecord?.PERP_VOLUME
    const series: Array<{ date: string; val: number | null }> = Array.isArray(seriesRaw) ? seriesRaw : []
    series.forEach(point => {
      const d = point.date
      const v = point.val ?? 0
      if (!dateToRow[d]) dateToRow[d] = { date: d }
      // Use the symbol key as-is so consumers can map colors/labels easily
      dateToRow[d][symbol] = typeof v === 'number' ? v : 0
    })
  })

  const rows = Object.values(dateToRow).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Optionally trim trailing rows where all symbol values are 0 or missing
  const symbolKeys = Object.keys(symbolsObj)
  let lastIdx = rows.length - 1
  const isRowZero = (row: { [k: string]: number | string }) =>
    symbolKeys.every(key => typeof row[key] !== 'number' || (row[key] as number) === 0)
  while (lastIdx >= 0 && isRowZero(rows[lastIdx])) lastIdx--

  return lastIdx < rows.length - 1 ? rows.slice(0, lastIdx + 1) : rows
}

// Per-venue perp volumes for stacked charts
export async function fetchPerpVolumeByVenue(
  startDate: string,
  endDate: string
): Promise<Array<{ date: string; [symbol: string]: number | string }>> {
  const symbols = 'aevo,apex,avantis,blue,drift,dydx,gns,gmx,hold,hype,jup,ktc,mcb,perp,snx,vrtx,lighter'
  const url = `https://data-svc.artemisxyz.com/data/PERP_VOLUME?symbols=${symbols}&startDate=${startDate}&endDate=${endDate}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  let json: unknown
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Failed to fetch PERP_VOLUME data: ${res.status} ${res.statusText}`)
    }
    json = await res.json()
  } catch {
    clearTimeout(timeout)
    return []
  }
  clearTimeout(timeout)

  const symbolsObj = (json as { data?: { symbols?: Record<string, unknown> } })?.data?.symbols ?? {}
  const dateToRow: Record<string, { date: string; [k: string]: number | string }> = {}

  Object.entries(symbolsObj as Record<string, { PERP_VOLUME?: Array<{ date: string; val: number | null }> }> ).forEach(([symbol, symbolRecord]) => {
    const seriesRaw = symbolRecord?.PERP_VOLUME
    const series: Array<{ date: string; val: number | null }> = Array.isArray(seriesRaw) ? seriesRaw : []
    series.forEach(point => {
      const d = point.date
      const v = point.val ?? 0
      if (!dateToRow[d]) dateToRow[d] = { date: d }
      dateToRow[d][symbol] = typeof v === 'number' ? v : 0
    })
  })

  const rows = Object.values(dateToRow).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const symbolKeys = Object.keys(symbolsObj)
  let lastIdx = rows.length - 1
  const isRowZero = (row: { [k: string]: number | string }) =>
    symbolKeys.every(key => typeof row[key] !== 'number' || (row[key] as number) === 0)
  while (lastIdx >= 0 && isRowZero(rows[lastIdx])) lastIdx--

  return lastIdx < rows.length - 1 ? rows.slice(0, lastIdx + 1) : rows
}

export async function fetchOpenInterestByVenue(
  startDate: string
): Promise<Array<{ date: string;[symbol: string]: number | string }>> {
  const symbols = 'hype,drift,polymarket,lighter,kalshi'
  const endDateOI = '2025-09-18'
  const url = `https://data-svc.artemisxyz.com/data/OPEN_INTEREST?symbols=${symbols}&startDate=${startDate}&endDate=${endDateOI}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  let json: unknown
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Failed to fetch OPEN_INTEREST data: ${res.status} ${res.statusText}`)
    }
    json = await res.json()
  } catch {
    clearTimeout(timeout)
    return []
  }
  clearTimeout(timeout)

  const symbolsObj = (json as { data?: { symbols?: Record<string, unknown> } })?.data?.symbols ?? {}
  const dateToRow: Record<string, { date: string;[k: string]: number | string }> = {}

  Object.entries(symbolsObj as Record<string, { OPEN_INTEREST?: Array<{ date: string; val: number | null }> }> ).forEach(([symbol, symbolRecord]) => {
    const seriesRaw = symbolRecord?.OPEN_INTEREST
    const series: Array<{ date: string; val: number | null }> = Array.isArray(seriesRaw) ? seriesRaw : []
    series.forEach(point => {
      const d = point.date
      const v = point.val ?? 0
      if (!dateToRow[d]) dateToRow[d] = { date: d }
      dateToRow[d][symbol] = typeof v === 'number' ? v : 0
    })
  })

  const rows = Object.values(dateToRow).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const symbolKeys = Object.keys(symbolsObj)
  let lastIdx = rows.length - 1
  const isRowZero = (row: { [k: string]: number | string }) =>
    symbolKeys.every(key => typeof row[key] !== 'number' || (row[key] as number) === 0)
  while (lastIdx >= 0 && isRowZero(rows[lastIdx])) lastIdx--

  return lastIdx < rows.length - 1 ? rows.slice(0, lastIdx + 1) : rows
}