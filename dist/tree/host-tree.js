"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostTree = void 0;
const fs_1 = require("../fs");
const helpers_1 = require("./helpers");
const host_dir_entry_1 = require("./host-dir-entry");
class HostTree {
    context;
    rootPath;
    root;
    constructor(context, rootPath) {
        this.context = context;
        this.rootPath = rootPath;
        const { root } = (0, fs_1.parsePath)(rootPath);
        this.root = new host_dir_entry_1.HostDirEntry(root, null); //createHostDir(this.rootPath)
    }
    file(path) {
        const entry = this.root.file((0, fs_1.resolvePath)(this.rootPath, path));
        if (entry)
            return entry;
        return (0, helpers_1.createEntryFromDisk)((0, fs_1.resolvePath)(this.rootPath, path), this.root);
    }
}
exports.HostTree = HostTree;
//# sourceMappingURL=host-tree.js.map