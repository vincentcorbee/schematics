"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSchematic = void 0;
const tree_1 = require("../tree");
const helpers_1 = require("../tree/helpers");
const styler_1 = require("@digitalbranch/styler");
const fs_1 = require("../fs");
const constants_1 = require("../constants");
const host_tree_1 = require("../tree/host-tree");
function runSchematic(schematic, { factoryRoot, dryRun, debug, workspace }) {
    const root = (0, constants_1.rootDir)();
    const context = { dryRun, debug };
    const hostTree = new host_tree_1.HostTree(context, (0, fs_1.resolvePath)(workspace.root));
    const rootTree = new tree_1.Tree(context, undefined, hostTree);
    process.chdir(factoryRoot);
    const tree = schematic(rootTree, context);
    if (dryRun)
        console.log(`${styler_1.styler.cyan.bold('DRY-RUN')} 🚀`);
    process.chdir(root);
    let hasModifications = false;
    (0, helpers_1.traverseDir)(tree.root, (entry) => {
        const path = (0, fs_1.resolvePath)(workspace.root, entry.path);
        if (entry.type === 'dir' && !dryRun && !(0, fs_1.existsSync)(path))
            (0, fs_1.mkdirSync)(path);
        else if (entry.type === 'file') {
            const fileExists = (0, fs_1.existsSync)(path);
            // @ts-ignore
            if (!dryRun && entry.modified)
                (0, fs_1.writeFileSync)(path, entry.contents);
            // @ts-ignore
            if (entry.modified) {
                hasModifications = true;
                console.log(`${styler_1.styler.green(fileExists ? 'UPDATED' : 'CREATED')} ${path} (${entry.contents.byteLength} bytes)`);
            }
        }
    });
    if (!hasModifications)
        console.log(`${styler_1.styler.bold.magenta('Nothing')} to be ${styler_1.styler.bold.magenta('done')} 🎉`);
}
exports.runSchematic = runSchematic;
//# sourceMappingURL=run-schematic.js.map