import test from 'node:test'
import assert from 'node:assert/strict'
import {
  normalizeMetric,
  percentageRows,
  aggregateWeeks,
  comparison,
  qualityNote,
  sumRows
} from '../lib/market-data'
import {
  fetchOpenInterestByVenue,
  fetchMetric
} from '../lib/fetchHyperliquidData'

const start = '2026-09-01',
  end = '2026-09-03'
const payload = (a: unknown[], b: unknown[] = []) => ({
  data: { symbols: { HYPE: { PERP_VOLUME: a }, drift: { PERP_VOLUME: b } } }
})
const point = (date: string, val: unknown) => ({ date, val })
const read = (input: unknown) =>
  normalizeMetric(input, 'PERP_VOLUME', ['hype', 'drift'], start, end)

test('zeros survive; null, numeric strings and absent days remain missing', () => {
  const result = read(
    payload(
      [point(start, 0), point(end, '12')],
      [point(start, 10), point(end, null)]
    )
  )
  assert.deepEqual(result.rows, [
    { date: start, hype: 0, drift: 10 },
    { date: '2026-09-02', hype: null, drift: null },
    { date: end, hype: null, drift: null }
  ])
  assert.equal(result.asOf, start)
  assert.equal(result.status, 'partial')
  assert.equal(result.observed, 2)
})
test('unexpected venues, impossible dates and duplicates cannot inflate totals', () => {
  const result = read(
    payload(
      [point(start, 2), point(start, 3), point('2026-02-30', 90)],
      [point(start, 10)]
    )
  )
  assert.equal(result.rows[0].hype, null)
  assert.equal(sumRows(result.rows, ['hype', 'drift'])[0].value, null)
})
test('shares require a complete positive denominator; missing is not a 100% share', () => {
  const rows = [
    { date: start, hype: 10, drift: null },
    { date: end, hype: 0, drift: 0 },
    { date: '2026-09-04', hype: 0, drift: 10 }
  ]
  const shares = percentageRows(rows, { perps: ['hype', 'drift'] })
  assert.equal(shares[0].hype_percentage_perps, null)
  assert.equal(shares[1].hype_percentage_perps, null)
  assert.equal(shares[2].hype_percentage_perps, 0)
  assert.equal(shares[2].drift_percentage_perps, 100)
  assert.equal(rows[2].hype, 0)
})
test('totals need every tracked venue and preserve all-zero totals', () => {
  assert.deepEqual(
    sumRows(
      [
        { date: start, a: 0, b: 0 },
        { date: end, a: 10, b: null }
      ],
      ['a', 'b']
    ),
    [
      { date: start, value: 0 },
      { date: end, value: null }
    ]
  )
})
test('weeks require all seven dated observations, including zero', () => {
  const rows = Array.from({ length: 7 }, (_, i) => ({
    date: `2026-09-${String(7 + i).padStart(2, '0')}`,
    value: i
  }))
  assert.equal(aggregateWeeks(rows)[0].value, 21)
  assert.equal(aggregateWeeks(rows.slice(1))[0].value, null)
  assert.equal(
    aggregateWeeks(
      rows.map((r, i) => ({ ...r, value: i === 3 ? null : r.value }))
    )[0].value,
    null
  )
})
test('comparisons use the series as-of date, exact calendar interval, and guard zero', () => {
  assert.deepEqual(
    comparison(
      [
        { date: start, value: 10 },
        { date: end, value: 15 }
      ],
      2
    ),
    { value: 5, pctChange: 50 }
  )
  assert.deepEqual(
    comparison(
      [
        { date: start, value: 10 },
        { date: end, value: 15 }
      ],
      7
    ),
    { value: null, pctChange: null }
  )
  assert.deepEqual(
    comparison(
      [
        { date: start, value: 0 },
        { date: end, value: 15 }
      ],
      2
    ),
    { value: 15, pctChange: null }
  )
  assert.deepEqual(
    comparison(
      [
        { date: start, value: 10 },
        { date: end, value: null }
      ],
      2
    ),
    { value: null, pctChange: null }
  )
})
test('freshness describes observations, not the retrieval time', () => {
  const result = read(payload([point(start, 1)], [point(start, 2)]))
  assert.match(qualityNote(result), /2026-09-01/)
  assert.match(qualityNote(result), /2 days behind/)
  assert.match(qualityNote(read({})), /Unavailable/)
})
test('HTTP failure is explicit and never replaced by fixture data', async () => {
  const result = await fetchMetric(
    'PERP_VOLUME',
    ['hype'],
    start,
    end,
    async () => new Response('{}', { status: 503 })
  )
  assert.equal(result.status, 'unavailable')
  assert.equal(result.error, 'HTTP 503')
  assert.equal(result.rows.length, 0)
})
test('malformed responses and aborts are explicit failures', async () => {
  for (const fetcher of [
    async () => new Response('invalid'),
    async () => {
      throw new DOMException('aborted', 'AbortError')
    }
  ]) {
    const result = await fetchMetric(
      'PERP_VOLUME',
      ['hype'],
      start,
      end,
      fetcher
    )
    assert.equal(result.status, 'unavailable')
    assert.ok(result.error)
  }
})
test('open interest uses requested end date, not the old 2025 cutoff', async () => {
  const original = globalThis.fetch
  let url = ''
  globalThis.fetch = async input => {
    url = String(input)
    return new Response(JSON.stringify({ data: { symbols: {} } }))
  }
  try {
    await fetchOpenInterestByVenue(start, end)
    assert.equal(new URL(url).searchParams.get('endDate'), end)
  } finally {
    globalThis.fetch = original
  }
})

test('invalid date windows, empty cohorts and non-finite values fail closed', () => {
  assert.throws(
    () => normalizeMetric({}, 'PERP_VOLUME', [], start, end),
    /venue/
  )
  assert.throws(
    () => normalizeMetric({}, 'PERP_VOLUME', ['hype'], '2026-02-30', end),
    /date range/
  )
  const result = read(
    payload([point(start, Infinity), point(end, -1)], [point(start, NaN)])
  )
  assert.equal(result.status, 'unavailable')
  assert.equal(result.observed, 0)
})
