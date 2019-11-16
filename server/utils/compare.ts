import { Content, Rated } from '../interfaces';
import { CompareFiles } from '../lib';

export async function compare(
  files: Content[],
  references: Content[]
): Promise<Rated[]> {
  return await new CompareFiles(files, references).compare();
}
