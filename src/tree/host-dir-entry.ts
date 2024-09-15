import { joinPath } from "../fs";
import { getPathSegments } from "./helpers";
import { HostFileEntry } from "./host-file-entry";

export class HostDirEntry {
  readonly type = 'dir'
  readonly entries: Map<string, HostDirEntry | HostFileEntry> = new Map()

  constructor(public readonly path: string, public readonly parent: HostDirEntry | null) {}

  addDir(entryLike: string | HostDirEntry): HostDirEntry
  {
    const isDirEntry = entryLike instanceof HostDirEntry
    const path = isDirEntry ? entryLike.path : entryLike

    if (this.entries.has(path)) return this.entries.get(path) as HostDirEntry;

    if (isDirEntry) {
      this.entries.set(entryLike.path, entryLike)

      return entryLike
    }

    const dir = new HostDirEntry(entryLike, this)

    this.entries.set(entryLike, dir)

    return dir
  }

  addFile(path: string): HostFileEntry
  {
    const file = new HostFileEntry(path, this)

    this.entries.set(path, file)

    return file
  }

  file(path: string): HostFileEntry | undefined
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
    const entry = this.entries.get(path)

    if (!entry) throw Error('NOT_FOUND')

    if (entry.type === 'dir') throw Error('NOT_A_FILE');

    return entry.readText()
  }
}