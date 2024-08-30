import { SchematicContext } from "../types";
import { HostFileEntry } from "./host-file-entry";
export declare class HostTree {
    readonly context: SchematicContext;
    readonly rootPath: string;
    private root;
    constructor(context: SchematicContext, rootPath: string);
    file(path: string): HostFileEntry | undefined;
}
//# sourceMappingURL=host-tree.d.ts.map