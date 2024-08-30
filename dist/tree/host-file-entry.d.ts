/// <reference types="node" />
import { HostDirEntry } from "./host-dir-entry";
export declare class HostFileEntry {
    readonly path: string;
    readonly parent: HostDirEntry;
    readonly type = "file";
    constructor(path: string, parent: HostDirEntry);
    get contents(): Buffer;
    set contents(contents: Buffer);
}
//# sourceMappingURL=host-file-entry.d.ts.map