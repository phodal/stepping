#!/usr/bin/env node

import {DSLAdapter} from "./dsl/DSLAdapter";
import {DSLConverter} from "./dsl/DSLConverter";
let program = require('commander');
let version = require('../../package.json').version;
let fs = require('fs');
let path = require('path');

function parseInput(file) {
  "use strict";
  function processGrammar(raw) {
    let dslAdapter = new DSLAdapter();
    let dslResult = dslAdapter.parseDSL(raw);
    console.log(dslResult);
    let converter = new DSLConverter();
    let result = converter.convertToSvg(dslResult);

    return result
  }

  function processInputFile() {
    let raw = fs.readFileSync(path.normalize(file), 'utf8');

    let parser = processGrammar(raw);
    fs.writeFileSync('stepping.svg', parser);
  }

  processInputFile();
}

program
  .version(version)
  .usage('[options] <file ...>')
  .option('-i  [value]', 'An integer argument', parseInput)
  .parse(process.argv);

