import { SchematicContext, Source } from "../types";
import { Tree } from "../tree";
import { createDir } from "../tree/helpers";

export function url(path: string): Source
{
  return function (context: SchematicContext): Tree
  {
    return new Tree(context, createDir(path))
  }
}