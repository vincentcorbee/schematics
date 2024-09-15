import { DirEntry, FileEntryInterface } from "../types";

export class FileEntry implements FileEntryInterface{
  readonly type = 'file'

  constructor(public readonly path: string, public readonly contents: Buffer, public readonly parent: DirEntry, public modified: boolean) {  }

  read(): Buffer
  {
    return this.contents;
  }

  readText(): string
  {
    return this.contents.toString('utf-8');
  }

  readJSON<T = any>(): T
  {
    return JSON.parse(this.readText());
  }
}