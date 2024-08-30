import { SchematicError, SchematicErrorCodes } from "../types";
import { SchematicBaseException } from "./schematic-base.exception";
export declare class SchematicNotFoundException extends SchematicBaseException<SchematicErrorCodes> {
    constructor({ message, code, context }: SchematicError<SchematicErrorCodes>);
}
//# sourceMappingURL=schematic-not-found.exception.d.ts.map