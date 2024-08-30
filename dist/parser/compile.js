"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const parser_1 = require("./parser");
function compile(src) {
    const parser = new parser_1.Parser(src);
    const result = parser.parse();
    // console.dir({ result }, { depth: null })
    const nextToken = parser.lexer.peek();
    if (nextToken.type !== 'eof')
        throw Error(`Parsing error: unexpected token ${nextToken.value}`);
    return result;
}
exports.compile = compile;
//# sourceMappingURL=compile.js.map