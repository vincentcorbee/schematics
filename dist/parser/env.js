"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
class Env {
    data;
    parent;
    constructor(data = new Map(), parent = null) {
        this.data = data;
        this.parent = parent;
    }
    get(key) {
        if (!this.data.has(key)) {
            if (this.parent)
                return this.parent.get(key);
            return undefined;
        }
        return this.data.get(key);
    }
    set(key, value) {
        this.data.set(key, value);
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map