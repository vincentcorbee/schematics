/// <reference types="node" />
import { DirEntryInterface } from "../types";
import { FileEntry } from "./file-entry";
export declare class DirEntry implements DirEntryInterface {
    readonly path: string;
    readonly parent: DirEntry | null;
    readonly type = "dir";
    readonly entries: Map<string, DirEntry | FileEntry>;
    constructor(path: string, parent: DirEntry | null);
    addDir(entryLike: string | DirEntry): DirEntry;
    addFile(path: string, contents: Buffer | string): FileEntry;
    file(path: string): FileEntry | undefined;
    readFile(path: string): string;
    rename(from: string, to: string): void;
}
//# sourceMappingURL=dir-entry.d.ts.map