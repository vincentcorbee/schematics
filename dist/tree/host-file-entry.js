"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostFileEntry = void 0;
const fs_1 = require("../fs");
class HostFileEntry {
    path;
    parent;
    type = 'file';
    constructor(path, parent) {
        this.path = path;
        this.parent = parent;
    }
    get contents() {
        return (0, fs_1.readFileSync)(this.path);
    }
    set contents(contents) {
        (0, fs_1.writeFileSync)(this.path, contents);
    }
}
exports.HostFileEntry = HostFileEntry;
//# sourceMappingURL=host-file-entry.js.map