import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

type Fixtures = {
  loggedInPage: Page;
  standardUser: Page;
  problemUser: Page;
};

export const test = base.extend<Fixtures>({

  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await use(page);
  },

  standardUser: async ({ loggedInPage }, use) => {
    await use(loggedInPage);
  },

  problemUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.problem.username, users.problem.password);
    await use(page);
  },
});

export { expect } from '@playwright/test';