import { Rule, Tree } from "../../../types";

export function blank(options: any): Rule {
  return function (tree: Tree): Tree {
    return tree
  }
}