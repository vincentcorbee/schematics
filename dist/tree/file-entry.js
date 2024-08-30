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
    readFile() {
        return this.contents.toString();
    }
}
exports.FileEntry = FileEntry;
//# sourceMappingURL=file-entry.js.map