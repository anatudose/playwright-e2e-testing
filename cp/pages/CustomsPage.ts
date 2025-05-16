import { expect, type Locator, type Page } from "@playwright/test";
import { generateFBANumber } from "../utils/utils";
import { customsTable } from "../utils/constants";

export class CustomsPage {
  readonly page: Page;
  readonly getBookClearanceHeading: Locator;
  readonly getMyClearancesHeading: Locator;
  readonly getCarrier: Locator;
  readonly getFBANumber: Locator;
  readonly getSelectDestinationField: Locator;
  readonly getDestinationsList: Locator;
  readonly getNextButton: Locator;
  readonly getBookingTerms: Locator;
  readonly getBookingTermsCloseButton: Locator;
  readonly getBookClearanceButton: Locator;
  readonly getSubmitClearanceFormButton: Locator;
  readonly getStep: (stepName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.getBookClearanceHeading = this.page.getByRole("heading", {
      name: "Book Clearance",
    });
    this.getMyClearancesHeading = this.page.getByRole("heading", {
      name: "My Clearances",
    });
    this.getCarrier = this.page.getByLabel("1Carrier").locator("div");
    this.getFBANumber = this.page.getByPlaceholder("FBA number");
    this.getSelectDestinationField = this.page.getByLabel("Select destination");
    this.getDestinationsList = this.page.getByRole("listbox");
    this.getNextButton = this.page.locator("button", { hasText: "Next" });
    this.getBookClearanceButton = this.page.getByLabel("Book clearance");
    this.getSubmitClearanceFormButton = this.page
      .getByLabel("Book a clearance")
      .getByLabel("Book clearance");
      
    this.getBookingTerms = this.page
      .getByLabel("Booking Terms")
      .locator("div")
      .first();

    this.getStep = (stepName: string) => {
      return this.page.getByRole("tab", { name: stepName });
    };
    this.getBookingTermsCloseButton = this.page
      .locator("div")
      .filter({ hasText: /^Booking Terms$/ })
      .locator("button");
  }

  async goToBookClearance() {
    await this.page.goto("/customs/book-clearance/carrier");
    await expect(this.getBookClearanceHeading).toBeVisible();
  }

  async goToMyClearances() {
    await this.page.goto("/customs/my-clearances");
    await expect(this.getMyClearancesHeading).toBeVisible();
  }

  async clickOnCarrier(name: string) {
    await this.getCarrier.locator("p", { hasText: name }).click();
  }

  async inputFBANumber(fbaNumber: string = generateFBANumber()) {
    await this.getFBANumber.fill(fbaNumber);
  }

  async selectDestination(destination: string) {
    await this.getSelectDestinationField.click();
    await this.getDestinationsList
      .locator("li", { hasText: destination })
      .click();
  }

  async goToNextStep() {
    await this.getNextButton.click();
  }

  async closeBookingTermsPopUp() {
    await this.getBookingTermsCloseButton.click();

    const notification = await this.page.getByRole("button", {
      name: "No, thanks",
    });

    if (await notification.isVisible()) {
      await notification.click();
    }
  }

  async fillClearanceDetails(options: {
    description: string;
    asin: string;
    hsCode: number;
    origin: string;
    quantity: string;
    netWeight: string;
    grossWeight: string;
    unitCost: string;
  }) {
    await this.page.locator("#descriptionOfGoods").fill(options.description);
    await this.page.locator("#asin").fill(options.asin);
    await this.page.locator("#hsCode").fill(options.hsCode.toString());
    await this.page
      .locator("span")
      .filter({ hasText: "Select country" })
      .click();
    await this.page.getByRole("option", { name: options.origin }).click();
    await this.page.locator("#quantity").fill(options.quantity.toString());
    await this.page.locator("#netWeight").fill(options.netWeight.toString());
    await this.page
      .locator("#grossWeight")
      .fill(options.grossWeight.toString());
    await this.page.locator("#unitCost").fill(options.unitCost.toString());
  }

  getClearanceRowCell(row: number, cell: string) {
    const cellNr = customsTable[cell].columnIndex;
    return this.page.getByRole("row").nth(row).getByRole("cell").nth(cellNr!);
  }

  // tbd
  // validateClearanceTable(row: number, data: CustomsData) {
  //   expect(this.getClearanceRowCell(1, data.hsCode.columnName)).toContainText(
  //     data.hsCode.columnName
  //   );
  //   const cellNr = rowToIndexMapping.get(cell);
  //   console.log(cell)
  // }
}
