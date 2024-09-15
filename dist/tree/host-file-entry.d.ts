/// <reference types="node" />
import { HostDirEntry } from "./host-dir-entry";
export declare class HostFileEntry {
    readonly path: string;
    readonly parent: HostDirEntry;
    readonly type = "file";
    constructor(path: string, parent: HostDirEntry);
    write(contents: Buffer): void;
    read(): Buffer;
    readText(): string;
    readJSON(): string;
}
//# sourceMappingURL=host-file-entry.d.ts.map