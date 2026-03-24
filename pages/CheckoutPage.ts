import { Locator, Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Checkout Step 1 (Your Information)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  // Checkout Step 2 (Overview)
  readonly finishButton: Locator;
  readonly totalPrice: Locator;
  readonly itemTotal: Locator;

  // Checkout Complete
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step 1
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');

    // Step 2
    this.finishButton = page.locator('[data-test="finish"]');
    this.totalPrice = page.locator('.summary_total_label');
    this.itemTotal = page.locator('.summary_subtotal_label');

    // Complete page
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillShippingInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishPurchase() {
    await this.finishButton.click();
  }

  async verifyOrderTotal(expectedTotal: string) {
    await expect(this.totalPrice).toContainText(expectedTotal);
  }

  async verifyPurchaseCompleted() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.backHomeButton).toBeVisible();
  }

  async goBackToHome() {
    await this.backHomeButton.click();
  }
}