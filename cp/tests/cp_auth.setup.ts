import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { getCpEnvVar } from "../utils/utils";

const cpAuthFile = path.join(__dirname, "../../playwright/.auth/client.json");

setup("client portal authentication", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await page.goto("");
  await loginPage.enterEmail(getCpEnvVar().cpEmailAddress);
  await loginPage.enterPassword(getCpEnvVar().cpPassword);
  await loginPage.clickSignIn();

  await expect(page).toHaveTitle(/Client Portal/);
  await expect(page).toHaveURL(new RegExp("/company-profile-select/*"), {
    timeout: 10_000,
  });
  await expect(loginPage.getLogo).toBeVisible();

  //select company profile
  await expect(loginPage.getSelectCompanyText).toBeVisible();
  await loginPage.selectCompanyProfile("Devsoft");
  await expect(dashboardPage.getDashboardHeading).toBeVisible({
    timeout: 10_000,
  });

  await page.context().storageState({ path: cpAuthFile });
});
