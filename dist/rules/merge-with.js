"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeWith = void 0;
function mergeWith(other) {
    return function (tree, context) {
        return tree.merge(typeof other === 'function' ? other(context) : other);
    };
}
exports.mergeWith = mergeWith;
//# sourceMappingURL=merge-with.js.map