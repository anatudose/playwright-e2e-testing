import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly getPasswordField: Locator;
  readonly getEmailField: Locator;
  readonly getNextButton: Locator;
  readonly getNoButton: Locator;
  readonly getSignInButton: Locator;
  readonly getLogo: Locator;
  readonly getHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPasswordField = page.getByRole("textbox", { name: "Password" });
    this.getEmailField = page.getByPlaceholder("firstname.lastname@avaskgroup");
    this.getNextButton = page.getByRole("button", { name: "Next" });
    this.getSignInButton = page.getByRole('button', { name: 'Sign in' })
    this.getLogo = page.getByAltText("logo");
    this.getNoButton = page.getByRole('button', { name: 'No' });
    this.getHeading = page.getByRole('heading', { name: 'Admin portal' })

  }

  async enterEmail(email: string) {
    await expect(this.getEmailField).toBeVisible();
    await this.getEmailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.getPasswordField.fill(password);
  }

  async clickNextButton() {
    await this.getNextButton.click();
  }

  async clickSignInButton() {
    await this.getSignInButton.click();
  }

  async clickNoButton() {
    await this.getNoButton.click();
  }
}
