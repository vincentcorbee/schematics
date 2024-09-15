"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blank = void 0;
const tasks_1 = require("../../schematics/tasks");
const __1 = require("../../");
function createModule(options) {
    return function (tree, context) {
        const { name, ...args } = options;
        const templates = (0, __1.apply)((0, __1.url)('./files'), [(0, __1.applyTemplates)({ name, ...args, schematicsVersion: 'link:../../../../npm-packages/schematics', author: '' }), (0, __1.move)(`./${name}`)]);
        context.addTask(new tasks_1.NodePackageInstallTask({ workingDirectory: name, packageManager: 'pnpm' }));
        return (0, __1.mergeWith)(templates)(tree, context);
    };
}
function blank(options) {
    return createModule(options);
}
exports.blank = blank;
//# sourceMappingURL=index.js.map