import { PlaywrightTestConfig } from '@playwright/test';

type BrowserName = 'chromium' | 'firefox' | 'webkit';

const browserName = (process.env.BROWSER || 'chromium') as BrowserName;

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  retries: 0,
  use: {
    browserName,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    // video: 'on-first-retry',
    launchOptions: {
      // slowMo: 250,
    },
    contextOptions: {
      strictSelectors: true,
    },
  },
  webServer: {
    command: 'npm run storybook',
    port: 6006,
    reuseExistingServer: true,
  },
};
export default config;
