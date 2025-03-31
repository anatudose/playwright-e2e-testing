import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("");
  await page
    .getByRole("textbox", { name: "Email Address" })
    .fill(process.env.EMAIL_ADDRESS!);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.PASSWORD!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.pause();
  await expect(page).toHaveTitle(/Client Portal/);
  await expect(page).toHaveURL(new RegExp("/company-profile-select/*"), {
    timeout: 10_000,
  });
  await expect(page.getByAltText("logo")).toBeVisible();
  await expect(
    page.getByText("Select which company profile you’d like to access")
  ).toBeVisible();
  await page.getByText("Devsoft").click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).not.toBeEmpty({
    timeout: 20_000,
  });

  await page.context().storageState({ path: authFile });
});
