import { test, expect } from '@playwright/test';

test.describe('API Tests - SauceDemo', () => {

  test('should return status 200 for main login page', async ({ request }) => {
    const response = await request.get('/');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    console.log('✅ API: Główna strona logowania zwraca 200 OK');
  });

  test('should return 404 when accessing inventory without authentication', async ({ request }) => {
    const response = await request.get('/inventory.html');

    // Aktualne zachowanie Saucedemo - zwraca 404 dla niezalogowanego użytkownika
    expect(response.status()).toBe(404);

    console.log('✅ API: Próba wejścia na inventory bez logowania zwraca 404');
  });

  test('should return 404 for non-existing page', async ({ request }) => {
    const response = await request.get('/this-page-does-not-exist-xyz123');

    expect(response.status()).toBe(404);

    console.log('✅ API: Nieistniejący endpoint zwraca 404');
  });

});