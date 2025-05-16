import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/LoginPage";

const authFile = path.join(__dirname, "../../playwright/.auth/admin.json");

setup("admin portal authentication", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto("");
  await loginPage.enterEmail(process.env.AP_EMAIL_ADDRESS!);
  await loginPage.clickNextButton();
  await loginPage.enterPassword(process.env.AP_PASSWORD!);
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
