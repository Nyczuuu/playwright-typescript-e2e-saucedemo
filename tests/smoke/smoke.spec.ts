import { test, expect } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Smoke Tests', () => {

  test('should load login page and have correct title', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(loginPage.loginButton).toBeVisible();
    console.log('✅ Smoke test - Login page loaded successfully');
  });

  test('should show error for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
    console.log('✅ Smoke test - Locked user error displayed');
  });
});