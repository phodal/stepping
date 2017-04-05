#!/usr/bin/env node

import {DSLAdapter} from './dsl/DSLAdapter';
import {ForceLayoutAdapter} from './layout/ForceLayoutAdapter';
import {GraphUtils} from './layout/GraphUtils';
import {AttachLayout} from './layout/AttachLayout';

let program = require('commander');
let version = require('../../package.json').version;
let fs = require('fs');
let path = require('path');

function parseInput(file) {
  'use strict';
  function processGrammar(raw, callback) {
    let dslAdapter = new DSLAdapter();
    let dslResults = dslAdapter.parseDSL(raw);
    let nodes: object[] = [];

    let forceLayoutAdapter = new ForceLayoutAdapter();

    for (let index in dslResults) {
      let domain = dslResults[index];

      let node = GraphUtils.dslToNodes(domain, 'domain');
      nodes.push(node);
    }

    if (JSON.stringify(nodes) === '{}') {
      console.log('Not Results');
      return callback('<svg width="1024" height="1024" viewBox="-1024 -1024 2048 2048" xmlns="http://www.w3.org/2000/svg"></svg>');
    }

    let firstNode = nodes[0];
    forceLayoutAdapter.draw(firstNode, function (res, nodeInfos) {
      let childNodeResults = '';

      for (let index in nodeInfos) {
        let layout = new AttachLayout();
        let parentNode = nodeInfos[parseInt(index)];

        let childNodes: any = '';

        if (firstNode['nodes'][index].id = parentNode.id) {
          let childData = firstNode['nodes'][index].data;

          if (childData && childData.events) {
            childNodes = layout.calculateNodes(parentNode, childData.events);
            childNodeResults += layout.draw(childNodes);
          }
          if (childData && childData.commands) {
            childNodes = layout.calculateNodes(parentNode, childData.commands);
            childNodeResults += layout.draw(childNodes);
          }

        }
      }

      let result = `<svg width="1024" height="1024" viewBox="-1024 -1024 2048 2048" xmlns="http://www.w3.org/2000/svg"> ${res} ${childNodeResults} </svg>`;
      callback(result);
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

