import {IPosition} from "./IPosition";
import {EventEntity} from "../entity/EventEntity";

export class SVGGenerator {
  buildBody(node): string {
    return `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"> ${node} </svg>`
  }

  buildNode(position: IPosition, entity: EventEntity, extend?: object, options?: object): string {
    let extendField = '';
    let sameLevelField = '';
    let color='#FFCC33';

    if(extend && extend['level'] === 'same') {
      extendField = extend['content'];
    }

    if(extend && extend['level'] === 'child') {
      sameLevelField = extend['content'];
    }

    if(options && options['color']) {
      color = options['color'];
    }

    return `<g>
              <rect x="${position.x}" y="${position.y}" width="100" height="100" rx="2" ry="2" fill="${color}"/>
              <text x="${position.x}" y="${position.y + 30}" fill="#000">
                <tspan x="${position.x + 5}" dy="0">${entity.name}</tspan>
              </text>${extendField}
            </g>${sameLevelField}`
  }

  buildChild() {

  }
}
