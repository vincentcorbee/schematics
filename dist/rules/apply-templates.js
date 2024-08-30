"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyTemplates = void 0;
const utils_1 = require("../utils");
const helpers_1 = require("./helpers");
const constants_1 = require("../constants");
function applyTemplates(options) {
    return function (tree) {
        tree.visit(entry => {
            // @ts-ignore
            entry.path = entry.path.replace(constants_1.regExpFilePlaceholders, (...args) => (0, utils_1.applyModifiers)(args[1], '@', options));
            // @ts-ignore
            entry.contents = Buffer.from((0, helpers_1.replacePlaceholdersTemplate)(entry.contents.toString(), options));
        });
        return tree;
    };
}
exports.applyTemplates = applyTemplates;
//# sourceMappingURL=apply-templates.js.map