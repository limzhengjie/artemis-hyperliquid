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
