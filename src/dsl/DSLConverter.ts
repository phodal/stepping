import {SVGConvert} from './SVGConvert';
export class DSLConverter {
  constructor() {

  }

  convertToSvg(input){
    let svgConvert = new SVGConvert();
    let result = svgConvert.parse(input);
    return result;
  }
}
