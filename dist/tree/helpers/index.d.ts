import { FileVisitor, Visitor } from "../../types";
import { HostDirEntry } from "../host-dir-entry";
import { DirEntry } from "../dir-entry";
import { HostFileEntry } from "../host-file-entry";
export declare function getPathSegments(path: string, withRoot?: boolean): string[];
export declare function visitFiles(dir: DirEntry, visitor: FileVisitor): void;
export declare function traverseDir(dir: DirEntry, visitor: Visitor): void;
export declare function createEntryFromDisk(path: string, parent: HostDirEntry): HostFileEntry;
export declare function createDir(path: string, parent?: DirEntry): DirEntry;
//# sourceMappingURL=index.d.ts.map