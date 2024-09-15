
import { Tree } from "../tree"
import { Collection, FileEntry, Rule, Workspace } from "../types"
import { styler } from "@digitalbranch/styler";
import { resolvePath } from "../fs";
import { cwd } from "../constants";
import { HostTree } from "../tree/host-tree";
import { SchematicContext } from "./schematic-context";

type RunSchematicContext = {
  factoryName: string,
  collectionRoot: string,
  factoryRoot: string,
  debug: boolean,
  dryRun: boolean,
  collection: Collection,
  workspace: Workspace
}

function createMessage(event: 'CREATED' | 'UPDATED', entry: FileEntry): string
{
  return `${styler.green.bold(event)} ${entry.path} ${styler.gray(`(${entry.contents.byteLength} bytes)`)}`
}

export async function runSchematic(schematic: Rule, { factoryRoot, dryRun, debug, workspace }: RunSchematicContext): Promise<void>
{
  const workingDirectory = cwd()
  const context = new SchematicContext(dryRun, debug)
  const hostTree = new HostTree(context, resolvePath(workspace.root))
  const rootTree = new Tree(context, undefined, hostTree)

  process.chdir(factoryRoot)

  const tree = schematic(rootTree, context) as Tree

  process.chdir(workingDirectory)

  tree.on('create',entry => console.log(createMessage('CREATED', entry)))
  tree.on('update',entry => console.log(createMessage('UPDATED', entry)))

  const hasModifications = tree.commit()

  if (dryRun) console.log(`${styler.cyan.bold('DRY-RUN')} 🚀 No files written to disk.`)

  if (!hasModifications) console.log(`${styler.bold.magenta('Nothing')} to be ${styler.bold.magenta('done')} 🎉`)

  if (!dryRun) await context.runTasks()
}