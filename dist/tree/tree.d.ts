/// <reference types="node" />
import { FileVisitor, FileEntry, SchematicContext, TreeInterface, Visitor } from "../types";
import { DirEntry } from "./dir-entry";
import { HostTree } from "./host-tree";
import { Emitter, Listener } from "../common/emitter";
export declare class Tree extends Emitter<'update' | 'create'> implements TreeInterface {
    readonly context: SchematicContext;
    readonly root: DirEntry;
    readonly host?: HostTree | undefined;
    constructor(context: SchematicContext, root?: DirEntry, host?: HostTree | undefined);
    visit(visitor: FileVisitor): void;
    traverse(visitor: Visitor): void;
    on(event: 'update' | 'create', listener: Listener): this;
    file(path: string): FileEntry | undefined;
    readText(path: string): string;
    readJSON<T = any>(path: string): T;
    read(path: string): Buffer;
    overwrite(path: string, contents: Buffer | string): FileEntry;
    createFile(path: string, contents: Buffer | string): FileEntry;
    merge(other: Tree): Tree;
    commit(): boolean;
}
//# sourceMappingURL=tree.d.ts.map