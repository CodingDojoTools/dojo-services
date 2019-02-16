import { signIn, respondents, BaseCrawler } from './lib';
import { Urls } from '@server/config';

export class Participants extends BaseCrawler {
  constructor(private url: string, private date: string) {
    super();
  }

  async crawl() {
    await this.init(Urls.DojoLogin);

    await signIn(this.page);
    await this.wait();

    return this.respondents();
  }

  async respondents(): Promise<string[]> {
    await this.page.goto(`${Urls.DojoTopics}${this.url}`);

    const participants = await respondents(this.page, this.date);

    await this.close();

    return participants.respondents.map(respondent => respondent.name);
  }
}
