"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strings = exports.seperator = exports.resolvePath = exports.joinPath = exports.dirname = exports.basename = void 0;
__exportStar(require("./schematics"), exports);
__exportStar(require("./rules"), exports);
__exportStar(require("./types"), exports);
var fs_1 = require("./fs");
Object.defineProperty(exports, "basename", { enumerable: true, get: function () { return fs_1.basename; } });
Object.defineProperty(exports, "dirname", { enumerable: true, get: function () { return fs_1.dirname; } });
Object.defineProperty(exports, "joinPath", { enumerable: true, get: function () { return fs_1.joinPath; } });
Object.defineProperty(exports, "resolvePath", { enumerable: true, get: function () { return fs_1.resolvePath; } });
Object.defineProperty(exports, "seperator", { enumerable: true, get: function () { return fs_1.seperator; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "strings", { enumerable: true, get: function () { return constants_1.strings; } });
//# sourceMappingURL=index.js.map