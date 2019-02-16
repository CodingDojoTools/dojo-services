import { isString } from '@server/utils';
import * as puppeteer from 'puppeteer';

const DEFAULT_TIMEOUT = 10000;
const DEFAULT_EVENT = 'domcontentloaded';

export class BaseCrawler {
  browser: puppeteer.Browser;
  page: puppeteer.Page;

  async init(url: string) {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    await this.page.goto(url);
  }

  async close() {
    await this.browser.close();
  }

  async wait(
    page = this.page,
    timeout = DEFAULT_TIMEOUT,
    waitUntil: puppeteer.LoadEvent = DEFAULT_EVENT
  ) {
    if (isString(timeout)) {
      waitUntil = timeout as puppeteer.LoadEvent;
      timeout = DEFAULT_TIMEOUT;
    }

    return await page.waitForNavigation({
      timeout,
      waitUntil,
    });
  }
}
