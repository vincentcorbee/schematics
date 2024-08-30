import { regExpTemplate } from "../../constants"
import { applyModifiers } from "../../utils"

export function replacePlaceholdersTemplate(source: string, options: Record<string, any>): string {
  return source.replace(regExpTemplate, (...args) => {
    if (args[1] === undefined) {
      const keyword = args[2]
      const expr = args[3]
      const body = args[4]

      switch (keyword) {
        case 'if': {
          if (!expr) throw Error('Expression expected')

          const value = applyModifiers(expr, '?', options)

          if (value) return replacePlaceholdersTemplate(body, options)

          return ''
        }
        case 'for': {
          if (!expr) throw Error('Expression expected')

          const predicate = expr.split(' ')

          const prop = predicate.pop()

          const value = applyModifiers(prop, '?', options)

          if(!value) return ''

          const local = predicate[1]

          return Object.values(value).reduce((acc, v) => acc + replacePlaceholdersTemplate(body, { ...options, [local]: v })  ,'')
        }
        default:
          throw Error(`Unknown keyword: ${keyword}`)
      }
    }

    return applyModifiers(args[1], '?', options)
  })
}