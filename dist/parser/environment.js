"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
class Environment {
    parent;
    variables;
    constructor(parent = null, variables = new Map()) {
        this.parent = parent;
        this.variables = variables;
    }
    get(key) {
        if (!this.variables.has(key)) {
            if (this.parent)
                return this.parent.get(key);
            return undefined;
        }
        return this.variables.get(key);
    }
    set(key, value) {
        this.variables.set(key, value);
    }
}
exports.Environment = Environment;
// const _private = new WeakMap()
// // Global should hold the variables
// class Global {}
// export class Environment {
//   constructor(_parent: Environment | null = null, _global = new Global()) {
//     const _this = _parent ? null : _global
//     const _variables = _parent ? {} : _this || {}
//     // If Globalcode, this is set to Global object, else this is null and set at function execution
//     const _proxy = new Proxy(_variables, {
//       get(target: any, prop: string) {
//         if (target.hasOwnProperty(prop)) {
//           return Reflect.get(target, prop)
//         } else if (_parent) {
//           return _parent.get(prop)
//         } else {
//           throw new ReferenceError(`${prop} is not defined.`)
//         }
//       },
//       set(target: any, prop: string, value: any) {
//         if (target.hasOwnProperty(prop)) {
//           return Reflect.set(target, prop, value)
//         } else if (_parent) {
//           return _parent.set(prop, value)
//         } else {
//           throw new ReferenceError(`${prop} is not defined.`)
//         }
//       },
//     })
//     _private.set(this, {
//       _variables,
//       _proxy,
//       _parent,
//       _this,
//     })
//   }
//   get parent() {
//     return _private.get(this)._parent
//   }
//   get this() {
//     return _private.get(this)._this
//   }
//   set this(val) {
//     _private.get(this)._this = val
//   }
//   extend() {
//     return new Environment(this)
//   }
//   define(prop: string, type: string, value = undefined) {
//     if (type !== 'var' && _private.get(this)._variables.hasOwnProperty(prop))
//       throw new SyntaxError(`Identifier '${prop}' has already been declared.`)
//     return (_private.get(this)._variables[prop] = value)
//   }
//   get(prop: string) {
//     return _private.get(this)._proxy[prop]
//   }
//   set(prop: string, value: any) {
//     return (_private.get(this)._proxy[prop] = value)
//   }
// }
//# sourceMappingURL=environment.js.map