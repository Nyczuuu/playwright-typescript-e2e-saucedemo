import { test, expect } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';


test.describe('Add to Cart Functionality', () => {

    test('should add products to cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);    

        // === Step 1: Login ===
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        // === Step 2: Add products to cart ===
        await productsPage.goto();
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.addProductToCart('Sauce Labs Bike Light');

        const cartCount = await productsPage.getCartItemsCount();
        expect(cartCount).toBe(2);  

        console.log('✅ Produkty zostały dodane do koszyka poprawnie!');
    });

});