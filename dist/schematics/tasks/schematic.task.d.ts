import { SchematicTaskInterface } from "types";
import { Emitter } from "../../common/emitter";
export declare abstract class SchematicTask extends Emitter<'completed'> implements SchematicTaskInterface {
    constructor();
    run(): void;
}
//# sourceMappingURL=schematic.task.d.ts.map