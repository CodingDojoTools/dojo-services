import { dice } from 'talisman/metrics/distance/dice';
import { basename, extname } from 'path';
import { inObject, not } from './helpers';

export async function compare(
  files: Content[],
  references: Content[]
): Promise<Rated[]> {
  return await new CompareFiles(files, references).compare();
}

class CompareFiles {
  private assessed: Rated[] = [];

  constructor(private files: Content[], private references: Content[]) {}

  async compare(): Promise<Rated[]> {
    const files = this.mapByExtension(this.files);
    const references = this.mapByExtension(this.references);

    for (const extension in files) {
      if (not(inObject(extension, references))) {
        continue;
      }

      for (const source of files[extension]) {
        const rating = new FileRating(source, references[extension]);
        this.assessed.push(await rating.rate());
      }
    }

    return this.assessed;
  }

  private mapByExtension(files: Content[]): ExtensionMap {
    const results: ExtensionMap = {};

    for (const file of files) {
      const ext = extname(file.filename).toLowerCase();

      if (not(inObject(ext, results))) {
        results[ext] = [];
      }

      results[ext].push(file);
    }

    return results;
  }
}

/**
 *
 *
 * @class FileRating
 */
class FileRating {
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

export interface Rated {
  source: string;
  filename: string;
  ratings: Array<Rateable>;
  bestMatch: Rateable;
}

interface Rateable {
  target: string;
  reference: string;
  rating: number;
}

interface Content {
  _id?: string;
  contents: string;
  file?: string;
  filename: string;
}

interface ExtensionMap {
  [extension: string]: Content[];
}
