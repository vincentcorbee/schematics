"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalExpression = void 0;
const constants_1 = require("./constants");
const environment_1 = require("./environment");
function evalExpression(node, env) {
    switch (node.type) {
        case 'binop': {
            const op = constants_1.binaryOperations[node.op];
            if (!op)
                throw Error(`Unexpected binary operator "${node.op}"`);
            return op.apply(evalExpression(node.lhs, env), evalExpression(node.rhs, env), env);
        }
        case 'identifier':
            return env instanceof environment_1.Environment ? env.get(node.name) : env[node.name];
        case 'numeric_literal':
            return Number(node.value);
        case 'member_exp':
            return evalExpression(node.property, evalExpression(node.object, env));
        case 'call_exp': {
            return evalExpression(node.callee, env).apply(env, node.arguments.map(arg => evalExpression(arg, env)));
        }
    }
}
exports.evalExpression = evalExpression;
//# sourceMappingURL=eval-expression.js.map