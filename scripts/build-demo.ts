import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { buildScenarios, DEMO_LABELS } from '../demo/fixture'
const scenarios = buildScenarios()
const payload = JSON.stringify({ scenarios, labels: DEMO_LABELS }).replaceAll(
  '<',
  '\\u003c'
)
const template = readFileSync(
  new URL('../demo/template.html', import.meta.url),
  'utf8'
)
const output = resolve('demo-dist')
mkdirSync(output, { recursive: true })
writeFileSync(
  resolve(output, 'index.html'),
  template.replace('/*__DEMO_DATA__*/', payload)
)
writeFileSync(
  resolve(output, 'observations.json'),
  JSON.stringify({ schemaVersion: 1, kind: 'synthetic', scenarios }, null, 2) +
    '\n'
)
console.log(`Offline demo: ${output}/index.html`)
