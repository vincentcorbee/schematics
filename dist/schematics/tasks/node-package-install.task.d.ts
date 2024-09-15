import { SchematicTask } from "./schematic.task";
export declare class NodePackageInstallTask extends SchematicTask {
    private readonly options;
    constructor(options: {
        workingDirectory?: string;
        packageManager: 'pnpm' | 'yarn' | 'npm';
    });
    run(): Promise<void>;
    onError(listener: (error: Error) => void): void;
    onCompleted(listener: () => void): void;
}
//# sourceMappingURL=node-package-install.task.d.ts.map