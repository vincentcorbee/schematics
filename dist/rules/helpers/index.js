"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacePlaceholdersTemplate = void 0;
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
function replacePlaceholdersTemplate(source, options) {
    return source.replace(constants_1.regExpTemplate, (...args) => {
        if (args[1] === undefined) {
            const keyword = args[2];
            const expr = args[3];
            const body = args[4];
            switch (keyword) {
                case 'if': {
                    if (!expr)
                        throw Error('Expression expected');
                    const value = (0, utils_1.applyModifiers)(expr, '?', options);
                    if (value)
                        return replacePlaceholdersTemplate(body, options);
                    return '';
                }
                case 'for': {
                    if (!expr)
                        throw Error('Expression expected');
                    const predicate = expr.split(' ');
                    const prop = predicate.pop();
                    const value = (0, utils_1.applyModifiers)(prop, '?', options);
                    if (!value)
                        return '';
                    const local = predicate[1];
                    return Object.values(value).reduce((acc, v) => acc + replacePlaceholdersTemplate(body, { ...options, [local]: v }), '');
                }
                default:
                    throw Error(`Unknown keyword: ${keyword}`);
            }
        }
        return (0, utils_1.applyModifiers)(args[1], '?', options);
    });
}
exports.replacePlaceholdersTemplate = replacePlaceholdersTemplate;
//# sourceMappingURL=index.js.map