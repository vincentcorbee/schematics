"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
function eatWhiteSpace(lexer) {
    const { source } = lexer;
    while (source[lexer.index] === ' ' || source[lexer.index] === '\t' || source[lexer.index] === '\r')
        lexer.index++;
}
function peekChar(lexer) {
    return lexer.source[lexer.index];
}
function peekAt(lexer, pos) {
    return lexer.source[lexer.index + pos];
}
function eatChar(lexer, count = 1) {
    let result = '';
    while (count) {
        result += lexer.source[lexer.index++],
            count--;
    }
    return result;
}
function isAsciiAz(char) {
    const code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}
function isIdentifierStart(char) {
    return isAsciiAz(char) || char == '$';
}
function isInteger(char) {
    const code = char.charCodeAt(0);
    return code >= 48 && code <= 57;
}
function isDot(char) {
    return char === '.';
}
function hasData(lexer) {
    return !!lexer.source[lexer.index];
}
function eatInteger(lexer) {
    let value = '';
    const { source } = lexer;
    while (isInteger(source[lexer.index] ?? ''))
        value += eatChar(lexer);
    return value;
}
function eatNumber(lexer) {
    let value = '';
    const { source } = lexer;
    value = eatInteger(lexer);
    if (isDot(source[lexer.index] ?? ''))
        value += eatChar(lexer) + eatInteger(lexer);
    return value;
}
function eatIdentifer(lexer) {
    let idenifier = '';
    while (hasData(lexer) && isAsciiAz(lexer.source[lexer.index]))
        idenifier += eatChar(lexer);
    return idenifier;
}
function tokenCreate(type, value) {
    return {
        type,
        value,
    };
}
class Lexer {
    source;
    index = 0;
    constructor(source) {
        this.source = source;
    }
    peek() {
        const index = this.index;
        const token = this.next();
        this.index = index;
        return token;
    }
    lookahead(num) {
        const index = this.index;
        while (num > 0) {
            num--;
            this.advance();
        }
        const token = this.next();
        this.index = index;
        return token;
    }
    expect(tokenType) {
        return this.peek().type === tokenType;
    }
    advance() {
        this.next();
    }
    next() {
        if (!hasData(this))
            return {
                type: 'eof',
                value: ''
            };
        const { index } = this;
        const nextChar = peekChar(this);
        switch (nextChar) {
            case ' ':
            case '\t':
            case '\r':
                eatWhiteSpace(this);
                return this.next();
            case "+":
            case "-":
            case "*":
            case "/":
                return tokenCreate('binop', eatChar(this));
            case '=': return tokenCreate('binop', eatChar(this, peekAt(this, 1) === '=' ? 2 : 1));
            case "?":
                return {
                    value: eatChar(this),
                    type: 'ternary'
                };
            case ":":
                return {
                    value: eatChar(this),
                    type: 'colon'
                };
            case "(":
                return {
                    value: eatChar(this),
                    type: 'left_paren'
                };
            case ")":
                return {
                    value: eatChar(this),
                    type: 'right_paren'
                };
            case ",":
                return {
                    value: eatChar(this),
                    type: 'comma'
                };
            case ".": {
                if (isInteger(peekAt(this, 1)))
                    return {
                        value: eatChar(this) + eatNumber(this),
                        type: 'number'
                    };
                return {
                    value: eatChar(this),
                    type: 'dot'
                };
            }
            case "[":
                return {
                    value: eatChar(this),
                    type: 'left_brack'
                };
            case "]":
                return {
                    value: eatChar(this),
                    type: 'right_brack'
                };
            default:
                if (isInteger(nextChar))
                    return {
                        value: eatNumber(this),
                        type: 'number'
                    };
                if (isIdentifierStart(nextChar))
                    return {
                        value: eatIdentifer(this),
                        type: 'identifier'
                    };
                throw Error(`Unexpected token "${nextChar}" (${index})`);
        }
    }
}
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map