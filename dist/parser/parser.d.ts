import { Lexer } from "./lexer";
import { ASTNode } from "./types";
export declare class Parser {
    lexer: Lexer;
    private currentToken;
    constructor(source: string);
    private peek;
    private advance;
    private expect;
    private parseArguments;
    private parsePrimary;
    private parseExpression;
    parse(): ASTNode;
}
//# sourceMappingURL=parser.d.ts.map