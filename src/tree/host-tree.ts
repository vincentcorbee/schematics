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

    this.root = new HostDirEntry(root, null) //createHostDir(this.rootPath)
  }

  file(path: string): HostFileEntry | undefined
  {
    const entry = this.root.file(resolvePath(this.rootPath, path))

    if (entry) return entry;

    return createEntryFromDisk(resolvePath(this.rootPath, path), this.root)
  }
}