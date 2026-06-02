import { test, expect } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Data-Driven Tests', () => {

  const shippingData = [
    {
      name: 'standard address',
      firstName: 'Jan',
      lastName: 'Kowalski',
      postalCode: '00-123'
    },
    {
      name: 'long name address',
      firstName: 'Sebastian',
      lastName: 'Nowakowski',
      postalCode: '99-999'
    },
  ];

  for (const data of shippingData) {
    test(`should complete checkout with ${data.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      // Logowanie
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');

      // Dodanie produktów
      await productsPage.goto();
      await productsPage.addProductToCart('Sauce Labs Backpack');
      await productsPage.goToCart();

      // Przejście do checkoutu
      await cartPage.proceedToCheckout();

      // Wypełnienie danych wysyłkowych
      await checkoutPage.fillShippingInformation(
        data.firstName, 
        data.lastName, 
        data.postalCode
      );

      // Zakończenie zakupu
      await checkoutPage.finishPurchase();

      // Sprawdzenie sukcesu
      await checkoutPage.verifyPurchaseCompleted();

      console.log(`✅ Checkout z danymi ${data.name} zakończony sukcesem`);
    });
  }
});