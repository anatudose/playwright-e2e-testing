import { test, expect } from "@playwright/test";
import { CPConsts } from "./consts/cp-consts";

test.describe("test client portal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(CPConsts.clientPortalBaseUrl);
    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("valerii.tudose+test@avaskgroup.com");
    await page.getByRole("textbox", { name: "Password" }).fill("avaskitc");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveTitle(/Client/);
  });

  test("requires company select after login", async ({ page }) => {
    const result = await page.getByText(
      "Select which company profile you’d like to access"
    );

    await expect(result).not.toBeEmpty();
  });

  test("select company to onboarding", async ({ page }) => {
    await page.getByText("Devsoft").click();

    const result = page.getByText("Welcome to AVASK");
    await expect(result).not.toBeEmpty();
  });
});
