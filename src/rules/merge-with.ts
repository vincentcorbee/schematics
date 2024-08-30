import { Tree, Rule, SchematicContext, Source } from "../types"

export function mergeWith(other: Tree | Source): Rule
{
  return function (tree: Tree, context: SchematicContext) {
    return tree.merge(typeof other === 'function' ? other(context) : other)
  }
}