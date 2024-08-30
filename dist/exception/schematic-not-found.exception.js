"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicNotFoundException = void 0;
const schematic_base_exception_1 = require("./schematic-base.exception");
class SchematicNotFoundException extends schematic_base_exception_1.SchematicBaseException {
    constructor({ message, code, context }) {
        super(message, code, context);
    }
}
exports.SchematicNotFoundException = SchematicNotFoundException;
//# sourceMappingURL=schematic-not-found.exception.js.map