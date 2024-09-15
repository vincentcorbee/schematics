"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDir = exports.createEntryFromDisk = exports.traverseDir = exports.visitFiles = exports.getPathSegments = void 0;
const fs_1 = require("../../fs");
const constants_1 = require("../../constants");
const dir_entry_1 = require("../dir-entry");
function getPathSegments(path, withRoot = false) {
    const segments = path.split(fs_1.seperator);
    if (withRoot)
        return segments.map(segment => segment || fs_1.seperator);
    return segments.filter(Boolean);
}
exports.getPathSegments = getPathSegments;
function visitFiles(dir, visitor) {
    dir.entries.forEach(entry => {
        if (entry.type === 'file')
            visitor(entry);
        else
            visitFiles(entry, visitor);
    });
}
exports.visitFiles = visitFiles;
function traverseDir(dir, visitor) {
    dir.entries.forEach(entry => {
        if (entry.type === 'file')
            visitor(entry);
        else {
            visitor(entry);
            traverseDir(entry, visitor);
        }
    });
}
exports.traverseDir = traverseDir;
function createEntryFromDisk(path, parent) {
    const { dir: dirName, base } = (0, fs_1.parsePath)(path);
    const entry = (0, fs_1.readdirSync)(dirName, { withFileTypes: true }).find(e => e.name === base);
    if (!entry)
        throw Error('NOT_FOUND');
    const segments = getPathSegments(path, true);
    const { length } = segments;
    let currentDir = parent;
    let hostEntry;
    for (let i = 1; i <= length; i++) {
        const currentPath = (0, fs_1.joinPath)(...segments.slice(0, i));
        if (currentPath === parent.path)
            continue;
        if (i === length) {
            if (entry.isFile())
                hostEntry = currentDir.addFile(currentPath);
            break;
        }
        currentDir = currentDir.addDir(currentPath);
    }
    return hostEntry;
}
exports.createEntryFromDisk = createEntryFromDisk;
function createDir(path, parent) {
    const resolvedPath = (0, fs_1.resolvePath)((0, constants_1.cwd)(), path);
    const dir = (0, fs_1.readdirSync)(resolvedPath, { withFileTypes: true });
    const dirEntry = new dir_entry_1.DirEntry((0, fs_1.joinPath)(path), parent ?? null);
    for (const entry of dir) {
        if (entry.isFile())
            dirEntry.addFile((0, fs_1.joinPath)(path, entry.name), (0, fs_1.readFileSync)((0, fs_1.resolvePath)(resolvedPath, entry.name)));
        if (entry.isDirectory())
            dirEntry.addDir(createDir((0, fs_1.joinPath)(path, entry.name), dirEntry));
    }
    return dirEntry;
}
exports.createDir = createDir;
//# sourceMappingURL=index.js.map