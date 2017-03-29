import {esDsl} from 'esDsl'

export class DSLAdapter {
  constructor() {

  }

  parse(input) {
    return esDsl.parse(input);
  }

  parseDSL(input) {
    let parse = esDsl.parse(input);
    return parse.data;
  }
}
