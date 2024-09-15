"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntry = void 0;
class FileEntry {
    path;
    contents;
    parent;
    modified;
    type = 'file';
    constructor(path, contents, parent, modified) {
        this.path = path;
        this.contents = contents;
        this.parent = parent;
        this.modified = modified;
    }
    read() {
        return this.contents;
    }
    readText() {
        return this.contents.toString('utf-8');
    }
    readJSON() {
        return JSON.parse(this.readText());
    }
}
exports.FileEntry = FileEntry;
//# sourceMappingURL=file-entry.js.map