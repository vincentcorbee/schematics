import { SchematicTask } from "types";
export declare class SchematicContext {
    readonly dryRun: boolean;
    readonly debug: boolean;
    private tasks;
    constructor(dryRun: boolean, debug: boolean);
    addTask(task: SchematicTask): void;
    runTasks(): Promise<void>;
}
//# sourceMappingURL=schematic-context.d.ts.map