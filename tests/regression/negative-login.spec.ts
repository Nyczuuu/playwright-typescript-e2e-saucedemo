import { test, expect } from '../../fixtures/auth.fixture';
import { users } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Negative Login Scenarios', () => {

  test('should fail with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  // Data-driven test – testujemy wielu użytkowników
  test('should handle different user types', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Test dla locked user
    await loginPage.goto();
    await loginPage.login(users.locked.username, users.locked.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });
});