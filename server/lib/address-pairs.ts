import * as puppeteer from 'puppeteer';
import { Page } from 'puppeteer';

import { WalletAddress } from './wallet-address';
import { randomNumber } from '@server/utils';
import { Urls } from '@server/config';

export class AddressPairs {
  addresses: WalletAddress[] = [];

  constructor(public limit = 5) {}

  async generate(): Promise<WalletAddress[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(Urls.BitAddress);

    this.addresses = await this.generateAddresses(page);

    await browser.close();

    return this.addresses;
  }

  private async generateAddresses(page: Page): Promise<WalletAddress[]> {
    do {
      await this.generateMouseMovements(page);
    } while (await this.hasNotGeneratedAddress(page));

    await page.click('#bulkwallet');

    return this.collectAddresses(page);
  }

  private async hasNotGeneratedAddress(page: Page): Promise<boolean> {
    const text: string = await page.evaluate(() => {
      const element = document.getElementById('bulkwallet') as HTMLElement;
      return element.innerText;
    });

    return /^\d+\S+/.test(text);
  }

  private async generateMouseMovements(page: Page, moves = 10) {
    const { height, width } = page.viewport();

    for (let index = 0; index < moves; index++) {
      const randX = randomNumber(width, index);
      const randY = randomNumber(height, index);
      await page.mouse.move(randX, randY, { steps: randomNumber(20) });
    }
  }

  private retrieveText(page: Page): Promise<string[]> {
    return page.evaluate(() => {
      return (document.getElementById(
        'bulktextarea'
      ) as HTMLTextAreaElement).value
        .split('\n')
        .map(chunk => chunk.replace(/"/g, '').split(','));
    });
  }

  private async collectAddresses(page: Page) {
    await this.setLimit(page);

    let addresses: string[] = [];

    await page.click('#bulkgenerate');

    do {
      addresses = await this.retrieveText(page);
    } while (addresses.length !== this.limit);

    return addresses.map(address => new WalletAddress(address[1], address[2]));
  }

  private async setLimit(page: Page): Promise<void> {
    await page.evaluate(limit => {
      (document.querySelector('#bulklimit') as HTMLInputElement).value = limit;
    }, this.limit);

    await page.waitFor(2000);
  }
}
