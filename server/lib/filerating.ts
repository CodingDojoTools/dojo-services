import { dice } from 'talisman/metrics/distance/dice';
import { basename } from 'path';

import { Rateable, Content, Rated } from '../interfaces';

/**
 *
 *
 * @class FileRating
 */
export class FileRating {
  private ratings: Array<Rateable> = [];

  constructor(private source: Content, private references: Content[]) {}

  /**
   *
   * @returns {Promise<Rated>}
   * @memberof FileRating
   */
  async rate(): Promise<Rated> {
    await this.buildRatings();

    return {
      source: this.source._id,
      filename: basename(this.source.filename),
      ratings: this.ratings,
      bestMatch: this.bestMatch(),
    };
  }

  /**
   *
   *
   * @private
   * @returns {Promise<void>}
   * @memberof FileRating
   */
  private async buildRatings(): Promise<void> {
    for (const reference of this.references) {
      this.ratings.push({
        target: reference.filename,
        reference: reference.file || reference._id,
        rating: await this.similarity(this.source.contents, reference.contents),
      });
    }
  }

  /**
   *
   *
   * @param {string} source
   * @param {string} reference
   * @returns {Promise<number>}
   * @memberof FileRating
   */
  private similarity(source: string, reference: string): Promise<number> {
    return Promise.resolve<number>(dice(source, reference) * 100);
  }

  /**
   *
   *
   * @private
   * @returns {Rateable}
   * @memberof FileRating
   */
  private bestMatch(): Rateable {
    return this.ratings.sort((a, b) => a.rating - b.rating)[
      this.ratings.length - 1
    ];
  }
}
