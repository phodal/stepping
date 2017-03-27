import {EventEntity} from '../entity/EventEntity';
import {IPosition} from './IPosition';
import {EventPositionEntity} from '../entity/EventPositionEntity';
import {SVGGenerator} from './SVGGenerator';
import {IModel} from '../model/IModel';

export class Renderer {
  stickyEntities: EventPositionEntity[] = [];
  originPosition: IPosition = {
    x: 0,
    y: 0
  };
  private _svgGenerator: SVGGenerator;

  constructor(svgGenerator: SVGGenerator) {
    this._svgGenerator = svgGenerator;
  }

  createEntity(node: EventEntity, nodes: EventEntity[]) {
    let position: IPosition = this.calculatePosition(nodes);
    let newEntity = new EventPositionEntity(position, node);

    this.handForChildNode(node, position, newEntity);
    this.stickyEntities.push(newEntity);

    return newEntity;
  }

  updateEntity(node: EventPositionEntity, nodes: EventEntity[]) {
    let position: IPosition = {
      x: 0,
      y: 0
    };

    for (let stickIndex in this.stickyEntities) {
      if (this.stickyEntities[stickIndex].id === node.id) {
        position = this.stickyEntities[stickIndex].pos;
      }
    }

    let newEntity = new EventPositionEntity(position, node);

    this.handForChildNode(node, position, newEntity);

    for (let stickIndex in this.stickyEntities) {
      if (this.stickyEntities[stickIndex].entity.id === node.id) {
        this.stickyEntities[stickIndex] = newEntity;
      }
    }

    return newEntity;
  }

  calculatePositions(nodes: EventEntity[]): IPosition[] {
    let positions: IPosition[] = [];

    return positions;
  }

  calculateSubPosition(parentPosition: IPosition, parentNode: EventPositionEntity, currentNode: IModel): IPosition {
    return {
      x: parentPosition.x + 50,
      y: parentPosition.x + 50
    }
  }

  render(): string {
    let result = this._svgGenerator.build(this.stickyEntities);
    return result;
  }

  private calculatePosition(nodes: EventEntity[]): IPosition {
    let position: IPosition = {
      x: 0,
      y: 0
    };

    if (nodes.length > 1) {
      this.originPosition = {
        x: this.originPosition.x + 150,
        y: this.originPosition.y
      };

      position = this.originPosition;
    }

    return position
  }

  private handForChildNode(node: EventEntity, position: IPosition, newEntity: EventPositionEntity) {
    if (node.hasRelatedChild()) {
      for (let index in node.relatedNodes) {
        let subPosition: IPosition = this.calculateSubPosition(position, newEntity, node.relatedNodes[index]);
        let subEntity = new EventPositionEntity(subPosition, node.relatedNodes[index]);

        newEntity.subEntity.push(subEntity);
      }
    }
  }

}
