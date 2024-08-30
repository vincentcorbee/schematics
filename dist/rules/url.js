"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const tree_1 = require("../tree");
const helpers_1 = require("../tree/helpers");
function url(path) {
    return function (context) {
        return new tree_1.Tree(context, (0, helpers_1.createDir)(path));
    };
}
exports.url = url;
//# sourceMappingURL=url.js.map