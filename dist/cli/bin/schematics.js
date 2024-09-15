#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_args_1 = require("@digitalbranch/get-args");
const fs_1 = require("../../fs");
const constants_1 = require("../../constants");
const schematics_1 = require("../../schematics");
const utils_1 = require("../../utils");
const schematic_not_found_exception_1 = require("../../exception/schematic-not-found.exception");
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

Any additional option is passed to the Schematics depending on its schema.`;
const args = (0, get_args_1.getArgs)('--');
const { debug = false, "dry-run": dryRun = false, help, ...rest } = args;
if (help) {
    console.log(helpMessage);
    process.exit(0);
}
const schematicCollectionAndName = process.argv[2];
const parts = schematicCollectionAndName.split(':');
const schematicName = parts.pop();
const collectionName = parts.pop();
const workingDirectory = collectionName ? (0, constants_1.cwd)() : (0, fs_1.resolvePath)(`${__dirname}/..`);
const distDirectory = collectionName ? (0, fs_1.resolvePath)(workingDirectory, 'dist') : workingDirectory;
if (!schematicName)
    throw Error('Schematic name missing');
const pathToCollection = (0, fs_1.resolvePath)(collectionName ? `${workingDirectory}/${collectionName}` : workingDirectory, 'collection.json');
if (!(0, fs_1.existsSync)(pathToCollection))
    new schematic_not_found_exception_1.SchematicNotFoundException({ message: 'collection.json not found', code: 'NOT_FOUND' });
const collection = JSON.parse((0, fs_1.readFileSync)(pathToCollection, { encoding: 'utf8' }));
const { schematics } = collection;
const schematic = schematics[schematicName];
if (!schematic)
    throw Error(`Schematic ${schematicName} not found`);
const { factory } = schematic;
const [factoryFunctionPath, fun] = factory.split('#');
const factoryFunction = require((0, utils_1.resolveFilePath)((0, fs_1.resolvePath)(distDirectory, schematicName, `${(0, fs_1.basename)(factoryFunctionPath)}.js`)))[fun];
if (!factoryFunction)
    throw Error(`Factory function ${fun} not found`);
let workspace;
try {
    const pathToWorkspace = (0, utils_1.resolveFilePath)((0, fs_1.joinPath)(workingDirectory, 'workspace.json'), workingDirectory);
    workspace = JSON.parse((0, fs_1.readFileSync)(pathToWorkspace, { encoding: 'utf8' }));
}
catch {
    workspace = {
        root: (0, constants_1.cwd)(),
        projects: {}
    };
}
const factoryRoot = (0, fs_1.resolvePath)(workingDirectory, factoryFunctionPath, '../');
const collectionRoot = (0, fs_1.dirname)(pathToCollection);
(0, schematics_1.runSchematic)(factoryFunction(rest), { collection, workspace, factoryName: schematicName, factoryRoot, collectionRoot, debug, dryRun });
//# sourceMappingURL=schematics.js.map