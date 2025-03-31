import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly getPasswordField: Locator;
  readonly getEmailField: Locator;
  readonly getSignInButton: Locator;
  readonly getSelectCompanyText: Locator;
  readonly getLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPasswordField = page.getByRole("textbox", { name: "Password" });
    this.getEmailField = page.getByRole("textbox", { name: "Email Address" });
    this.getSignInButton = page.getByRole("button", { name: "Sign in" });
    this.getSelectCompanyText = page.getByText(
      "Select which company profile you’d like to access"
    );
    this.getLogo = page.getByAltText("logo");
  }

  async enterEmail(email: string) {
    await this.getEmailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.getPasswordField.fill(password);
  }

  async clickSignIn() {
    await this.getSignInButton.click();
  }

  async selectCompanyProfile(profileName: string) {
    await this.page.getByText(profileName).click();
  }
}
