import { SchematicError, SchematicErrorCodes } from "../types";
import { SchematicBaseException } from "./schematic-base.exception";

export class SchematicNotFoundException extends SchematicBaseException<SchematicErrorCodes> {
  constructor({ message, code, context }: SchematicError<SchematicErrorCodes>) {
    super(message, code, context);
  }
}