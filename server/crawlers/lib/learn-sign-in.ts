import { Page } from 'puppeteer';

const LEARN_PASSWORD = process.env.LEARN_PASSWORD;
const LEARN_EMAIL = process.env.LEARN_EMAIL;

export async function signIn(
  page: Page,
  email = LEARN_EMAIL,
  password = LEARN_PASSWORD
) {
  await page.type('#enter_email', email);
  await page.type('#enter_password', password);
  await page.click('#login_button');
}
