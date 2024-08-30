#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_args_1 = require("@digitalbranch/get-args");
const fs_1 = require("../fs");
const constants_1 = require("../constants");
const schematics_1 = require("../schematics");
const utils_1 = require("../utils");
const schematic_not_found_exception_1 = require("../exception/schematic-not-found.exception");
const [schematicName, ...argv] = process.argv.slice(2);
const root = (0, constants_1.rootDir)();
const args = (0, get_args_1.getArgs)('--', argv);
console.log(args);
const { debug = false, "dry-run": dryRun = false, ...rest } = args;
const parts = schematicName.split(':');
const factoryFunctionName = parts.pop();
if (!factoryFunctionName)
    throw Error('Factory function name missing');
const pathToWorkspace = (0, utils_1.resolveFilePath)((0, fs_1.joinPath)(root, 'workspace.json'));
const workspaceRoot = (0, fs_1.dirname)(pathToWorkspace);
if (!(0, fs_1.existsSync)(workspaceRoot))
    throw new schematic_not_found_exception_1.SchematicNotFoundException({ message: 'workspace.json not found', code: 'NOT_FOUND' });
const workspace = JSON.parse((0, fs_1.readFileSync)(pathToWorkspace, { encoding: 'utf8' }));
const pathToCollection = (0, fs_1.resolvePath)(root, parts.pop() ?? '.', 'collection.json');
const collectionRoot = (0, fs_1.dirname)(pathToCollection);
if (!(0, fs_1.existsSync)(pathToCollection))
    new schematic_not_found_exception_1.SchematicNotFoundException({ message: 'collection.json not found', code: 'NOT_FOUND' });
const collection = JSON.parse((0, fs_1.readFileSync)(pathToCollection, { encoding: 'utf8' }));
const { schematics } = collection;
const schematic = schematics[factoryFunctionName];
if (!schematic)
    throw Error(`Schematic ${factoryFunctionName} not found`);
const { factory } = schematic;
const [factoryFunctionPath, fun] = factory.split('#');
const factoryFunction = require((0, utils_1.resolveFilePath)((0, fs_1.resolvePath)(root, 'dist', factoryFunctionName, `${(0, fs_1.basename)(factoryFunctionPath)}.js`)))[fun];
if (!factoryFunction)
    throw Error(`Factory function ${fun} not found`);
(0, schematics_1.runSchematic)(factoryFunction(rest), { collection, workspace, factoryName: factoryFunctionName, factoryRoot: (0, fs_1.resolvePath)(factoryFunctionPath, '../'), collectionRoot, debug: debug, dryRun: dryRun });
//# sourceMappingURL=schematics.js.map