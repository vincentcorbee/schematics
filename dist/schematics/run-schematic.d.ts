import { Collection, Rule, Workspace } from "../types";
type RunSchematicContext = {
    factoryName: string;
    collectionRoot: string;
    factoryRoot: string;
    debug: boolean;
    dryRun: boolean;
    collection: Collection;
    workspace: Workspace;
};
export declare function runSchematic(schematic: Rule, { factoryRoot, dryRun, debug, workspace }: RunSchematicContext): void;
export {};
//# sourceMappingURL=run-schematic.d.ts.map