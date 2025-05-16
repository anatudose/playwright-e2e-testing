import { expect, test } from "@playwright/test";
import { generateFBANumber } from "../../../cp/utils/utils";
import { CustomsPage } from "../../../cp/pages/CustomsPage";
import { customsTable } from "../../../cp/utils/constants";

test.describe("Customs - Book Clearance", () => {
  test("should be able to successfully create a new clearance", async ({
    page,
  }) => {
    console.log("i ran");
  });
});
