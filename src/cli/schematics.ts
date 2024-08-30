#!/usr/bin/env node
import { getArgs } from "@digitalbranch/get-args"

import { basename, dirname, existsSync, joinPath, readFileSync, resolvePath } from "../fs";
import { rootDir } from "../constants";

import { runSchematic } from "../schematics";
import { Collection, Workspace } from "../types";
import { resolveFilePath } from "../utils";
import { SchematicNotFoundException } from "../exception/schematic-not-found.exception";

const [schematicName, ...argv] = process.argv.slice(2)

const root = rootDir()
const args = getArgs<{ debug?: boolean, 'dry-run'?: boolean, [key: string]: any }>('--', argv)

const { debug = false, "dry-run": dryRun = false, ...rest } = args

const parts = schematicName.split(':')

const factoryFunctionName = parts.pop();

if (!factoryFunctionName) throw Error('Factory function name missing')

const pathToWorkspace = resolveFilePath(joinPath(root, 'workspace.json'))
const workspaceRoot = dirname(pathToWorkspace)

if(!existsSync(workspaceRoot)) throw new SchematicNotFoundException({ message: 'workspace.json not found', code : 'NOT_FOUND' })

const workspace = JSON.parse(readFileSync(pathToWorkspace, { encoding: 'utf8' })) as Workspace

const pathToCollection = resolvePath(root, parts.pop() ?? '.' , 'collection.json')
const collectionRoot = dirname(pathToCollection)

if(!existsSync(pathToCollection)) new SchematicNotFoundException({ message: 'collection.json not found', code : 'NOT_FOUND' })

const collection = JSON.parse(readFileSync(pathToCollection, { encoding: 'utf8' })) as Collection

const { schematics } = collection

const schematic = schematics[factoryFunctionName]

if (!schematic) throw Error (`Schematic ${factoryFunctionName} not found`)

const { factory } = schematic

const [factoryFunctionPath, fun] = factory.split('#')

const factoryFunction = require(resolveFilePath(resolvePath(root, 'dist', factoryFunctionName, `${basename(factoryFunctionPath)}.js`)))[fun]

if (!factoryFunction) throw Error (`Factory function ${fun} not found`)

runSchematic(factoryFunction(rest), { collection, workspace, factoryName: factoryFunctionName, factoryRoot: resolvePath(factoryFunctionPath, '../'), collectionRoot, debug: debug as boolean, dryRun: dryRun as boolean })