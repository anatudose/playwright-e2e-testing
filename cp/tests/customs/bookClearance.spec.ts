import { expect, test } from "@playwright/test";
import { CustomsPage } from "../../pages/CustomsPage";
import { generateFBANumber } from "../../utils/utils";
import { customsTable } from "../../utils/constants";

test.describe("Customs - Book Clearance", () => {
  test("should be able to successfully create a new clearance", async ({
    page,
  }) => {
    const carrierName = "UPS Pallets";
    const destination = "BCN1 – Barcelona";
    const fbaNumber = generateFBANumber();
    const customsPage = new CustomsPage(page);

    await customsPage.goToBookClearance();
    await expect(customsPage.getStep("Carrier")).toBeEnabled();

    await customsPage.clickOnCarrier(carrierName);
    await expect(customsPage.getStep("Address details")).toBeEnabled();

    await customsPage.inputFBANumber(fbaNumber);
    await customsPage.selectDestination(destination);
    await customsPage.goToNextStep();
    await expect(customsPage.getBookingTerms).toBeVisible();
    await customsPage.closeBookingTermsPopUp();
    await expect(customsPage.getStep("Items")).toBeEnabled();

    await customsPage.getBookClearanceButton.click();

    const clearanceDetails = {
      description: "test description",
      asin: "1234567891",
      hsCode: 12365489,
      origin: "Afghanistan",
      quantity: "5.00",
      netWeight: "2.00",
      grossWeight: "3.00",
      unitCost: "4.00",
    };

    await customsPage.fillClearanceDetails(clearanceDetails);
    await customsPage.getSubmitClearanceFormButton.click();

    await expect(customsPage.getStep("Items")).toBeEnabled();
    await expect(page.getByText(`${fbaNumber}U00001`)).toBeVisible();

    await expect(
      customsPage.getClearanceRowCell(1, customsTable.description.columnName)
    ).toContainText(clearanceDetails.description);

    await expect(
      customsPage.getClearanceRowCell(1, customsTable.asin.columnName)
    ).toContainText(clearanceDetails.asin);
    await expect(
      customsPage.getClearanceRowCell(1, customsTable.hsCode.columnName)
    ).toContainText(`${clearanceDetails.hsCode}`);
    await expect(
      customsPage.getClearanceRowCell(1, customsTable.origin.columnName)
    ).toContainText("AF");
    await expect(
      customsPage.getClearanceRowCell(1, customsTable.quantity.columnName)
    ).toContainText(clearanceDetails.quantity);
    await expect(
      customsPage.getClearanceRowCell(1, customsTable.netWeight.columnName)
    ).toContainText(clearanceDetails.netWeight);
    await expect(
      customsPage.getClearanceRowCell(1, customsTable.grossWeight.columnName)
    ).toContainText(clearanceDetails.grossWeight);
    await expect(
      customsPage.getClearanceRowCell(1, customsTable.unitCost.columnName)
    ).toContainText(clearanceDetails.unitCost);
    await expect(
      customsPage.getClearanceRowCell(1, customsTable.totalCost.columnName)
    ).toContainText(
      `${+clearanceDetails.quantity * +clearanceDetails.unitCost}`
    );

    await customsPage.goToNextStep();
  });
});
