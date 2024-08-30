"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strings = exports.regExpFilePlaceholders = exports.regExpTemplate = exports.rootDir = void 0;
const rootDir = () => process.cwd();
exports.rootDir = rootDir;
exports.regExpTemplate = /<%= *(.*?) *%>|(?:<% *([a-z]+) *\((.*?)\) *{ *%>([\s\S]*?)<% *} *%>)/g;
exports.regExpFilePlaceholders = /__(.*?)__/g;
exports.strings = {
    upper: (input) => input.toUpperCase(),
    classify: (input) => input.split(/[- _]/g).map(part => `${part[0].toUpperCase()}${part.slice(1)}`).join(''),
    camelize: (input) => input.split(/[- _]/g).map((part, i) => i === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`).join(''),
    dasherize: (input) => input.replace(/[ A-Z]/g, (match => match === ' ' ? '-' : `-${match.toLowerCase()}`)),
    noop: (input) => input
};
//# sourceMappingURL=constants.js.map