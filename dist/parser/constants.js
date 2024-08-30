"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binaryOperations = void 0;
exports.binaryOperations = {
    "=": {
        assoc: 'left',
        precedence: 1,
        apply: (lhs, rhs, env) => env.set(lhs, rhs)
    },
    "==": {
        assoc: 'left',
        precedence: 1,
        apply: (lhs, rhs) => lhs === rhs
    },
    "+": {
        assoc: 'left',
        precedence: 1,
        apply: (lhs, rhs) => lhs + rhs
    },
    "-": {
        assoc: 'left',
        precedence: 1,
        apply: (lhs, rhs) => lhs - rhs
    },
    "*": {
        assoc: 'left',
        precedence: 2,
        apply: (lhs, rhs) => lhs * rhs
    },
    "/": {
        assoc: 'left',
        precedence: 2,
        apply: (lhs, rhs) => lhs / rhs
    }
};
//# sourceMappingURL=constants.js.map