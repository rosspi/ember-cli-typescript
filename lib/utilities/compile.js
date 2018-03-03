/* eslint-env node */
'use strict';

const execa = require('execa');
const mkdirp = require('mkdirp');

module.exports = function compile(options) {
  // Ensure the output directory is created even if no files are generated
  mkdirp.sync(options.outDir);

  // argument sequence here is meaningful; don't apply prettier.
  // prettier-ignore
  let args = [
    '--outDir', options.outDir,
    '--rootDir', options.project.root,
    '--allowJs', 'false',
    '--noEmit', 'false'
  ];
  
  // 'tsc' may execute not the version intended, or might execute tsc.exe in windows, so change to exec node_modules version.  
  let compilerPath = options.project._nodeModulesPath.value + '\\typescript\\bin\\';
  
  return execa(compilerPath + 'tsc', args.concat(options.flags));
};
