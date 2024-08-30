"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirEntry = void 0;
const fs_1 = require("../fs");
const helpers_1 = require("./helpers");
const file_entry_1 = require("./file-entry");
class DirEntry {
    path;
    parent;
    type = 'dir';
    entries = new Map();
    constructor(path, parent) {
        this.path = path;
        this.parent = parent;
    }
    addDir(entryLike) {
        const isDirEntry = entryLike instanceof DirEntry;
        const path = isDirEntry ? entryLike.path : entryLike;
        if (this.entries.has(path))
            return this.entries.get(path);
        if (isDirEntry) {
            this.entries.set(entryLike.path, entryLike);
            return entryLike;
        }
        const dir = new DirEntry(entryLike, this);
        this.entries.set(entryLike, dir);
        return dir;
    }
    addFile(path, contents) {
        const file = new file_entry_1.FileEntry(path, contents instanceof Buffer ? contents : Buffer.from(contents), this, true);
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
    // dir(path: string): DirEntry | undefined {
    //   const segments = getPathSegments(path)
    //   for (let i = 0, l = segments.length; i < l; i++) {
    //     const entry = this.entries.get(segments.slice(0, l - i).join(seperator))
    //     if (entry?.type === 'dir') return entry.dir(path)
    //   }
    // }
    readFile(path) {
        const entry = this.file(path);
        if (!entry)
            throw Error('NOT_FOUND');
        return entry.readFile();
    }
    rename(from, to) {
        const entry = this.file(from);
        if (!entry)
            throw Error('NOT_FOUND');
        this.entries.delete(from);
        this.addFile(to, entry.contents);
    }
}
exports.DirEntry = DirEntry;
//# sourceMappingURL=dir-entry.js.map