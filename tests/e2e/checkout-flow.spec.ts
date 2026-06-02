import { test, expect } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Flow', () => {

  test('should complete purchase successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.goto();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingInformation('Jan', 'Kowalski', '00-123');
    await checkoutPage.finishPurchase();

    await checkoutPage.verifyPurchaseCompleted();

    console.log('🎉 Checkout zakończony sukcesem!');
  });
});