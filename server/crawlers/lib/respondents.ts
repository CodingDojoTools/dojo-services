import { Page } from 'puppeteer';

/* tslint:disable:no-shadowed-variable */

export async function respondents(
  page: Page,
  discussionDate: string
): Promise<Participants> {
  return await page.evaluate((dtDate: string) => {
    class Participants {
      respondents: Respondent[];
      date: number;

      constructor(
        date: Date | string = new Date(Date.now() - 86400 * 1000),
        private range = 1
      ) {
        this.date = this.formatDate(date);
        this.respondents = Array.from(
          document.getElementById('discussion_response_list').children
        )
          .map((element: HTMLElement) => new Respondent(element))
          .filter(respondent => this.filterDate(respondent.date))
          .sort((a, b) =>
            this.compare(a.name.toLowerCase(), b.name.toLowerCase())
          );
      }

      compare(name1: string, name2: string, index = 0): number {
        if (!this.inRange(index, 0, Math.min(name1.length, name2.length))) {
          return name1.length - name2.length;
        }

        const result = name1.charCodeAt(index) - name2.charCodeAt(index);

        if (result) {
          return result;
        }

        return this.compare(name1, name2, index + 1);
      }

      get days() {
        return 86400 * 1000 * this.range;
      }

      private formatDate(date: Date | string = new Date()) {
        return new Date(new Date(date).toISOString().split('T')[0]).getTime();
      }

      private filterDate(date: Date | string) {
        return this.inRange(this.formatDate(date), this.minDate, this.maxDate);
      }

      get minDate() {
        return this.date - this.days;
      }

      get maxDate() {
        return this.date + this.days;
      }

      private inRange(value: number, min = 0, max = 1) {
        return Math.min(min, max) <= value && value <= Math.max(min, max);
      }
    }

    class Respondent {
      element: HTMLElement;
      name: string;

      constructor(element: HTMLElement) {
        this.element = element;
        this.name = this.studentName;
      }

      get studentName() {
        return this.getTextFromClass('responded_by');
      }

      get date() {
        return this.getTextFromClass('responded_at');
      }

      getTextFromClass(klass: string) {
        return this.element.getElementsByClassName(klass)[0].textContent.trim();
      }
    }

    return new Participants(dtDate);
  }, discussionDate);
}

export interface Participants {
  respondents: Respondent[];
}

export interface Respondent {
  name: string;
}
