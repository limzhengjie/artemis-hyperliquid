export async function getStablecoinSupplyData(
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly'
) {
  let url = `https://api.artemisxyz.com/stablecoins-v2/chart/?groupBy=chain&metric=STABLECOIN_SUPPLY`
  url += `&startDate=${startDate}&endDate=${endDate}`
  url += `&granularity=${granularity}`
  url += `&filter=all&chains=all&symbols=all`
  const res = await fetch(url)
  const data = await res.json()

  // Format data by summing values for the same dates
  const formattedData = formatStablecoinData(data)

  return formattedData
}

export async function fetchAllPerpsVolume(
  startDate: string,
  endDate: string,
  _granularity?: 'daily' | 'weekly' | 'monthly'
): Promise<Array<{ date: string; value: number }>> {
  const symbols = 'aevo,apex,avantis,blue,drift,dydx,gns,gmx,hold,hype,jup,ktc,mcb,perp,snx,vrtx,lighter'
  const url = `https://data-svc.artemisxyz.com/data/PERP_VOLUME?symbols=${symbols}&startDate=${startDate}&endDate=${endDate}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  let json: any
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Failed to fetch PERP_VOLUME data: ${res.status} ${res.statusText}`)
    }
    json = await res.json()
  } catch (err) {
    clearTimeout(timeout)
    return []
  }
  clearTimeout(timeout)

  // Expected shape: { data: { symbols: { [symbol]: { PERP_VOLUME: [{ date, val }] } } } }
  const symbolsObj = json?.data?.symbols ?? {}
  const dateToValueSum: Record<string, number> = {}

  Object.values<any>(symbolsObj).forEach((symbolRecord: any) => {
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

export async function fetchHyperliquidPerpVolume(
  startDate: string,
  endDate: string,
  _granularity?: 'daily' | 'weekly' | 'monthly'
): Promise<Array<{ date: string; [symbol: string]: number | string }>> {
  const symbols = 'hype'
  const url = `https://data-svc.artemisxyz.com/data/PERP_VOLUME?symbols=${symbols}&startDate=${startDate}&endDate=${endDate}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  let json: any
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Failed to fetch PERP_VOLUME data: ${res.status} ${res.statusText}`)
    }
    json = await res.json()
  } catch (err) {
    clearTimeout(timeout)
    return []
  }
  clearTimeout(timeout)

  const symbolsObj = json?.data?.symbols ?? {}
  const dateToRow: Record<string, { date: string; [k: string]: number | string }> = {}

  Object.entries<any>(symbolsObj).forEach(([symbol, symbolRecord]) => {
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
  let json: any
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Failed to fetch PERP_VOLUME data: ${res.status} ${res.statusText}`)
    }
    json = await res.json()
  } catch (err) {
    clearTimeout(timeout)
    return []
  }
  clearTimeout(timeout)

  const symbolsObj = json?.data?.symbols ?? {}
  const dateToRow: Record<string, { date: string; [k: string]: number | string }> = {}

  Object.entries<any>(symbolsObj).forEach(([symbol, symbolRecord]) => {
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

/**
 * Formats stablecoin data by summing values for the same dates across all chains
 * @param data The raw stablecoin data grouped by chain
 * @returns An array of objects with date and summed value
 */
function formatStablecoinData(
  data: Record<string, Array<{ date: string; value: number }>>
): Array<{ date: string; value: number }> {
  // Create a map to store the sum of values for each date
  const dateValueMap: Record<string, number> = {}

  // Iterate through each chain
  Object.values(data).forEach(chainData => {
    // Iterate through each date entry in the chain
    chainData.forEach(entry => {
      const { date, value } = entry

      // If the date already exists in the map, add the value to the existing sum
      // Otherwise, initialize the sum with the current value
      dateValueMap[date] = (dateValueMap[date] || 0) + value
    })
  })

  // Convert the map to an array of objects with date and value properties
  let formattedData = Object.entries(dateValueMap).map(([date, value]) => ({
    date,
    value
  }))

  // Sort the array by date in ascending order
  formattedData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Remove trailing entries with zero values
  let lastNonZeroIndex = formattedData.length - 1
  while (lastNonZeroIndex >= 0 && formattedData[lastNonZeroIndex].value === 0) {
    lastNonZeroIndex--
  }

  // If we found any trailing zeros, trim the array
  if (lastNonZeroIndex < formattedData.length - 1) {
    formattedData = formattedData.slice(0, lastNonZeroIndex + 1)
  }

  return formattedData
}
