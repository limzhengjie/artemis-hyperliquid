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
