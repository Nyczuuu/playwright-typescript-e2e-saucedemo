import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Gdzie znajdują się testy (nowa struktura)
  testDir: './tests',

  // Timeouty
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },

  // Uruchamianie testów równolegle
  fullyParallel: true,
  workers: process.env.CI ? 3 : undefined,

  // Ile razy ponawiać nieudane testy
  retries: process.env.CI ? 2 : 0,

  // Nie pozwalaj na testy z .only w CI
  forbidOnly: !!process.env.CI,

  // Reporterzy
  reporter: [
    ['html', { open: 'never' }],                    // Playwright HTML report
    ['list'],                                       // ładne logi w terminalu
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      suiteTitle: 'SauceDemo E2E Framework'
    }]
  ],

  // Globalne ustawienia dla wszystkich testów
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    trace: 'on-first-retry',      // zapisuje trace tylko przy pierwszym niepowodzeniu
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Konfiguracja przeglądarek
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Global setup / teardown (będziemy dodawać później)
  // globalSetup: './fixtures/global-setup.ts',
});