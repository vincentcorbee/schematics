import { resolvePath, parsePath } from "../fs";
import { SchematicContext } from "../types";
import { createEntryFromDisk } from "./helpers";
import { HostDirEntry } from "./host-dir-entry";
import { HostFileEntry } from "./host-file-entry";

export class HostTree {
  private root: HostDirEntry

  constructor(public readonly context: SchematicContext, public readonly rootPath: string)
  {
    const { root } = parsePath(rootPath)

    this.root = new HostDirEntry(root, null)
  }

  file(path: string): HostFileEntry | undefined
  {
    const file = this.root.file(resolvePath(this.rootPath, path))

    if (file) return file;

    return createEntryFromDisk(resolvePath(this.rootPath, path), this.root)
  }
}