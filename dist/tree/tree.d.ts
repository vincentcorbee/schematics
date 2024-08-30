/// <reference types="node" />
import { FileVisitor, FileEntry, SchematicContext, TreeInterface } from "../types";
import { DirEntry } from "./dir-entry";
import { HostTree } from "./host-tree";
export declare class Tree implements TreeInterface {
    readonly context: SchematicContext;
    readonly root: DirEntry;
    readonly host?: HostTree | undefined;
    constructor(context: SchematicContext, root?: DirEntry, host?: HostTree | undefined);
    visit(visitor: FileVisitor): void;
    file(path: string): FileEntry | undefined;
    readText(path: string): string;
    read(path: string): Buffer;
    overwrite(path: string, contents: Buffer | string): FileEntry;
    create(path: string, contents: Buffer | string): FileEntry;
    merge(other: Tree): this;
}
//# sourceMappingURL=tree.d.ts.map