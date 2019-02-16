import { signIn, BaseCrawler } from './lib';
import { Week } from '@server/interfaces';
import { Urls } from '@server/config';

export class TopicDateUpdater extends BaseCrawler {
  constructor(private weeks: Week[]) {
    super();
  }

  async crawl() {
    await this.init(Urls.DojoLogin);
    await signIn(this.page);
    await this.wait();
    return await this.update();
  }

  async update(): Promise<void> {
    for (const week of this.weeks) {
      console.log(`Attempting topic update for ${week.week}`);

      for (const day of week.days) {
        console.log(
          `\t Processing content for ${day.day} with date ${
            day.date
          } and url segment ${day.segment}`
        );

        await this.updateDay(
          this.extractSegment(day.segment),
          this.modYear(day.date)
        );
      }
    }
  }

  async updateDay(segment: string, date) {
    await this.page.goto(`${Urls.DojoTopics}/${segment}`);

    await this.page.evaluate(() =>
      (document.getElementsByClassName(
        'edit_discussion_btn'
      )[0] as HTMLButtonElement).click()
    );

    await this.setDate(date);

    await this.page.evaluate(() => {
      (document.getElementById('manage_discussion_form').lastElementChild
        .lastElementChild as HTMLButtonElement).click();
    });
  }

  async setDate(date: string): Promise<void> {
    return await this.page.evaluate((newDate: string) => {
      (document.getElementById('response_due_date')
        .firstElementChild as HTMLInputElement).value = newDate;
    }, date);
  }

  private extractSegment(segment: string): string {
    return segment.replace(/\(\S+\)$/, '');
  }

  private modYear(date: string): string {
    return date.replace(/\d+$/, `${new Date(date).getFullYear()}`);
  }
}
