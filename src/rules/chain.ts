import { Rule, SchematicContext, Tree } from "../types";

export function chain(rules: Rule[]): Rule
{
  return function(tree: Tree, context: SchematicContext) {
    return rules.reduce((acc, rule) => rule(acc, context) , tree)
  }
}