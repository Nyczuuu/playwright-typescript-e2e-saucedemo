import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

type MyFixtures = {
  standardUser: Page;
};

export const test = base.extend<MyFixtures>({
  
  standardUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await use(page);   // przekazujemy zalogowaną stronę do testu
  },
});

export { expect } from '@playwright/test';