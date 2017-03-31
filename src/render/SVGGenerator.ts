import {EventPositionEntity} from '../entity/EventPositionEntity';

export class SVGGenerator {
  buildBody(node): string {
    return `<svg width="1024" height="1024" viewBox="-1024 -1024 2048 2048" xmlns="http://www.w3.org/2000/svg"> ${node} </svg>`
  }

  buildNode(stickyEntities: EventPositionEntity, extend?: object, options?: object): string {
    let extendField = '';
    let sameLevelField = '';
    let color = '#FFCC33';

    if (extend && extend['level'] === 'same') {
      sameLevelField = extend['content'];
    }

    if (extend && extend['level'] === 'child') {
      extendField = extend['content'];
    }

    if (options && options['color']) {
      color = options['color'];
    }

    let entity = stickyEntities.entity;
    let pos = stickyEntities.pos;

    return `<g>
              <rect x="${pos.x}" y="${pos.y}" width="100" height="100" rx="2" ry="2" fill="${color}"/>
              <text x="${pos.x}" y="${pos.y + 30}" fill="#000">
                <tspan x="${pos.x + 5}" dy="0">${entity.name}</tspan>
              </text>${extendField}
            </g>${sameLevelField}`
  }

  buildWithChild(stickyEntity: EventPositionEntity) {
    let result: string = '';
    let childNodes = stickyEntity.subEntity;
    for (let childIndex in childNodes) {
      result = result + this.buildNode(childNodes[childIndex], {}, {color: '#0095DD'});
    }
    return this.buildNode(stickyEntity, {level: 'child', content: result})
  }

  buildNodes(stickyEntities: EventPositionEntity[]) {
    let result: string = '';
    for (let index in stickyEntities) {
      let stickyEntity = stickyEntities[index];
      if (stickyEntity.hasRelatedChild()) {
        result = result + this.buildWithChild(stickyEntity);
      } else {
        result = result + this.buildNode(stickyEntity);
      }
    }
    return result;
  }

  build(stickyEntities: EventPositionEntity[]): string {
    let baseNodeString = this.buildNodes(stickyEntities);
    return this.buildBody(baseNodeString);
  }

  buildAggregate(node: any) {
    return `<g id="ProcessOnG1005" transform="matrix(1.0,0.0,0.0,1.0,173.0,133.0)" opacity="1.0">
        <path id="ProcessOnPath1006" d="M0.0 0.0L184.0 0.0L184.0 117.0L0.0 117.0Z" stroke="#ffffff" stroke-width="1.0"
              stroke-dasharray="none" opacity="1.0" fill="#ffff00"/>
        <g id="ProcessOnG1007" transform="matrix(1.0,0.0,0.0,1.0,10.0,48.5)">
          <text id="ProcessOnText1008" fill="#000000" font-weight="normal" font-style="normal" text-decoration="blink"
                font-family="微软雅黑" text-anchor="middle" font-size="16" x="82.0" y="16.4"> ${node.name}
          </text>
        </g>
      </g>`
  }
}
