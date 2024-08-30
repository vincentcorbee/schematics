import { Token, TokenType } from "./types";
export declare class Lexer {
    source: string;
    index: number;
    constructor(source: string);
    peek(): Token;
    lookahead(num: number): Token;
    expect(tokenType: TokenType): boolean;
    advance(): void;
    next(): Token;
}
//# sourceMappingURL=lexer.d.ts.map