import { FileVisitor, Visitor } from "../../types";
import { existsSync, joinPath, readFileSync, readdirSync, resolvePath, seperator, parsePath } from "../../fs";
import { HostDirEntry } from "../host-dir-entry";
import { rootDir } from "../../constants";
import { DirEntry } from "../dir-entry";
import { HostFileEntry } from "../host-file-entry";

export function getPathSegments(path: string, withRoot = false): string[]
{
  const segments = path.split(seperator)

  if (withRoot) return segments.map(segment => segment || seperator);

  return segments.filter(Boolean)
}

export function visitFiles(dir: DirEntry, visitor: FileVisitor): void
{
  dir.entries.forEach(entry => {
    if (entry.type === 'file') visitor(entry)
    else visitFiles(entry, visitor)
  })
}

export function traverseDir(dir: DirEntry, visitor: Visitor): void
{
  dir.entries.forEach(entry => {
    if (entry.type === 'file') visitor(entry)
    else {
      visitor(entry);
      traverseDir(entry, visitor)
    }
  })
}

// export function createHostDir(path: string, parent?: HostDirEntry): HostDirEntry {
//   const resolvedPath = resolvePath(rootDir(), path)

//   const dir = readdirSync(resolvedPath, { withFileTypes: true })

//   const dirEntry = new HostDirEntry(joinPath(path), parent ?? null)

//   for (const entry of dir) {
//     if (entry.isFile())
//       dirEntry.addFile(joinPath(path, entry.name))

//     if(entry.isDirectory())
//       dirEntry.addDir(createHostDir(joinPath(path, entry.name), dirEntry))
//   }

//   return dirEntry
// }

export function createEntryFromDisk(path: string, parent: HostDirEntry): HostFileEntry
{
  const { dir: dirName, base } = parsePath(path)

  const entry = readdirSync(dirName, { withFileTypes: true }).find(e => e.name === base)

  if (!entry) throw Error('NOT_FOUND')

  const segments = getPathSegments(path, true)
  const { length } = segments

  let currentDir = parent;

  let hostEntry

  for (let i = 1; i <= length; i++) {
    const currentPath = joinPath(...segments.slice(0, i))

    if (currentPath === parent.path) continue

    if (i === length) {
      if (entry.isFile())
         hostEntry = currentDir.addFile(currentPath)

      break;
    }

    currentDir = currentDir.addDir(currentPath)
  }

  return hostEntry as HostFileEntry
}

export function createDir(path: string, parent?: DirEntry): DirEntry
{
  const resolvedPath = resolvePath(rootDir(), path)

  const dir = readdirSync(resolvedPath, { withFileTypes: true })

  const dirEntry = new DirEntry(joinPath(path), parent ?? null)

  for (const entry of dir) {
    if (entry.isFile())
      dirEntry.addFile(joinPath(path, entry.name), readFileSync(resolvePath(resolvedPath, entry.name)))

    if (entry.isDirectory())
      dirEntry.addDir(createDir(joinPath(path, entry.name), dirEntry))
  }

  return dirEntry
}