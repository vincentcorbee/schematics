/// <reference types="node" />
import { DirEntry, FileEntryInterface } from "../types";
export declare class FileEntry implements FileEntryInterface {
    readonly path: string;
    readonly contents: Buffer;
    readonly parent: DirEntry;
    modified: boolean;
    readonly type = "file";
    constructor(path: string, contents: Buffer, parent: DirEntry, modified: boolean);
    readFile(): string;
}
//# sourceMappingURL=file-entry.d.ts.map