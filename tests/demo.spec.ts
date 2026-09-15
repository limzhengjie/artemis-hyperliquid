import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test('offline demo: themes, missing/stale/outage, periods, table and export', async ({
  page
}, testInfo) => {
  const errors: string[] = []
  const external: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => {
    if (!request.url().startsWith('http://127.0.0.1:4348'))
      external.push(request.url())
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('#status')).toHaveText('Complete coverage')
  await expect(page.locator('#coverage')).toHaveText('100.0%')
  await expect(page.locator('#share')).not.toHaveText('—')
  await expect(page.locator('#chart polyline')).toHaveCount(3)
  const overflow = () =>
    page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  expect(await overflow()).toBe(false)
  await page.screenshot({
    path: testInfo.outputPath('complete-light.png'),
    fullPage: true
  })
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('body')).toHaveClass('dark')
  await page.screenshot({
    path: testInfo.outputPath('complete-dark.png'),
    fullPage: true
  })
  await page.getByRole('button', { name: '7 days', exact: true }).click()
  await expect(
    page.getByRole('button', { name: '7 days', exact: true })
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('#rows tr')).toHaveCount(7)
  await page.getByRole('button', { name: '31 days', exact: true }).click()
  await page.getByLabel('Data scenario').selectOption('missing')
  await expect(page.locator('#share')).toHaveText('—')
  await expect(page.locator('#volume')).not.toHaveText('—')
  await expect(page.locator('#coverage')).toHaveText('97.8%')
  await expect(
    page.locator('#chart polyline[data-series="lighter"]')
  ).toHaveCount(2)
  await page.getByText('Inspect the observations', { exact: true }).click()
  await expect(page.locator('#rows tr')).toHaveCount(31)
  await expect(page.locator('#rows tr').last()).toContainText('—')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download scenario JSON' }).click()
  const download = await downloadPromise
  const path = await download.path()
  expect(download.suggestedFilename()).toBe('hyperliquid-demo-missing.json')
  const exported = JSON.parse(await readFile(path!, 'utf8'))
  expect(exported.kind).toBe('synthetic')
  expect(exported.result.rows.at(-1).lighter).toBeNull()
  await page.getByLabel('Data scenario').selectOption('stale')
  await expect(page.locator('#volume')).toHaveText('—')
  await expect(page.locator('#source')).toContainText('2026-08-25')
  await expect(page.locator('#source')).toContainText('6 days behind')
  await page.getByLabel('Data scenario').selectOption('offline')
  await expect(page.locator('#volume')).toHaveText('—')
  await expect(page.locator('#coverage')).toHaveText('0.0%')
  await expect(page.locator('#chart polyline')).toHaveCount(0)
  await expect(page.locator('#status')).toHaveText('Source unavailable')
  expect(await overflow()).toBe(false)
  expect(errors).toEqual([])
  expect(external).toEqual([])
})
test('keyboard controls and focus are usable', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('button', { name: 'Switch to dark theme' })
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('body')).toHaveClass('dark')
  await page.keyboard.press('Tab')
  await expect(page.getByLabel('Data scenario')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('button', { name: '7 days', exact: true })
  ).toBeFocused()
  await page.keyboard.press('Space')
  await expect(
    page.getByRole('button', { name: '7 days', exact: true })
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('#rows tr')).toHaveCount(7)
})

test('chart inspection follows pointer, touch and keyboard without inventing missing values', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.getByLabel('Data scenario').selectOption('missing')
  const chart = page.locator('#chart')
  const tooltip = page.locator('#chart-tooltip')
  await chart.focus()
  await page.keyboard.press('Home')
  await expect(tooltip).toContainText('1 Aug 2026')
  await page.keyboard.press('End')
  await expect(tooltip).toContainText('31 Aug 2026')
  await expect(tooltip.locator('[data-value="lighter"]')).toHaveText('Unavailable')
  await expect(tooltip.locator('[data-value="share"]')).toHaveText('Unavailable')
  await expect(tooltip.locator('[data-value="hype"]')).toContainText('$')
  await page.keyboard.press('Escape')
  await expect(tooltip).toBeHidden()
  // A fresh tap must keep its selected date when the SVG gains focus.
  await chart.evaluate(element => (element as SVGSVGElement).blur())

  const point = await chart.evaluate(svg => {
    const element = svg as SVGSVGElement
    const point = element.createSVGPoint()
    point.x = 48 + (element.viewBox.baseVal.width - 60) * 14 / 30
    point.y = 150
    const screen = point.matrixTransform(element.getScreenCTM()!)
    return { x: screen.x, y: screen.y }
  })
  if (testInfo.project.name === 'mobile') await page.touchscreen.tap(point.x, point.y)
  else await page.mouse.move(point.x, point.y)
  await expect(tooltip).toBeVisible()
  await expect(tooltip).toContainText('15 Aug 2026')
  await expect(tooltip.locator('[data-value="lighter"]')).toHaveText('Unavailable')
  const fits = await tooltip.evaluate(element => {
    const bounds = element.getBoundingClientRect()
    const frame = element.parentElement!.getBoundingClientRect()
    return bounds.left >= frame.left && bounds.right <= frame.right
  })
  expect(fits).toBe(true)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  await expect(tooltip).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('chart-inspection.png') })
  await expect(tooltip).toBeVisible()
  await page.getByLabel('Data scenario').selectOption('offline')
  await expect(tooltip).toBeHidden()
  await chart.focus()
  await page.keyboard.press('End')
  await expect(tooltip).toContainText('Unavailable')
  expect(await chart.locator('[data-inspection-dot]').count()).toBe(0)
  await page.getByRole('button', { name: '7 days', exact: true }).click()
  await expect(tooltip).toBeHidden()
})
