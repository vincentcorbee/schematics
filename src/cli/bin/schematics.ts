#!/usr/bin/env node
import { getArgs } from "@digitalbranch/get-args"

import { basename, dirname, existsSync, joinPath, readFileSync, resolvePath } from "../../fs";
import { cwd } from "../../constants";
import { runSchematic } from "../../schematics";
import { Collection, Workspace } from "../../types";
import { resolveFilePath } from "../../utils";
import { SchematicNotFoundException } from "../../exception/schematic-not-found.exception";

const helpMessage = `schematics [collection-name:]schematic-name [options, ...]

By default, if the collection name is not specified, the internal collection provided
by the Schematics CLI is used.

Options:
    --debug             Debug mode. This is true by default if the collection is a relative
                        path (in that case, turn off with --debug=false).

    --dry-run           Do not output anything, but instead just show what actions would be
                        performed. Default to true if debug is also true.

    --list-schematics   List all schematics from the collection, by name. A collection name
                        should be suffixed by a colon. Example: '@angular-devkit/schematics-cli:'.

    --help              Show this message.

Any additional option is passed to the Schematics depending on its schema.`

const args = getArgs<{ debug?: boolean, 'dry-run'?: boolean, help?: boolean} & Record<string, any>>('--')

const { debug = false, "dry-run": dryRun = false, help, ...rest } = args

if (help) {
  console.log(helpMessage)

  process.exit(0)
}

const schematicCollectionAndName = process.argv[2]
const parts = schematicCollectionAndName.split(':')
const schematicName = parts.pop();
const collectionName = parts.pop()

const workingDirectory = collectionName ? cwd() : resolvePath(`${__dirname}/..`)
const distDirectory = collectionName ? resolvePath(workingDirectory, 'dist') : workingDirectory

if (!schematicName) throw Error('Schematic name missing')

const pathToCollection = resolvePath(collectionName ?  `${workingDirectory}/${collectionName}` : workingDirectory, 'collection.json')

if(!existsSync(pathToCollection)) new SchematicNotFoundException({ message: 'collection.json not found', code : 'NOT_FOUND' })

const collection = JSON.parse(readFileSync(pathToCollection, { encoding: 'utf8' })) as Collection

const { schematics } = collection

const schematic = schematics[schematicName]

if (!schematic) throw Error (`Schematic ${schematicName} not found`)

const { factory } = schematic

const [factoryFunctionPath, fun] = factory.split('#')

const factoryFunction = require(resolveFilePath(resolvePath(distDirectory, schematicName, `${basename(factoryFunctionPath)}.js`)))[fun]

if (!factoryFunction) throw Error (`Factory function ${fun} not found`)

let workspace: Workspace

try {
  const pathToWorkspace = resolveFilePath(joinPath(workingDirectory, 'workspace.json'), workingDirectory)

  workspace = JSON.parse(readFileSync(pathToWorkspace, { encoding: 'utf8' })) as Workspace
} catch{
  workspace = {
    root: cwd(),
    projects: {}
  }
}

const factoryRoot = resolvePath(workingDirectory, factoryFunctionPath, '../')
const collectionRoot = dirname(pathToCollection)

runSchematic(factoryFunction(rest), { collection, workspace, factoryName: schematicName, factoryRoot, collectionRoot, debug, dryRun })