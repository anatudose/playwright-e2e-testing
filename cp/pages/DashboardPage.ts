import { type Locator, type Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly getDashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getDashboardHeading = page.getByRole("heading", { name: "Dashboard" });
  }
}
