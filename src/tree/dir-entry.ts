import { DirEntryInterface } from "../types";
import { joinPath } from "../fs";
import { getPathSegments } from "./helpers";
import { FileEntry } from "./file-entry";

export class DirEntry implements DirEntryInterface{
  readonly type = 'dir'
  readonly entries: Map<string, DirEntry | FileEntry> = new Map()

  constructor(public readonly path: string, public readonly parent: DirEntry | null) {}

  addDir(entryLike: string | DirEntry): DirEntry
  {
    const isDirEntry = entryLike instanceof DirEntry
    const path = isDirEntry ? entryLike.path : entryLike

    if (this.entries.has(path)) return this.entries.get(path) as DirEntry;

    if (isDirEntry) {
      this.entries.set(entryLike.path, entryLike)

      return entryLike
    }

    const dir = new DirEntry(entryLike, this)

    this.entries.set(entryLike, dir)

    return dir
  }

  addFile(path: string, contents: Buffer | string): FileEntry
  {
    const file = new FileEntry(path, contents instanceof Buffer ? contents : Buffer.from(contents), this, true)

    this.entries.set(path, file)

    return file
  }

  file(path: string): FileEntry | undefined
  {
    const segments = getPathSegments(path)

    for (let i = 1, l = segments.length; i <= l; i++) {
      const entry = this.entries.get(joinPath(...segments.slice(0, l - i)))

      if (entry) {
        if (entry.type === 'file') return entry;

        return entry.file(path)
      }
    }
  }

  readFile(path: string): string
  {
    const entry = this.file(path)

    if (!entry) throw Error('NOT_FOUND')

    return entry.readText()
  }

  rename(from: string, to: string): void
  {
    const entry = this.file(from);

    if (!entry) throw Error('NOT_FOUND');

    this.entries.delete(from)

    this.addFile(to, entry.contents)
  }
}