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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var ts = __importStar(require("typescript"));
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var program = ts.createProgram(['../config/config.ts',], { 'listEmittedFiles': true });
var emitResult = program.emit();
var allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);
allDiagnostics.forEach(function (diagnostic) {
    if (diagnostic.file) {
        var _a = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start), line = _a.line, character = _a.character;
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        process.stderr.write("".concat(diagnostic.file.fileName, " (").concat(line + 1, ":").concat(character + 1, "): ").concat(message, "\n"));
    }
    else {
        process.stderr.write(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n') + '\n');
    }
});
if (emitResult.emitSkipped) {
    process.stderr.write('TypeScript emit failed\n');
    process.exit(-1);
}
if (((_a = emitResult.emittedFiles) === null || _a === void 0 ? void 0 : _a.length) !== 1) {
    process.stderr.write('No or multiple emitted files found in TypeScript emit result\n');
    process.exit(-2);
}
var compiledConfig;
try {
    compiledConfig = require(emitResult.emittedFiles[0]);
}
catch (e) {
    process.stderr.write("Error while require()-ing emitted JS file: ".concat(e.message) + '\n');
    process.exit(-3);
}
var compiledConfigString;
try {
    compiledConfigString = JSON.stringify(compiledConfig["default"]);
}
catch (e) {
    process.stderr.write("Error while serializing default object: ".concat(e.message) + '\n');
    process.exit(-4);
}
process.chdir('..');
try {
    if (!fs.existsSync('dist/')) {
        fs.mkdirSync('dist/');
    }
    var fileName = process.argv[2];
    if (!fileName) {
        process.stderr.write('File name not provided');
        process.exit(-5);
    }
    fs.writeFileSync(path_1["default"].join('dist', "".concat(fileName, ".json")), compiledConfigString);
}
catch (e) {
    process.stderr.write("Error while writing config to disk: ".concat(e.message));
    process.exit(-5);
}
