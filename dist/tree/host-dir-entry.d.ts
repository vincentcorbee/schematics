import { HostFileEntry } from "./host-file-entry";
export declare class HostDirEntry {
    readonly path: string;
    readonly parent: HostDirEntry | null;
    readonly type = "dir";
    readonly entries: Map<string, HostDirEntry | HostFileEntry>;
    constructor(path: string, parent: HostDirEntry | null);
    addDir(entryLike: string | HostDirEntry): HostDirEntry;
    addFile(path: string): HostFileEntry;
    file(path: string): HostFileEntry | undefined;
    readFile(path: string): string;
}
//# sourceMappingURL=host-dir-entry.d.ts.map