import { readFileSync, writeFileSync } from "../fs";
import { HostDirEntry } from "./host-dir-entry";

export class HostFileEntry {
  readonly type = 'file'

  constructor(public readonly path: string, public readonly parent: HostDirEntry) {}

  get contents(): Buffer
  {
    return readFileSync(this.path)
  }

  set contents(contents: Buffer)
  {
    writeFileSync(this.path, contents)
  }
}