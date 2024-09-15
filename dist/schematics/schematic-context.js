"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicContext = void 0;
class SchematicContext {
    dryRun;
    debug;
    tasks = [];
    constructor(dryRun, debug) {
        this.dryRun = dryRun;
        this.debug = debug;
    }
    addTask(task) {
        this.tasks.push(task);
    }
    async runTasks() {
        for (const task of this.tasks) {
            await task.run();
        }
    }
}
exports.SchematicContext = SchematicContext;
//# sourceMappingURL=schematic-context.js.map