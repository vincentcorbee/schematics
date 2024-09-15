import { SchematicTaskInterface } from "types";
import { Emitter } from "../../common/emitter";

export abstract class SchematicTask extends Emitter<'completed'> implements SchematicTaskInterface {
  constructor() {
    super();
  }

  run() {
    throw new Error('Method not implemented.');
  }
}