import { Locator, Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  // Główna strona produktów
  readonly productsTitle: Locator;
  readonly inventoryItems: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsTitle = page.locator('.title').getByText('Products');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('button[id^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortContainer = page.locator('.product_sort_container');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addProductToCart(productName: string) {
    const addButton = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: /add to cart/i });

    await addButton.click();
    console.log(`Dodano produkt: ${productName}`);
  }

  async addFirstNProducts(count: number = 2) {
    const buttons = await this.addToCartButtons.all();
    for (let i = 0; i < Math.min(count, buttons.length); i++) {
      await buttons[i].click();
      await this.page.waitForTimeout(300); // małe opóźnienie dla stabilności
    }
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getCartItemsCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const countText = await this.cartBadge.textContent();
      return parseInt(countText || '0', 10);
    }
    return 0;
  }

  async verifyOnProductsPage() {
    await expect(this.productsTitle).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }
  
  async sortByPriceLowToHigh() {
    await this.sortContainer.selectOption('lohi');
  }

  async getAllProductNames(): Promise<string[]> {
    // Pobieramy wszystkie nazwy produktów
    const nameLocators = this.page.locator('.inventory_item_name');
    const names = await nameLocators.allTextContents();
    
    // Czyścimy białe znaki z każdej nazwy
    return names.map(name => name.trim());
  }

  async getProductPrice(productName: string): Promise<number> {
    const priceLocator = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('.inventory_item_price');

    const priceText = await priceLocator.textContent();
    
    if (!priceText) {
      throw new Error(`Cena produktu "${productName}" nie została znaleziona`);
    }

    // Usuwamy znak $ i zamieniamy na number
    return parseFloat(priceText.replace('$', '').trim());
  }

  // Ta metoda powinna być używana tylko na stronie koszyka!
  async removeProductFromCart(productName: string) {
    const removeButton = this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: /remove/i });

    await removeButton.click();
    console.log(`Usunięto produkt z koszyka: ${productName}`);
  }

}