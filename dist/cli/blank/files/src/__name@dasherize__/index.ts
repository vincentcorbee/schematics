import { Rule, Tree } from "@digitalbranch/schematics";
import { Schema } from '../schema'

export function <%= name?camelize %>(_options: Schema): Rule {
  return function (tree: Tree): Tree {
    return tree
  }
}