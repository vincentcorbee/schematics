import { exec } from "node:child_process"
import { SchematicTask } from "./schematic.task"
import { Spinner } from "@digitalbranch/spinner"

export class NodePackageInstallTask extends SchematicTask {
  constructor(private readonly options: { workingDirectory?: string, packageManager: 'pnpm' | 'yarn' | 'npm' }) {
    super()
  }

  run(): Promise<void> {
    const { promise, resolve } = Promise.withResolvers<void>()

    const spinner = new Spinner()

    spinner.start(`Installing packages using ${this.options.packageManager}...`)

    exec(`${this.options.packageManager} install`, { cwd: this.options.workingDirectory }, (error) => {
      if (error) {
        spinner.failed(error.message)

        this.emit('error', error)
      } else {
        spinner.success(`Packages installed successfully.`)

        this.emit('completed')
      }

      resolve()
    })

    return promise
  }

  onError(listener: (error: Error) => void) {
    this.on('error', listener)
  }

  onCompleted(listener: () => void) {
    this.on('completed', listener)
  }
}