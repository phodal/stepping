#!/usr/bin/env node

import {DSLAdapter} from "./dsl/DSLAdapter";
import {ForceLayoutAdapter} from "./layout/ForceLayoutAdapter";
import {SVGGenerator} from "./render/SVGGenerator";

let program = require('commander');
let version = require('../../package.json').version;
let fs = require('fs');
let path = require('path');

function parseInput(file) {
  "use strict";
  function processGrammar(raw, callback) {
    let dslAdapter = new DSLAdapter();
    let dslResult = dslAdapter.parseDSL(raw);

    let forceLayoutAdapter = new ForceLayoutAdapter();
    let forResult = forceLayoutAdapter.dslToNodes(dslResult[0]);
    forceLayoutAdapter.draw(forResult[0], function (res) {
      let svgGenerator = new SVGGenerator();
      res = svgGenerator.buildBody(res);
      callback(res);
    });
  }

  function processInputFile() {
    let raw = fs.readFileSync(path.normalize(file), 'utf8');

    processGrammar(raw, parser => {
      fs.writeFileSync('stepping.svg', parser);
    });

  }

  processInputFile();
}

program
  .version(version)
  .usage('[options] <file ...>')
  .option('-i  [value]', 'An integer argument', parseInput)
  .parse(process.argv);

