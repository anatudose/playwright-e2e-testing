import { test, expect } from "@playwright/test";

test.describe("Dashboard Redirect", () => {
  test("should see company dashboard after log in", async ({ page }) => {
    page.goto("/");
    const result = page.getByRole("heading", { name: "Dashboard" });
    await expect(result).not.toBeEmpty();
  });
});
