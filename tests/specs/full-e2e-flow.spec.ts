import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Full E2E User Journey - Saucedemo', () => {

  test('should complete full purchase as standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.verifyOnProductsPage();

    // Step 2: Add products to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    const cartCount = await productsPage.getCartItemsCount();
    expect(cartCount).toBe(2);

    // Step 3: Go to cart
    await productsPage.goToCart();
    await cartPage.verifyOnCartPage();
    await cartPage.verifyProductsInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    // Step 4: Proceed to checkout
    await cartPage.proceedToCheckout();

    // Step 5: Fill shipping information
    await checkoutPage.fillShippingInformation('Jan', 'Kowalski', '00-123');

    // Step 6: Finish purchase
    await checkoutPage.finishPurchase();

    // Step 7: Verify order completion
    await checkoutPage.verifyPurchaseCompleted();

    console.log('🎉 Pełny E2E purchase zakończony sukcesem!');
  });
});