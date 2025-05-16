import { defineConfig, devices } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'list' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "ap_setup",
      testMatch: "ap/tests/ap_auth.setup.ts",
      use: {
        baseURL: "https://thankful-sky-036bea803.5.azurestaticapps.net",
      },
    },

    {
      name: "cp_setup",
      testMatch: "cp/tests/cp_auth.setup.ts",
      use: {
        baseURL: "https://nice-glacier-0ed0b2503.5.azurestaticapps.net",
      },
    },

    {
      name: "Admin Portal",
      testMatch: ["ap/tests/*.spec.ts", "ap/tests/*/*.spec.ts"],
      use: {
        baseURL: "https://thankful-sky-036bea803.5.azurestaticapps.net",
        storageState: "playwright/.auth/admin.json",
      },
      dependencies: ["ap_setup"],
    },

    {
      name: "Client Portal",
      testMatch: ["cp/tests/*.spec.ts", "cp/tests/*/*.spec.ts"],
      use: {
        baseURL: "https://nice-glacier-0ed0b2503.5.azurestaticapps.net",
        storageState: "playwright/.auth/client.json",
      },
      dependencies: ["cp_setup"],
    },

    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     storageState: "playwright/.auth/user.json",
    //   },
    //   dependencies: ["setup"],
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     storageState: "playwright/.auth/user.json",
    //   },
    //   dependencies: ["setup"],
    // },
  ],
});
