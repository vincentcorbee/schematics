"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePackageInstallTask = void 0;
const node_child_process_1 = require("node:child_process");
const schematic_task_1 = require("./schematic.task");
const spinner_1 = require("@digitalbranch/spinner");
class NodePackageInstallTask extends schematic_task_1.SchematicTask {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    run() {
        const { promise, resolve } = Promise.withResolvers();
        const spinner = new spinner_1.Spinner();
        spinner.start(`Installing packages using ${this.options.packageManager}...`);
        (0, node_child_process_1.exec)(`${this.options.packageManager} install`, { cwd: this.options.workingDirectory }, (error) => {
            if (error) {
                spinner.failed(error.message);
                this.emit('error', error);
            }
            else {
                spinner.success(`Packages installed successfully.`);
                this.emit('completed');
            }
            resolve();
        });
        return promise;
    }
    onError(listener) {
        this.on('error', listener);
    }
    onCompleted(listener) {
        this.on('completed', listener);
    }
}
exports.NodePackageInstallTask = NodePackageInstallTask;
//# sourceMappingURL=node-package-install.task.js.map