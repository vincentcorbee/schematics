"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.move = void 0;
const tree_1 = require("../tree");
function move(path) {
    return function (tree, context) {
        const rootDir = tree.root.path;
        const newTree = new tree_1.Tree(context, new tree_1.DirEntry(path, null));
        tree.visit(entry => newTree.create(entry.path.replace(rootDir, path), entry.contents));
        return newTree;
    };
}
exports.move = move;
//# sourceMappingURL=move.js.map