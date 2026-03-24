import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly cartTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartTitle = page.locator('.title').getByText('Your Cart');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  async verifyOnCartPage() {
    await expect(this.cartTitle).toBeVisible();
    await expect(this.cartItems.first()).toBeVisible();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async verifyProductsInCart(expectedProducts: string[]) {
    for (const product of expectedProducts) {
      await expect(this.itemNames.filter({ hasText: product })).toBeVisible();
    }
  }
}