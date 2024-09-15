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
    write(contents) {
        (0, fs_1.writeFileSync)(this.path, contents);
    }
    read() {
        return (0, fs_1.readFileSync)(this.path);
    }
    readText() {
        return (0, fs_1.readFileSync)(this.path, { encoding: 'utf-8' });
    }
    readJSON() {
        return JSON.parse((0, fs_1.readFileSync)(this.path, { encoding: 'utf-8' }));
    }
}
exports.HostFileEntry = HostFileEntry;
//# sourceMappingURL=host-file-entry.js.map