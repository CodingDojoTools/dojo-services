import { Defaults } from '@status/defaults';
import { extname } from 'path';

import { Rated, Content, ExtensionMap } from '../interfaces';
import { FileRating } from './filerating';
import { inObject } from '../utils';

export class CompareFiles {
  private assessed: Rated[] = [];

  constructor(private files: Content[], private references: Content[]) {}

  async compare(): Promise<Rated[]> {
    const files = this.mapByExtension(this.files);
    const references = this.mapByExtension(this.references);

    for (const extension in files) {
      if (inObject(extension, references)) {
        for (const source of files[extension]) {
          const rating = new FileRating(source, references[extension]);
          this.assessed.push(await rating.rate());
        }
      }
    }

    return this.assessed;
  }

  private mapByExtension(files: Content[]): ExtensionMap {
    const results = Defaults.wrap<ExtensionMap>({
      defaultValue: [],
      setUndefined: true,
    });

    for (const file of files) {
      const ext = extname(file.filename).toLowerCase();

      results[ext].push(file);
    }

    return results.unwrapDefaults();
  }
}
