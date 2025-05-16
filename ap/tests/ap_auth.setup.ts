import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/LoginPage";
import { getApEnvVar } from "../utils/utils";

const authFile = path.join(__dirname, "../../playwright/.auth/admin.json");

setup("admin portal authentication", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto("");
  await loginPage.enterEmail(getApEnvVar().adminPortalEmailAddress);
  await loginPage.clickNextButton();
  await loginPage.enterPassword(getApEnvVar().adminPortalPassword);
  await loginPage.clickSignInButton();
  await loginPage.clickNoButton();
  await expect(page).toHaveTitle(/Admin Portal/);
  await expect(loginPage.getHeading).toBeVisible();
  await page.context().storageState({ path: authFile });

  const sessionStorage = (await page.context().storageState()).origins;

  process.env.AP_BEARER_TOKEN = JSON.parse(
    `${sessionStorage[0].localStorage[5].value}`
  ).secret;
});
