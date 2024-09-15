import { existsSync, joinPath, mkdirSync, resolvePath, writeFileSync } from "../fs";
import { FileVisitor, FileEntry, SchematicContext, TreeInterface, Visitor } from "../types";
import { getPathSegments, traverseDir, visitFiles } from "./helpers";
import { DirEntry } from "./dir-entry";
import { FileEntry as FileEntryClass } from "./file-entry";
import { HostTree } from "./host-tree";
import { Emitter, Listener } from "../common/emitter";

export class Tree extends Emitter<'update' | 'create'> implements TreeInterface {
  constructor(public readonly context: SchematicContext, public readonly root = new DirEntry('', null), public readonly host?: HostTree) {
    super()
  }

  visit(visitor: FileVisitor): void
  {
    visitFiles(this.root, visitor)
  }

  traverse(visitor: Visitor): void
  {
    traverseDir(this.root, visitor)
  }

  on(event: 'update' | 'create', listener: Listener)
  {
    super.on<FileEntry>(event, listener)

    return this
  }

  file(path: string): FileEntry | undefined
  {
    const file = this.root.file(path)

    if (file) return file

    if (this.host) {
      const hostFileEntry = this.host.file(path)

      if (hostFileEntry) {
        return this.createFile(hostFileEntry.path.replace(this.host.rootPath, ''), hostFileEntry.readText()) as FileEntryClass
      }
    }
  }

  readText(path: string): string
  {
    const file = this.file(path)

    if (!file) throw Error('NOT_FOUND')

    return file.readText()
  }

  readJSON<T = any>(path: string): T
  {
    return JSON.parse(this.readText(path))
  }

  read(path: string): Buffer
  {
    const file = this.file(path)

    if (!file) throw Error('NOT_FOUND')

    return file.read()
  }

  overwrite(path: string, contents: Buffer | string): FileEntry
  {
    return this.createFile(path, contents) as FileEntryClass
  }

  createFile(path: string, contents: Buffer | string): FileEntry
  {
    const resolvedPath = resolvePath('/', path)
    const segments = getPathSegments(resolvedPath)
    const { length } = segments

    let currentDir = this.root;

    for (let i = 1; i <= length; i++) {
      const currentPath = joinPath(...segments.slice(0, i))

      if (i === length) return currentDir.addFile(currentPath, contents)

      currentDir = currentDir.addDir(currentPath)
    }

    throw Error('FILE_CREATION_FAILED');
  }

  merge(other: Tree): Tree
  {
    other.visit(entry => this.overwrite(entry.path, entry.contents))

    return this
  }

  commit(): boolean {
    const { context: { dryRun }, host } = this

    if (!host) return false

    let hasModifications = false

    this.traverse((entry) => {
      const path = resolvePath(host.rootPath, entry.path)

      if(entry.type === 'dir' && !dryRun && !existsSync(path)) mkdirSync(path)

      else if(entry.type === 'file') {
        const fileExists = existsSync(path)

        if (!dryRun && entry.modified) writeFileSync(path, entry.contents)

        if(entry.modified) {
          hasModifications = true

          this.emit(fileExists ? 'update' : 'create', entry)
        }
      }
    })

    return hasModifications
  }
}