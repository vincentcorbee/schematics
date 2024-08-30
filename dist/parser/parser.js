"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const constants_1 = require("./constants");
const lexer_1 = require("./lexer");
class Parser {
    lexer;
    currentToken;
    constructor(source) {
        this.lexer = new lexer_1.Lexer(source);
        this.currentToken = { type: 'eof', value: '' };
    }
    peek() {
        return this.lexer.peek();
    }
    advance(type, expected) {
        const token = this.lexer.next();
        if (type && type !== token.type)
            throw Error(`Unexpected token "${token.value}"${expected ? ` Expected "${expected}"` : ''}`);
        return this.currentToken = token;
    }
    expect(type) {
        return this.lexer.expect(type);
    }
    parseArguments() {
        const args = [this.parseExpression(this.parsePrimary(), 0)];
        while (this.expect('comma')) {
            this.advance();
            args.push(this.parseExpression(this.parsePrimary(), 0));
        }
        return args;
    }
    parsePrimary() {
        const currentToken = this.advance();
        if (currentToken.type === 'eof')
            throw Error('Unexpected end of input');
        switch (currentToken.type) {
            /* NummericLiteral */
            case 'number': return { type: 'numeric_literal', value: currentToken.value };
            /* ParenthesizedExpression */
            case 'left_paren': {
                const expr = this.parseExpression(this.parsePrimary(), 0);
                this.advance('right_paren', ")");
                return expr;
            }
            /* Identifier | CallExpression | MemberExpression */
            case 'identifier': {
                /* CallExpression */
                if (this.lexer.expect('left_paren')) {
                    this.advance();
                    const args = this.parseArguments();
                    this.advance('right_paren', ")");
                    return {
                        type: 'call_exp',
                        callee: { type: 'identifier', name: currentToken.value },
                        arguments: args
                    };
                }
                /* MemberExpression */
                if (this.expect('dot')) {
                    this.advance();
                    this.advance('identifier', "identifier");
                    let node = {
                        type: 'member_exp',
                        property: { type: 'identifier', name: this.currentToken.value },
                        object: { type: 'identifier', name: currentToken.value }
                    };
                    while (this.expect('dot') || this.expect('left_paren')) {
                        this.advance();
                        if (this.currentToken.type === 'left_paren') {
                            const args = this.parseArguments();
                            this.advance("right_paren", ")");
                            node = {
                                type: 'call_exp',
                                arguments: args,
                                callee: node
                            };
                        }
                        else {
                            this.advance();
                            node = {
                                type: 'member_exp',
                                property: { type: 'identifier', name: this.currentToken.value },
                                object: node
                            };
                        }
                    }
                    return node;
                    // return {
                    //   type: 'member_exp',
                    //   property: this.parseExpression(this.parsePrimary(), 0),
                    //   object: { type: 'identifier', name: token.value }
                    // } as ASTNodeMemberExpression
                }
                /* Identifier */
                return { type: 'identifier', name: currentToken.value };
            }
            /* ConditionalExpression */
            case 'ternary':
                throw Error('');
                break;
            default:
                throw Error(`Unexpected token "${currentToken.value}" (${this.lexer.index})`);
        }
    }
    parseExpression(lhs, precedence) {
        while (true) {
            const token = this.peek();
            if (token.type === 'eof')
                break;
            let op = constants_1.binaryOperations[token.value];
            if (!op || op.precedence < precedence)
                break;
            this.advance();
            let rhs = this.parsePrimary();
            while (true) {
                const token = this.peek();
                if (token.type === 'eof')
                    break;
                let lookahead = constants_1.binaryOperations[token.value];
                if (!lookahead || lookahead.precedence <= precedence)
                    break;
                rhs = this.parseExpression(rhs, lookahead.precedence);
            }
            lhs = {
                type: 'binop',
                lhs,
                op: token.value,
                rhs
            };
        }
        return lhs;
    }
    parse() {
        return this.parseExpression(this.parsePrimary(), 0);
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map