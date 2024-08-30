"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
const fs_1 = require("../fs");
const helpers_1 = require("./helpers");
const dir_entry_1 = require("./dir-entry");
class Tree {
    context;
    root;
    host;
    constructor(context, root = new dir_entry_1.DirEntry('', null), host) {
        this.context = context;
        this.root = root;
        this.host = host;
    }
    visit(visitor) {
        (0, helpers_1.visitFiles)(this.root, visitor);
    }
    file(path) {
        const fileEntry = this.root.file(path);
        if (fileEntry)
            return fileEntry;
        if (this.host) {
            const hostFileEntry = this.host.file(path);
            if (hostFileEntry) {
                const file = this.create(hostFileEntry.path.replace(this.host.rootPath, ''), hostFileEntry.contents);
                file.modified = false;
                return file;
            }
        }
    }
    readText(path) {
        const entry = this.file(path);
        if (!entry)
            throw Error('NOT_FOUND');
        return entry.contents.toString('utf-8');
    }
    read(path) {
        const entry = this.file(path);
        if (!entry)
            throw Error('NOT_FOUND');
        return entry.contents;
    }
    overwrite(path, contents) {
        const newEntry = this.create(path, contents);
        newEntry.modified = true;
        return newEntry;
    }
    create(path, contents) {
        const resolvedPath = (0, fs_1.resolvePath)('/', path);
        const segments = (0, helpers_1.getPathSegments)(resolvedPath);
        const { length } = segments;
        let file;
        let currentDir = this.root;
        for (let i = 1; i <= length; i++) {
            const currentPath = (0, fs_1.joinPath)(...segments.slice(0, i));
            if (i === length) {
                file = currentDir.addFile(currentPath, contents);
                break;
            }
            currentDir = currentDir.addDir(currentPath);
        }
        return file;
    }
    merge(other) {
        other.visit(entry => this.overwrite(entry.path, entry.contents));
        return this;
    }
}
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map