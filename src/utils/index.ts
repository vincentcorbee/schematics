
import { SchematicNotFoundException } from "../exception";
import { strings, rootDir,  } from "../constants";
import { existsSync, joinPath, resolvePath, basename, dirname } from "../fs";

export function applyModifiers(source: string, seperator: '@' | '?', context: Record<string, any>): any
{
  const [prop, ...modifiers] = source.split(seperator)

  if (!Reflect.has(context, prop)) return undefined

  const value = context[prop]

  return modifiers.reduce((acc: any, modifier: string) => modifier in strings ? strings[modifier as keyof typeof strings](acc) : strings.noop(acc), value)
}

export function resolveFilePath(path: string, root = rootDir())
{
  if(existsSync(path)) return path;

  if (dirname(path) === dirname(root)) throw new SchematicNotFoundException({ message: 'File not found', code: 'NOT_FOUND' })

  return resolveFilePath(joinPath(resolvePath(dirname(path), '../'), basename(path)));
}