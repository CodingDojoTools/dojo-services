import { extname, relative, join, basename } from 'path';
import { readFile } from 'fs';

import { STORAGE } from '@server/config';
import { FileData } from './files-reader';
import { clone } from './cloner';

import {
  IStack,
  SubmissionFile,
  ISubmissionFile,
  SubmissionDocument,
  Ignore,
  Ignoreables,
} from '../models';

export async function build(
  submission: SubmissionDocument,
  stack: IStack
): Promise<ISubmissionFile[]> {
  // tslint:disable-next-line: no-use-before-declare
  return await FileBuilder.for(submission, stack).build();
}

export abstract class FileBuilder {
  protected path: string;
  protected source: string;

  constructor(
    protected submission: SubmissionDocument,
    protected stack: IStack
  ) {
    this.source = join(STORAGE, this.submission._id);
    this.path = join(this.source, this.submission.source.path || '');
  }

  static for<T extends FileBuilder>(
    submission: SubmissionDocument,
    stack: IStack
  ): T {
    const {
      source: { link },
    } = submission;

    try {
      return new TYPES[(extname(link).toLowerCase())](submission, stack) as T;
    } catch (e) {
      return new FileBuilderGit(submission, stack) as T;
    }
  }

  async build(): Promise<ISubmissionFile[]> {
    return await this.insert(await this.builder(await this.prepare()));
  }

  abstract async prepare(): Promise<FileData[]>;

  protected async builder(files: FileData[]): Promise<ISubmissionFile[]> {
    const results: Array<ISubmissionFile> = [];

    for (const { path: file, size } of files) {
      results.push({
        submission: this.submission,
        contents: await this.readContents(file),
        filename: basename(file),
        extension: extname(file),
        path: relative(this.path, file),
        size,
      });
    }
    return results;
  }

  protected async insert(files: ISubmissionFile[]): Promise<ISubmissionFile[]> {
    return await SubmissionFile.insertMany(files);
  }

  protected readContents(file: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      readFile(file, 'utf-8', (error, contents) => {
        if (error) {
          return reject(error);
        }

        resolve(contents);
      });
    });
  }

  protected ignoreables(stackID: string): Promise<Ignoreables> {
    return Ignore.ignoreables(stackID);
  }
}

class FileBuilderGit extends FileBuilder {
  async prepare(): Promise<FileData[]> {
    const ignore = await this.ignoreables(this.stack._id);
    return await clone(
      this.submission.source.link,
      this.source,
      this.path,
      ignore
    );
  }
}

/**
 * @todo
 *
 * @class FileBuilderZip
 * @extends {FileBuilder}
 */
class FileBuilderZip extends FileBuilder {
  async prepare(): Promise<FileData[]> {
    return new Promise<FileData[]>(async (resolve, reject) => {});
  }
}
/**
 * @todo
 *
 * @class FileBuilderRar
 * @extends {FileBuilder}
 */
class FileBuilderRar extends FileBuilder {
  async prepare(): Promise<FileData[]> {
    return new Promise<FileData[]>(async (resolve, reject) => {});
  }
}

const TYPES = {
  '.zip': FileBuilderZip,
  '.rar': FileBuilderRar,
  '.git': FileBuilderGit,
};
