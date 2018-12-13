import { ngramFingerprint } from 'talisman/keyers/fingerprint';
import { IFingerprint, ISubmissionFile } from '../models';

/**
 *
 * @class FingerPrinter
 */
class FingerPrinter {
  private prints: IFingerprint[] = [];

  constructor(
    private files: ISubmissionFile[],
    private method: string,
    private ngrams: FingerPrintMethod
  ) {}

  async finger(): Promise<IFingerprint[]> {
    for (const file of this.files) {
      this.prints.push({
        file: file._id,
        filename: file.filename,
        submission: file.submission as string,
        method: this.method,
        contents: await this.impression(file.contents),
      });
    }

    return this.prints;
  }

  private impression(content: string): Promise<string> {
    return Promise.resolve<string>(ngramFingerprint(this.ngrams, content));
  }
}

/**
 *
 *
 * @param {ISubmissionFile[]} files
 * @returns
 */
export async function baseline(files: ISubmissionFile[]) {
  // hackey...
  const keys = Object.keys(FingerPrintMethod).filter(k =>
    isNaN(parseInt(k, 10))
  );
  const prints: IFingerprint[][] = [];

  for (let index = 0; index < keys.length; index++) {
    prints.push(
      await new FingerPrinter(
        files,
        keys[index],
        FingerPrintMethod[keys[index]]
      ).finger()
    );
  }

  return prints;
}

/**
 * fingerprint string contents by n-grams
 *
 * @export
 * @param {string} content
 * @param {number} ngrams
 * @returns {Promise<string>}
 */
export function fingerprint(
  content: string,
  ngrams: FingerPrintMethod
): Promise<string> {
  return Promise.resolve<string>(ngramFingerprint(ngrams, content));
}

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum FingerPrintMethod {
  none,
  unigram,
  bigram,
  trigram,
}
