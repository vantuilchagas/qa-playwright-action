const { test, expect } = require('@playwright/test');

const baseURL = 'https://jsonplaceholder.typicode.com';

// TC-API-001: Consultar publicação existente
test('TC-API-001 - Consultar publicação existente', async ({ request }) => {

  const response = await request.get(`${baseURL}/posts/1`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.userId).toBe(1);

});

// TC-API-002: Consultar publicação inexistente
test('TC-API-002 - Consultar publicação inexistente', async ({ request }) => {

  const response = await request.get(`${baseURL}/posts/999999`);

  expect(response.status()).toBe(404);

});