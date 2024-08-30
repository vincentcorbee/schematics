"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = void 0;
function apply(source, rules) {
    return function (context) {
        return rules.reduce((acc, f) => f(acc, context), source(context));
    };
}
exports.apply = apply;
//# sourceMappingURL=apply.js.map