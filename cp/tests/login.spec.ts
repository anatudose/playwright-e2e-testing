import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Log In", () => {
  test("should be redirected to company dashboard after logging in", async ({ page }) => {
    const loginPage = new LoginPage(page)

    await page.goto("/");
    await expect(loginPage.getHeadingAccounts).toBeVisible();
  });
});
