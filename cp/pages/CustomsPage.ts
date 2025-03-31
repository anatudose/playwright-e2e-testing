import { expect, type Locator, type Page } from "@playwright/test";

export class CustomsPage {
  readonly page: Page;
  readonly getBookClearanceHeading: Locator;
  readonly getMyClearancesHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getBookClearanceHeading = this.page.getByRole("heading", {
      name: "Book Clearance",
    });
    this.getMyClearancesHeading = this.page.getByRole("heading", {
      name: "My Clearances",
    });
  }

  async goToBookClearance() {
    await this.page.goto("/customs/book-clearance/carrier");
    await expect(this.getBookClearanceHeading).toBeVisible();
  }

  async goToMyClearances() {
    await this.page.goto("/customs/my-clearances");
    await expect(this.getMyClearancesHeading).toBeVisible();
  }
}
