export type TokenType = 'binop' | 'identifier' | 'left_paren' | 'right_paren' | 'number' | 'dot' | 'comma' | 'left_brack' | 'right_brack' | 'eof' | 'newline' | 'ternary' | 'colon';
export type Token = {
    value: string;
    type: TokenType;
};
export type BinaryOperator = {
    precedence: number;
    assoc: 'left' | 'right';
    apply(lhs: any, rhs: any, env?: Scope): any;
};
export type ASTNodeType = 'binop' | 'numeric_literal' | 'identifier' | 'call_exp' | 'member_exp' | 'assign_exp';
export type ASTBaseNode = {
    type: ASTNodeType;
};
export type ASTNodeBinaryExpression = {
    type: 'binop';
    op: string;
    lhs: ASTNode;
    rhs: ASTNode;
} & ASTBaseNode;
export type ASTNodeCallExpression = {
    type: 'call_exp';
    callee: ASTNode;
    arguments: ASTNode[];
} & ASTBaseNode;
export type ASTNodeMemberExpression = {
    type: 'member_exp';
    property: ASTNodeIdentifier;
    object: ASTNodeMemberExpression | ASTNodeIdentifier;
} & ASTBaseNode;
export type ASTNodeNumericLiteral = {
    type: 'numeric_literal';
    value: string;
} & ASTBaseNode;
export type ASTNodeIdentifier = {
    type: 'identifier';
    name: string;
} & ASTBaseNode;
type ASTNodeAssignmentExpression = {
    type: "assign_exp";
    operator: string;
    left: ASTNodeIdentifier;
    right: ASTNode;
} & ASTBaseNode;
export type ASTNode = ASTNodeBinaryExpression | ASTNodeNumericLiteral | ASTNodeIdentifier | ASTNodeCallExpression | ASTNodeMemberExpression | ASTNodeAssignmentExpression;
export interface EnvironmentInterface {
    get(key: string): any;
    set(key: string, value: any): void;
}
export type Environment = EnvironmentInterface;
export type Scope = Environment | Record<string, any>;
export {};
//# sourceMappingURL=types.d.ts.map