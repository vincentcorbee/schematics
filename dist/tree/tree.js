"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
const fs_1 = require("../fs");
const helpers_1 = require("./helpers");
const dir_entry_1 = require("./dir-entry");
const emitter_1 = require("../common/emitter");
class Tree extends emitter_1.Emitter {
    context;
    root;
    host;
    constructor(context, root = new dir_entry_1.DirEntry('', null), host) {
        super();
        this.context = context;
        this.root = root;
        this.host = host;
    }
    visit(visitor) {
        (0, helpers_1.visitFiles)(this.root, visitor);
    }
    traverse(visitor) {
        (0, helpers_1.traverseDir)(this.root, visitor);
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    file(path) {
        const file = this.root.file(path);
        if (file)
            return file;
        if (this.host) {
            const hostFileEntry = this.host.file(path);
            if (hostFileEntry) {
                return this.createFile(hostFileEntry.path.replace(this.host.rootPath, ''), hostFileEntry.readText());
            }
        }
    }
    readText(path) {
        const file = this.file(path);
        if (!file)
            throw Error('NOT_FOUND');
        return file.readText();
    }
    readJSON(path) {
        return JSON.parse(this.readText(path));
    }
    read(path) {
        const file = this.file(path);
        if (!file)
            throw Error('NOT_FOUND');
        return file.read();
    }
    overwrite(path, contents) {
        return this.createFile(path, contents);
    }
    createFile(path, contents) {
        const resolvedPath = (0, fs_1.resolvePath)('/', path);
        const segments = (0, helpers_1.getPathSegments)(resolvedPath);
        const { length } = segments;
        let currentDir = this.root;
        for (let i = 1; i <= length; i++) {
            const currentPath = (0, fs_1.joinPath)(...segments.slice(0, i));
            if (i === length)
                return currentDir.addFile(currentPath, contents);
            currentDir = currentDir.addDir(currentPath);
        }
        throw Error('FILE_CREATION_FAILED');
    }
    merge(other) {
        other.visit(entry => this.overwrite(entry.path, entry.contents));
        return this;
    }
    commit() {
        const { context: { dryRun }, host } = this;
        if (!host)
            return false;
        let hasModifications = false;
        this.traverse((entry) => {
            const path = (0, fs_1.resolvePath)(host.rootPath, entry.path);
            if (entry.type === 'dir' && !dryRun && !(0, fs_1.existsSync)(path))
                (0, fs_1.mkdirSync)(path);
            else if (entry.type === 'file') {
                const fileExists = (0, fs_1.existsSync)(path);
                if (!dryRun && entry.modified)
                    (0, fs_1.writeFileSync)(path, entry.contents);
                if (entry.modified) {
                    hasModifications = true;
                    this.emit(fileExists ? 'update' : 'create', entry);
                }
            }
        });
        return hasModifications;
    }
}
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map