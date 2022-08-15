import * as ts from 'typescript';
import * as fs from "fs";
import path from "path";

const program = ts.createProgram([
    '../config.ts',
], { 'listEmittedFiles': true });

const emitResult = program.emit();

let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
        let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
        let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

        process.stderr.write(`${diagnostic.file.fileName} (${line + 1}:${character + 1}): ${message}\n`);
    } else {
        process.stderr.write(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n') + '\n');
    }
});


if (emitResult.emitSkipped) {
    process.stderr.write('TypeScript emit failed\n');
    process.exit(-1);
}

if (emitResult.emittedFiles?.length !== 1) {
    process.stderr.write('No or multiple emitted files found in TypeScript emit result\n');
    process.exit(-2);
}

let compiledConfig;
try {
    compiledConfig = require(emitResult.emittedFiles[0]);
} catch (e) {
    process.stderr.write(`Error while require()-ing emitted JS file: ${e.message}` + '\n');
    process.exit(-3);
}

let compiledConfigString;
try {
    compiledConfigString = JSON.stringify(compiledConfig.default);
} catch (e) {
    process.stderr.write(`Error while serializing default object: ${e.message}` + '\n');
    process.exit(-4);
}

process.chdir('..');

try {
    if (!fs.existsSync('dist/')) {
        fs.mkdirSync('dist/');
    }

    const fileName = process.argv[2];

    if (!fileName) {
        process.stderr.write('File name not provided');
        process.exit(-5);
    }

    fs.writeFileSync(path.join('dist', `${fileName}.json`), compiledConfigString);
} catch (e) {
    process.stderr.write(`Error while writing config to disk: ${e.message}`);
    process.exit(-5);
}
