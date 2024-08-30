"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compile_1 = require("./compile");
const environment_1 = require("./environment");
const eval_expression_1 = require("./eval-expression");
// const lexer = new Lexer('3.2')
// let next: Token
// while((next = lexer.next()).type !== 'eof') {
//   console.log(next)
// }
// const src = '1 * (2 + 3) * 4 - (4 -3) * 8';
const src = '(5 + 10) * 5';
// const src = 'bar(10, (2 + 3) * 2)'
// (1 * 2) + ((3 * 4) - (4 - (3 * 8)))
console.log(`Input: ${src}`);
const ast = (0, compile_1.compile)(src);
// console.dir(ast, { depth: null })
const env = new environment_1.Environment();
env.set('foo', { bar: { baz: (input) => input * 10 } });
env.set('bar', (...nums) => nums.map(num => num + 2));
env.set('a', 10);
console.log((0, eval_expression_1.evalExpression)(ast, env));
//# sourceMappingURL=test.js.map