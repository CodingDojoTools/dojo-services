import { Pipe, PipeTransform } from '@angular/core';

import { wordMinors } from '@app/lib';

@Pipe({
  name: 'titleize',
})
export class TitleizePipe implements PipeTransform {
  static wordMinors: Array<string> = wordMinors;
  static expression: RegExp = /\w[^-\s]*/g;

  /**
   * Transform the passed string to title case
   *
   * @param {string} sentence
   * @param {(boolean | string[])} [altWords]
   * @param {boolean} [alternate]
   * @returns {string}
   * @memberof TitleizePipe
   */
  transform(
    sentence: string,
    altWords?: boolean | string[],
    alternate?: boolean
  ): string {
    if (typeof sentence !== 'string') {
      return sentence;
    }

    const minors = this.whichWords(altWords);
    const reg = this.whichExpression(altWords as boolean, alternate);
    const process = this.shouldProcess(altWords as boolean, alternate);

    return sentence.replace(reg, (word, index: number) => {
      return process && index && minors.includes(word.toLowerCase())
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  /**
   * Determine if we should process the word list or turn titleize into a capitalize pipe
   *
   * @private
   * @param {boolean} [altWords]
   * @param {boolean} [alternate]
   * @returns {boolean}
   * @memberof TitleizePipe
   */
  private shouldProcess(altWords?: boolean, alternate?: boolean): boolean {
    return altWords !== false && alternate !== false;
  }

  /**
   * Determine if we should be using the alternate regular expression, or the static expression
   *
   * @private
   * @param {boolean} [altWords]
   * @param {boolean} [alternate]
   * @returns {RegExp}
   * @memberof TitleizePipe
   */
  private whichExpression(altWords?: boolean, alternate?: boolean): RegExp {
    return this.isTrue(altWords) || this.isTrue(alternate)
      ? /\w\S*/g
      : TitleizePipe.expression;
  }

  /**
   * Determine if we should be using a user passed word array or the static word array
   *
   * @private
   * @param {(boolean | string[])} [altWords]
   * @returns {string[]}
   * @memberof TitleizePipe
   */
  private whichWords(altWords?: boolean | string[]): string[] {
    return Array.isArray(altWords) ? altWords : TitleizePipe.wordMinors;
  }

  /**
   * Determine if passed value is the boolean true
   *
   * @private
   * @param {*} value
   * @returns {boolean}
   * @memberof TitleizePipe
   */
  private isTrue(value: any): boolean {
    return value === true;
  }
}
