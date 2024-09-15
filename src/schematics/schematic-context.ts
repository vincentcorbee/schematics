import { SchematicTask } from "types"

export class SchematicContext {
  private tasks: SchematicTask[] = []

  constructor(readonly dryRun: boolean, readonly debug: boolean) {}

  addTask(task: SchematicTask) {
    this.tasks.push(task)
  }

  async runTasks() {
    for (const task of this.tasks) {
      await task.run()
    }
  }
}