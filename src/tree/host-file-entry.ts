import { readFileSync, writeFileSync } from "../fs";
import { HostDirEntry } from "./host-dir-entry";

export class HostFileEntry {
  readonly type = 'file'

  constructor(public readonly path: string, public readonly parent: HostDirEntry) {}

  write(contents: Buffer): void
  {
    writeFileSync(this.path, contents)
  }

  read(): Buffer
  {
    return readFileSync(this.path)
  }

  readText(): string
  {
    return readFileSync(this.path, {encoding: 'utf-8'})
  }

  readJSON(): string
  {
    return JSON.parse(readFileSync(this.path, { encoding: 'utf-8' }))
  }
}