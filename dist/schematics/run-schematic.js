"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSchematic = void 0;
const tree_1 = require("../tree");
const styler_1 = require("@digitalbranch/styler");
const fs_1 = require("../fs");
const constants_1 = require("../constants");
const host_tree_1 = require("../tree/host-tree");
const schematic_context_1 = require("./schematic-context");
function createMessage(event, entry) {
    return `${styler_1.styler.green.bold(event)} ${entry.path} ${styler_1.styler.gray(`(${entry.contents.byteLength} bytes)`)}`;
}
async function runSchematic(schematic, { factoryRoot, dryRun, debug, workspace }) {
    const workingDirectory = (0, constants_1.cwd)();
    const context = new schematic_context_1.SchematicContext(dryRun, debug);
    const hostTree = new host_tree_1.HostTree(context, (0, fs_1.resolvePath)(workspace.root));
    const rootTree = new tree_1.Tree(context, undefined, hostTree);
    process.chdir(factoryRoot);
    const tree = schematic(rootTree, context);
    process.chdir(workingDirectory);
    tree.on('create', entry => console.log(createMessage('CREATED', entry)));
    tree.on('update', entry => console.log(createMessage('UPDATED', entry)));
    const hasModifications = tree.commit();
    if (dryRun)
        console.log(`${styler_1.styler.cyan.bold('DRY-RUN')} 🚀 No files written to disk.`);
    if (!hasModifications)
        console.log(`${styler_1.styler.bold.magenta('Nothing')} to be ${styler_1.styler.bold.magenta('done')} 🎉`);
    if (!dryRun)
        await context.runTasks();
}
exports.runSchematic = runSchematic;
//# sourceMappingURL=run-schematic.js.map