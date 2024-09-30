#!/usr/bin/env node
import {existsSync, readFileSync} from 'fs';
import {dirname, extname, isAbsolute, resolve} from 'path';
import ts from 'typescript';

export function ensureFileExists(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`File ${filePath} does not exist.`);
  }
}

/**
 * Function to extract all import statements from a TypeScript file.
 * @param filePath Path to the TypeScript file.
 * @returns A list of files that are imported by the input file.
 */
export function listImports(filePath) {
  ensureFileExists(filePath);
  const imports = [];
  const fileContent = readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.ES2015,
    true // SetParentNodes - useful for AST transformations
  );

  const visit = (node) => {
    if (ts.isImportDeclaration(node)) {
      const importPath = node.moduleSpecifier.text;
      //   TODO: make sure the path starts at the root of atomic or ui-kit... we do not want to have the absolute path of the machine
      imports.push(importPath);
    }

    ts.forEachChild(node, visit);
  };

  ts.forEachChild(sourceFile, visit);

  const resolvedImports = imports.map((importPath) => {
    const absolutePath = isAbsolute(importPath)
      ? importPath
      : resolve(dirname(filePath), importPath);

    if (!extname(absolutePath)) {
      const extensions = ['.ts', '.tsx'];
      for (const ext of extensions) {
        const filePath = absolutePath.concat(ext);
        if (existsSync(filePath)) {
          return filePath;
        }
        // TODO: handle the case where the file does not exist
      }
    }

    return absolutePath;
  });

  return resolvedImports;
}
