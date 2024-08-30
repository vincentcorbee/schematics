import { Rule, SchematicContext, Source } from "../types";

export function apply(source: Source, rules: Rule[]): Source
{
  return function (context: SchematicContext) {
    return rules.reduce((acc, f) => f(acc, context), source(context));
  }
}