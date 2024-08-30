import { DirEntry, FileEntryInterface } from "../types";

export class FileEntry implements FileEntryInterface{
  readonly type = 'file'

  constructor(public readonly path: string, public readonly contents: Buffer, public readonly parent: DirEntry, public modified: boolean) {  }

  readFile(): string
  {
    return this.contents.toString();
  }
}