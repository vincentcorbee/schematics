"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFilePath = exports.applyModifiers = void 0;
const exception_1 = require("../exception");
const constants_1 = require("../constants");
const fs_1 = require("../fs");
function applyModifiers(source, seperator, context) {
    const [prop, ...modifiers] = source.split(seperator);
    if (!Reflect.has(context, prop))
        return undefined;
    const value = context[prop];
    return modifiers.reduce((acc, modifier) => modifier in constants_1.strings ? constants_1.strings[modifier](acc) : constants_1.strings.noop(acc), value);
}
exports.applyModifiers = applyModifiers;
let i = 0;
function resolveFilePath(path, root = (0, constants_1.cwd)()) {
    if ((0, fs_1.existsSync)(path))
        return path;
    if ((0, fs_1.dirname)(path) === (0, fs_1.dirname)(root))
        throw new exception_1.SchematicNotFoundException({ message: `${path.split('/').pop()} not found`, code: 'NOT_FOUND' });
    return resolveFilePath((0, fs_1.joinPath)((0, fs_1.resolvePath)((0, fs_1.dirname)(path), '../'), (0, fs_1.basename)(path)), root);
}
exports.resolveFilePath = resolveFilePath;
//# sourceMappingURL=index.js.map