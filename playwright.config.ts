import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4348',
    launchOptions: process.env.BROWSER_EXECUTABLE
      ? { executablePath: process.env.BROWSER_EXECUTABLE }
      : {}
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1000 }
      }
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' }
    },
    {
      name: 'small-mobile',
      use: { ...devices['iPhone SE'], defaultBrowserType: 'chromium', viewport: { width: 320, height: 800 } }
    }
  ],
  webServer: {
    command: 'npm run demo && npm run demo:serve',
    url: 'http://127.0.0.1:4348',
    reuseExistingServer: false
  },
  reporter: 'list'
})
