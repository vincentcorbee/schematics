"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = void 0;
function chain(rules) {
    return function (tree, context) {
        return rules.reduce((acc, rule) => rule(acc, context), tree);
    };
}
exports.chain = chain;
//# sourceMappingURL=chain.js.map