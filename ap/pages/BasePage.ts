import { expect, type Locator, type Page } from "@playwright/test";
import { CURRENT_CLIENT_NAME } from "../../common/constants";

export class BasePage {
  readonly page: Page;
  readonly getSearchCompanyButton: Locator;
  readonly getHeading: Locator;
  readonly getSearchCompanyField: Locator;
  readonly loader: Locator;
  readonly getSearchCompanyDropdownResult: (result: string) => Locator;
  readonly getSelectedClientName: (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.getSearchCompanyButton = page.getByRole("button", {
      name: "Search [⌘+K]",
    });
    this.getHeading = page
      .locator("div")
      .filter({ hasText: "Search company" })
      .nth(2);
    this.getSearchCompanyField = page.getByPlaceholder("Search");
    this.loader = page.getByRole("listitem").locator("div").nth(1);
    
    this.getSearchCompanyDropdownResult = (result: string) => {
      return page.getByLabel("Search company").getByText(result);
    };
    this.getSelectedClientName = (name: string) => {
      return page.getByRole("heading").filter({ hasText: name });
    };
  }

  async selectCompany(companyName: string = CURRENT_CLIENT_NAME) {
    await this.getSearchCompanyButton.click();
    await expect(this.getHeading).toBeVisible();
    await this.getSearchCompanyField.fill(companyName);
    await expect(this.loader).not.toBeVisible({ timeout: 10_000 });
    await expect(
      this.getSearchCompanyDropdownResult(CURRENT_CLIENT_NAME)
    ).toBeVisible({ timeout: 10_000 });
    await this.getSearchCompanyDropdownResult(CURRENT_CLIENT_NAME).click();
    await expect(this.getSelectedClientName(CURRENT_CLIENT_NAME)).toBeVisible();
  }
}
