import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/LoginPage";
import { getApEnvVar } from "../utils/utils";

const authFile = path.join(__dirname, "../../playwright/.auth/admin.json");

setup("admin portal authentication", async ({ page }) => {
  const loginPage = new LoginPage(page);

  const responsePromise = page.waitForResponse(response =>
    response.url().includes('/api/Clients/SearchClients?name=') && response.status() === 200
        && response.request().method() === 'GET'
  );

  await page.goto("");
  await loginPage.enterEmail(getApEnvVar().adminPortalEmailAddress);
  await loginPage.clickNextButton();
  await loginPage.enterPassword(getApEnvVar().adminPortalPassword);
  await loginPage.clickSignInButton();
  await loginPage.clickNoButton();
  await expect(page).toHaveTitle(/Admin Portal/);
  await expect(loginPage.getHeading).toBeVisible();
  await page.context().storageState({ path: authFile });

  const token = (await responsePromise).request().headers().authorization
  process.env.AP_BEARER_TOKEN = token
});
