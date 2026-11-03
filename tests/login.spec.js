
const { test, expect } = require('@playwright/test');

const URL = 'https://the-internet.herokuapp.com/login';

// CA-01 | RN-01, RN-03
test('TC-LOGIN-001 - Login com credenciais válidas', async ({ page }) => {
  await page.goto(URL);

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

// CA-02 | RN-01, RN-02
test('TC-LOGIN-002 - Rejeitar usuário inválido', async ({ page }) => {
  await page.goto(URL);

  await page.locator('#username').fill('usuario_invalido');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/login/);
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});

// CA-03 | RN-01, RN-02
test('TC-LOGIN-003 - Rejeitar senha inválida', async ({ page }) => {
  await page.goto(URL);

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('senha_incorreta');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/login/);
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});

// CA-04 | RF-01
test('TC-LOGIN-004 - Validar formulário de login', async ({ page }) => {
  await page.goto(URL);

  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
//TC-LOGIN-005
test('TC-LOGIN-005 - Encerrar sessão após login', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/secure/);

  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page).toHaveURL(/\/login/);
});
