import { joinPath, parsePath, resolvePath, seperator } from "../fs";
import { FileVisitor, FileEntry, SchematicContext, TreeInterface } from "../types";
import { getPathSegments, visitFiles } from "./helpers";
import { DirEntry } from "./dir-entry";
import { FileEntry as FileEntryClass } from "./file-entry";
import { HostTree } from "./host-tree";

export class Tree implements TreeInterface {
  constructor(public readonly context: SchematicContext, public readonly root = new DirEntry('', null), public readonly host?: HostTree) {}

  visit(visitor: FileVisitor): void
  {
    visitFiles(this.root, visitor)
  }

  file(path: string): FileEntry | undefined
  {
    const fileEntry = this.root.file(path)

    if (fileEntry) return fileEntry

    if (this.host) {
      const hostFileEntry = this.host.file(path)

      if (hostFileEntry) {
        const file = this.create(hostFileEntry.path.replace(this.host.rootPath, ''), hostFileEntry.contents) as FileEntryClass

        file.modified = false

        return file
      }
    }
  }

  readText(path: string): string
  {
    const entry = this.file(path)

    if (!entry) throw Error('NOT_FOUND')

    return entry.contents.toString('utf-8')
  }

  read(path: string): Buffer
  {
    const entry = this.file(path)

    if (!entry) throw Error('NOT_FOUND')

    return entry.contents
  }

  overwrite(path: string, contents: Buffer | string): FileEntry
  {
    const newEntry = this.create(path, contents) as FileEntryClass

    newEntry.modified = true

    return newEntry
  }

  create(path: string, contents: Buffer | string): FileEntry
  {
    const resolvedPath = resolvePath('/', path)
    const segments = getPathSegments(resolvedPath)
    const { length } = segments

    let file

    let currentDir = this.root;

    for (let i = 1; i <= length; i++) {
      const currentPath = joinPath(...segments.slice(0, i))

      if (i === length) {
        file = currentDir.addFile(currentPath, contents)

        break;
      }

      currentDir = currentDir.addDir(currentPath)
    }

    return file as FileEntry
  }

  merge(other: Tree): Tree
  {
    other.visit(entry => this.overwrite(entry.path, entry.contents))

    return this
  }
}