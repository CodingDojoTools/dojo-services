import * as klaw from 'klaw';
import * as through2 from 'through2';
import { inRange } from './helpers';
import { Transform } from 'stream';
/**
 *
 *
 * @export
 * @param {string} directory
 * @param {WalkOptions} [{
 *     ignoreDirectories = [],
 *     ignoreFiles = [],
 *     minFileSize = 10,
 *     maxFileSize = 10000
 *   }={}]
 * @returns {Promise<string[]>}
 */
export async function read(
  directory: string,
  {
    ignoreDirectories = [],
    ignoreFiles = [],
    minFileSize = 10,
    maxFileSize = 10000,
  }: WalkOptions = {}
): Promise<FileData[]> {
  const walker = new Walker(directory, {
    ignoreDirectories,
    ignoreFiles,
    minFileSize,
    maxFileSize,
  });

  return await walker.walk();
}

class Walker {
  private files: Array<FileData> = [];
  private ignoreDirectories: RegExp[];
  private ignoreFiles: RegExp[];
  private minFileSize: number;
  private maxFileSize: number;

  /**
   * Creates an instance of Walker.
   * @param {string} directory
   * @param {WalkOptions} options
   * @memberof Walker
   */
  constructor(public directory: string, options: WalkOptions) {
    this.ignoreDirectories = (options.ignoreDirectories || []).map(
      str => new RegExp(`\\/${str}\\/`)
    );
    this.ignoreFiles = (options.ignoreFiles || []).map(str => new RegExp(str));
    this.minFileSize = options.minFileSize;
    this.maxFileSize = options.maxFileSize;
  }

  /**
   * Recursively traverse a directory, aggregating file data (path and size)
   *
   * @returns {Promise<FileData[]>}
   * @memberof Walker
   */
  walk(): Promise<FileData[]> {
    return new Promise((resolve, reject) => {
      klaw(this.directory, {
        filter: this.skip(this.ignoreDirectories),
      })
        .pipe(through2.obj(this.excludeDirectories))
        .pipe(through2.obj(this.skipFiles(this.ignoreFiles)))
        .pipe(through2.obj(this.skipSize(this.minFileSize, this.maxFileSize)))
        .on('data', (item: klaw.Item) =>
          this.files.push({
            path: item.path,
            size: item.stats.size,
          })
        )
        .on('error', reject)
        .on('end', () => resolve(this.files));
    });
  }

  /**
   *
   * @private
   * @param {RegExp[]} skippable
   * @returns
   * @memberof Walker
   */
  private skipFiles(skippable: RegExp[]) {
    const self = this;

    return function(item: klaw.Item, enc: string, next: Function): void {
      if (self.skip(skippable)(item.path)) {
        (this as Transform).push(item);
      }

      next();
    };
  }

  /**
   *
   * @private
   * @param {number} [min=10]
   * @param {number} [max=10000]
   * @returns
   * @memberof Walker
   */
  private skipSize(min: number = 10, max: number = 10000) {
    return function(item: klaw.Item, enc: string, next: Function): void {
      if (inRange(item.stats.size, min, max)) {
        (this as Transform).push(item);
      }
      next();
    };
  }

  /**
   *
   *
   * @private
   * @param {RegExp[]} skippable
   * @returns {(item: string) => boolean}
   * @memberof Walker
   */
  private skip(skippable: RegExp[]): (item: string) => boolean {
    return function(item: string): boolean {
      for (const reg of skippable) {
        if (reg.test(item)) {
          return false;
        }
      }
      return true;
    };
  }

  /**
   *
   *
   * @private
   * @param {klaw.Item} item
   * @param {string} enc
   * @param {Function} next
   * @memberof Walker
   */
  private excludeDirectories(
    item: klaw.Item,
    _enc: string,
    next: Function
  ): void {
    if (!item.stats.isDirectory()) {
      ((this as any) as Transform).push(item);
    }
    next();
  }
}

export interface WalkOptions {
  ignoreDirectories?: string[];
  ignoreFiles?: string[];
  minFileSize?: number;
  maxFileSize?: number;
}

export interface FileData {
  path: string;
  size: number;
}
