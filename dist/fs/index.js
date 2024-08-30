"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readdirSync = exports.readFileSync = exports.writeFileSync = exports.mkdirSync = exports.existsSync = exports.normalize = exports.parsePath = exports.dirname = exports.basename = exports.seperator = exports.resolvePath = exports.joinPath = void 0;
var node_path_1 = require("node:path");
Object.defineProperty(exports, "joinPath", { enumerable: true, get: function () { return node_path_1.join; } });
Object.defineProperty(exports, "resolvePath", { enumerable: true, get: function () { return node_path_1.resolve; } });
Object.defineProperty(exports, "seperator", { enumerable: true, get: function () { return node_path_1.sep; } });
Object.defineProperty(exports, "basename", { enumerable: true, get: function () { return node_path_1.basename; } });
Object.defineProperty(exports, "dirname", { enumerable: true, get: function () { return node_path_1.dirname; } });
Object.defineProperty(exports, "parsePath", { enumerable: true, get: function () { return node_path_1.parse; } });
Object.defineProperty(exports, "normalize", { enumerable: true, get: function () { return node_path_1.normalize; } });
var node_fs_1 = require("node:fs");
Object.defineProperty(exports, "existsSync", { enumerable: true, get: function () { return node_fs_1.existsSync; } });
Object.defineProperty(exports, "mkdirSync", { enumerable: true, get: function () { return node_fs_1.mkdirSync; } });
Object.defineProperty(exports, "writeFileSync", { enumerable: true, get: function () { return node_fs_1.writeFileSync; } });
Object.defineProperty(exports, "readFileSync", { enumerable: true, get: function () { return node_fs_1.readFileSync; } });
Object.defineProperty(exports, "readdirSync", { enumerable: true, get: function () { return node_fs_1.readdirSync; } });
//# sourceMappingURL=index.js.map