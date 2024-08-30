"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicBaseException = void 0;
class SchematicBaseException extends Error {
    message;
    code;
    context;
    constructor(message, code, context = {}) {
        super(JSON.stringify({ message, code }));
        this.message = message;
        this.code = code;
        this.context = context;
        if (!this.code)
            this.createCodeFromMessage();
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    toJSON() {
        return {
            message: this.message,
            code: this.code,
            context: this.context,
        };
    }
    createCodeFromMessage() {
        this.code = (this.message?.replace(/\s/g, '_').toUpperCase() ?? 'UNKNOWN');
    }
}
exports.SchematicBaseException = SchematicBaseException;
//# sourceMappingURL=schematic-base.exception.js.map