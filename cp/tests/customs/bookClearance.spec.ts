import { test } from "@playwright/test";
import { CustomsPage } from "../../pages/CustomsPage";

test.describe("Customs - Book Clearance", () => {
    
  test("should be able to create a new book clearance", async ({ page }) => {
    const customsPage = new CustomsPage(page);
    await customsPage.goToBookClearance()
  });
});
