export declare class SchematicBaseException<Code extends string = 'UNKNOWN'> extends Error {
    message: string;
    code?: Code | undefined;
    context: {};
    constructor(message: string, code?: Code | undefined, context?: {});
    toString(): string;
    toJSON(): {
        message: string;
        code: Code | undefined;
        context: {};
    };
    private createCodeFromMessage;
}
//# sourceMappingURL=schematic-base.exception.d.ts.map