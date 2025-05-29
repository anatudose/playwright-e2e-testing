import test, { expect } from "@playwright/test";
import { BusinessServices } from "../../../common/ap-api/business-services/service";
import {
  BusinessServiceEnum,
  CURRENT_CLIENT_NAME,
} from "../../../common/constants";
import { BasePage } from "../../pages/BasePage";
import { LoginPage } from "../../pages/LoginPage";
import { BusinessServicesPage } from "../../pages/BusinessServices";

test.describe("Business Services", () => {
  const bs = new BusinessServices();
  const businessServiceId = BusinessServiceEnum.Xhipment;

  test.beforeEach(async () => {
    const availableServices = await bs.getClientBusinessServices();
    const serviceId = availableServices.find(
      (service) => service.serviceId == businessServiceId
    )?.id;

    if (serviceId) {
      await bs.deleteBusinessService(serviceId);
    }
  });

  test.afterAll(async () => {
    const availableServices = await bs.getClientBusinessServices();
    const serviceId = availableServices.find(
      (service) => service.serviceId == businessServiceId
    )?.id;

    console.log(serviceId)

    if (!serviceId) {
      await bs.postBusinessService();
    }
  });

  test("should be able to successfully add a bussiness service", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const businessServicesPage = new BusinessServicesPage(page);

    await page.goto("/");
    await expect(loginPage.getHeading).toBeVisible();
    await basePage.selectCompany(CURRENT_CLIENT_NAME);
    await businessServicesPage.goToBusinessServicesPage();
  });
});
