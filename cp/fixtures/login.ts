import { test as baseTest } from "@playwright/test";
import { CPConsts } from "../consts/cp-consts";

export const authenticatedTests = baseTest.extend<{ page: any }>({
  page: async ({ browser }, use) => {
    const page = await browser.newPage();

    await page.goto(CPConsts.clientPortalBaseUrl);
    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("valerii.tudose+test@avaskgroup.com");
    await page.getByRole("textbox", { name: "Password" }).fill("avaskitc");
    await page.getByRole("button", { name: "Sign in" }).click();

    await page.waitForNavigation();
    await use(page);
  },
});
