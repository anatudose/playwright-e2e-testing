import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Log In", () => {
  test("should be redirected to company dashboard after logging in", async ({ page }) => {
    const dashboardPage = new DashboardPage(page)

    await page.goto("/");
    await expect(dashboardPage.getDashboardHeading).toBeVisible()
  });
});
