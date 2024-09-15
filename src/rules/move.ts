import { DirEntry, Tree } from "../tree"
import { Rule, SchematicContext } from "../types"

export function move(path: string): Rule
{
  return function (tree: Tree, context: SchematicContext): Tree
  {
    const rootDir = tree.root.path
    const newTree = new Tree(context, new DirEntry(path, null))

    tree.visit(entry => newTree.createFile(entry.path.replace(rootDir, path), entry.contents))

    return newTree
  } as unknown as Rule
}