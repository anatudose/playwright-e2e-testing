import { type Locator, type Page } from "@playwright/test";

export class BusinessServicesPage {
  readonly page: Page;
  readonly getBusinessServicesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getBusinessServicesButton = page.getByText("Business services");
  }

  async goToBusinessServicesPage() {
    await this.getBusinessServicesButton.click()
  }
}
