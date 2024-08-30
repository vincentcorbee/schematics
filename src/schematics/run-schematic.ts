
import { Tree } from "../tree"
import { Collection, Rule, SchematicContext, Workspace } from "../types"
import { traverseDir } from "../tree/helpers"
import { styler } from "@digitalbranch/styler";
import { existsSync, mkdirSync, resolvePath, writeFileSync } from "../fs";
import { rootDir } from "../constants";
import { HostTree } from "../tree/host-tree";

type RunSchematicContext = {
  factoryName: string,
  collectionRoot: string,
  factoryRoot: string,
  debug: boolean,
  dryRun: boolean,
  collection: Collection,
  workspace: Workspace
}

export function runSchematic(schematic: Rule, { factoryRoot, dryRun, debug, workspace }: RunSchematicContext): void
{
  const root = rootDir()

  const context: SchematicContext = { dryRun, debug }

  const hostTree = new HostTree(context, resolvePath(workspace.root))

  const rootTree = new Tree(context, undefined, hostTree)

  process.chdir(factoryRoot)

  const tree = schematic(rootTree, context) as Tree

  if (dryRun) console.log(`${styler.cyan.bold('DRY-RUN')} 🚀`)

  process.chdir(root)

  let hasModifications = false;

  traverseDir(tree.root, (entry) => {
    const path = resolvePath(workspace.root, entry.path)

    if(entry.type === 'dir' && !dryRun && !existsSync(path)) mkdirSync(path)

    else if(entry.type === 'file') {
      const fileExists = existsSync(path)

      // @ts-ignore
      if (!dryRun && entry.modified) writeFileSync(path, entry.contents)

      // @ts-ignore
      if(entry.modified) {
        hasModifications = true

        console.log(`${styler.green(fileExists ? 'UPDATED' : 'CREATED')} ${path} (${entry.contents.byteLength} bytes)`)
      }
    }
  })

  if (!hasModifications) console.log(`${styler.bold.magenta('Nothing')} to be ${styler.bold.magenta('done')} 🎉`)
}