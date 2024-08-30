"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostDirEntry = void 0;
const fs_1 = require("../fs");
const helpers_1 = require("./helpers");
const host_file_entry_1 = require("./host-file-entry");
class HostDirEntry {
    path;
    parent;
    type = 'dir';
    entries = new Map();
    constructor(path, parent) {
        this.path = path;
        this.parent = parent;
    }
    addDir(entryLike) {
        const isDirEntry = entryLike instanceof HostDirEntry;
        const path = isDirEntry ? entryLike.path : entryLike;
        if (this.entries.has(path))
            return this.entries.get(path);
        if (isDirEntry) {
            this.entries.set(entryLike.path, entryLike);
            return entryLike;
        }
        const dir = new HostDirEntry(entryLike, this);
        this.entries.set(entryLike, dir);
        return dir;
    }
    addFile(path) {
        const file = new host_file_entry_1.HostFileEntry(path, this);
        this.entries.set(path, file);
        return file;
    }
    file(path) {
        const segments = (0, helpers_1.getPathSegments)(path);
        for (let i = 1, l = segments.length; i <= l; i++) {
            const entry = this.entries.get((0, fs_1.joinPath)(...segments.slice(0, l - i)));
            if (entry) {
                if (entry.type === 'file')
                    return entry;
                return entry.file(path);
            }
        }
    }
    readFile(path) {
        const entry = this.entries.get(path);
        if (!entry)
            throw Error('NOT_FOUND');
        if (entry.type === 'dir')
            throw Error('NOT_A_FILE');
        return entry.contents.toString();
    }
}
exports.HostDirEntry = HostDirEntry;
//# sourceMappingURL=host-dir-entry.js.map