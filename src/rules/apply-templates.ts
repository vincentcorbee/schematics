import { Rule, Tree } from "../types"
import { applyModifiers } from "../utils"
import { replacePlaceholdersTemplate } from './helpers'
import { regExpFilePlaceholders } from '../constants'

export function applyTemplates(options: Record<string, any>): Rule
{
  return function(tree: Tree) {
    tree.visit(entry => {
      // @ts-ignore
      entry.path = entry.path.replace(regExpFilePlaceholders, (...args) => applyModifiers(args[1], '@', options))
      // @ts-ignore
      entry.contents = Buffer.from(replacePlaceholdersTemplate(entry.contents.toString(), options))
    })

    return tree
  }
}