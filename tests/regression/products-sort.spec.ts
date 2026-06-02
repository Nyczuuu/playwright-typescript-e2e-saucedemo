import { test, expect } from '../../fixtures/auth.fixture';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products Sorting', () => {

  test('should sort products by price low to high', async ({ standardUser: page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();
    await productsPage.verifyOnProductsPage();

    // Wybierz sortowanie: Price (low to high)
    await productsPage.sortContainer.selectOption('lohi');

    // Pobierz wszystkie ceny
    const priceTexts = await productsPage.page.locator('.inventory_item_price').allTextContents();
    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));

    // Sprawdź czy ceny są posortowane rosnąco
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
    console.log('✅ Products sorted correctly by price (low to high)');
  });

  test('should sort products by name A to Z', async ({ standardUser: page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();
    await productsPage.sortContainer.selectOption('az');

    const itemNames = await productsPage.page.locator('.inventory_item_name').allTextContents();
    const sortedNames = [...itemNames].sort();

    expect(itemNames).toEqual(sortedNames);
    console.log('✅ Products sorted correctly by name (A to Z)');
  });
});