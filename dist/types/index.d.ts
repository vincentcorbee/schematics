/// <reference types="node" />
import { HostTree } from "../tree/host-tree";
export interface SchematicTaskInterface {
    run(): Promise<void> | void;
}
export type SchematicTask = SchematicTaskInterface;
export interface SchematicContextInterface {
    readonly dryRun: boolean;
    readonly debug: boolean;
    addTask(task: SchematicTask): void;
}
export type SchematicContext = SchematicContextInterface;
export type Schematic = {
    description: string;
    factory: string;
};
export type Schematics = {
    [name: string]: Schematic;
};
export type Collection = {
    schematics: Schematics;
};
export type WorkspaceProject = {
    [name: string]: {
        root: string;
    };
};
export type WorkspaceProjects = {
    [name: string]: WorkspaceProject;
};
export type Workspace = {
    root: string;
    projects: WorkspaceProjects;
};
export type Rule = (tree: Tree, context: SchematicContext) => Tree;
export type Source = (context: SchematicContext) => Tree;
export type FileVisitor = (file: FileEntry) => void;
export type Visitor = (entry: DirEntry | FileEntry) => void;
export type Tree = TreeInterface;
export type DirEntry = DirEntryInterface;
export type FileEntry = FileEntryInterface;
export interface TreeInterface {
    readonly host?: HostTree;
    readonly root: DirEntry;
    readonly context: SchematicContext;
    merge(other: Tree): Tree;
    file(path: string): FileEntry | undefined;
    visit(visitor: FileVisitor): void;
    createFile(path: string, contents: Buffer | string): FileEntry;
    overwrite(path: string, contents: Buffer | string): FileEntry;
    read(path: string): Buffer;
    readText(path: string): string;
    readJSON<T = any>(path: string): T;
}
export interface DirEntryInterface {
    readonly type: 'dir';
    readonly parent: DirEntry | null;
    readonly path: string;
    readonly entries: Map<string, DirEntry | FileEntry>;
    addDir(path: string | DirEntry): DirEntry;
    addFile(path: string, contents: Buffer | string): FileEntry;
    file(path: string): FileEntry | undefined;
    readFile(path: string): string;
    rename(from: string, to: string): void;
}
export interface FileEntryInterface {
    readonly type: 'file';
    readonly parent: DirEntry;
    readonly path: string;
    readonly contents: Buffer;
    readonly modified: boolean;
    read(): Buffer;
    readText(): string;
    readJSON<T = any>(path: string): T;
}
export type SchematicError<T> = {
    message: string;
    code: T;
    context?: any;
};
export type SchematicErrorCodes = 'UNKNOWN' | 'NOT_FOUND';
//# sourceMappingURL=index.d.ts.map