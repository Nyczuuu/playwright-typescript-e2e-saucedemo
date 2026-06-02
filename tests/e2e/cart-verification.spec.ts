import { test, expect } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart Verification', () => {

  test('should display correct products in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.goto();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.goToCart();

    await cartPage.verifyOnCartPage();
    await cartPage.verifyProductsInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    console.log('✅ Koszyk zawiera poprawne produkty');
  });
});