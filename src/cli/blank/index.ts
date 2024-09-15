import { NodePackageInstallTask } from "../../schematics/tasks";
import { apply, applyTemplates, mergeWith, move, url,  Rule, SchematicContext, Tree } from "../../";

import { Schema } from "./schema";

function createModule(options: Schema): Rule {
  return function(tree: Tree, context: SchematicContext) {
    const { name, ...args } = options

    const templates = apply(url('./files'), [applyTemplates({ name, ...args, schematicsVersion: 'link:../../../../npm-packages/schematics', author: '' }), move(`./${name}`)])

    context.addTask(new NodePackageInstallTask({ workingDirectory: name, packageManager: 'pnpm' }))

    return mergeWith(templates)(tree, context)
 }
}

export function blank(options: Schema): Rule {
  return createModule(options)
}