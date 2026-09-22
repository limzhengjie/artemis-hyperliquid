import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Chart from '../components/chart'
import { CHART_TYPES, VALUE_FORMAT } from '../constants/chart'
import { formatValue } from '../lib/utils'

test('UI renders an incomplete share as unavailable, not a full chart', () => {
  const html = renderToStaticMarkup(
    React.createElement(Chart, {
      title: 'Tracked share',
      data: [{ date: '2026-08-31', hype: 10, drift: null }],
      dataConfig: {
        hype: { label: 'Hype', type: CHART_TYPES.stacked100, stackId: 'perps' },
        drift: {
          label: 'Drift',
          type: CHART_TYPES.stacked100,
          stackId: 'perps'
        }
      },
      sourceNote: 'Test source · Partial coverage'
    })
  )
  assert.match(html, /No complete observations/)
  assert.match(html, /Partial coverage/)
})
test('UI formatter distinguishes null, zero and negative flows', () => {
  assert.equal(formatValue(null, VALUE_FORMAT.currency), '—')
  assert.equal(formatValue(NaN, VALUE_FORMAT.currency), '—')
  assert.equal(formatValue(0, VALUE_FORMAT.currency), '$0.0')
  assert.equal(formatValue(-1000, VALUE_FORMAT.currency), '−$1.0K')
})
