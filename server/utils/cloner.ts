import { read, FileData, WalkOptions } from './files-reader';
import { debug } from './debug';

import * as cloner from 'git-clone';

/**
 *
 *
 * @export
 * @param {string} link
 * @param {string} source
 * @param {string} directory
 * @param {Ignore} { ignoreDirectories, ignoreFiles }
 * @returns {Promise<string[]>}
 */
export async function clone(
  link: string,
  source: string,
  directory: string,
  { ignoreDirectories, ignoreFiles, minFileSize, maxFileSize }: WalkOptions
): Promise<FileData[]> {
  const repo = await cloner(link, source);

  debug(
    `Cloned repo using link: ${link}, source: ${source}, directory: ${directory} and retrieved files ::=>`,
    repo
  );

  return await read(directory, {
    ignoreDirectories,
    ignoreFiles,
    minFileSize,
    maxFileSize,
  });
}
