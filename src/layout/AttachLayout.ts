export class AttachLayout {
  defaultWidth: number = 100;
  defaultHeight: number = 100;

  constructor() {

  }

  calculateEventsNodes(originParentNode, nodes) {
    let newNodes: any[] = [];

    for (let index in nodes) {
      let originNode: any;
      if (parseInt(index) <= 1) {
        originNode = this.calculateNode(originParentNode, nodes[index], index);
      } else {
        let parentNode = newNodes[parseInt(index) - 2];
        originNode = this.calculateClosedNode(parentNode, nodes[index], index);
      }
      newNodes.push(originNode);
    }

    return newNodes
  }


  calculateClosedNode(parentNode: any, node: any, index) {
    let parentX = parentNode.position.x;
    let parentY = parentNode.position.y;

    let originNode = node;
    let position = {
      x: 0,
      y: 0
    };

    let isEven = (parseInt(index) + 1) % 2 === 0;

    if (!isEven) {
      position.x = parentX + this.defaultWidth * 0.8;
      position.y = parentY + this.defaultHeight * 0.8;
    } else {
      position.x = parentX + this.defaultWidth * 0.8;
      position.y = parentY + this.defaultHeight * 0.8;
    }

    originNode.position = position;
    return originNode;
  }

  calculateNode(parentNode, node, index) {
    let rightTopPos = {
      x: parentNode.position.x + parentNode.width,
      y: parentNode.position.y + parentNode.height
    };

    let rightBottomPos = {
      x: parentNode.position.x + parentNode.width,
      y: parentNode.position.y
    };

    let originNode = node;
    let position = {
      x: 0,
      y: 0
    };

    let isEven = (parseInt(index) + 1) % 2 === 0;

    if (!isEven) {
      position.x = rightTopPos.x - 20;
      position.y = rightTopPos.y - 20;
    } else {
      position.x = rightBottomPos.x - 20;
      position.y = rightBottomPos.y - 20;
    }

    originNode.position = position;
    return originNode;
  }

  draw(nodes) {
    let results = '';
    for (let index in nodes) {
      results += this.drawNode(nodes[index]);
    }
    return results;
  }

  drawNode(node: any) {
    let x = node.position.x;
    let y = node.position.y;
    let color = '#ff8000';

    if(node.type === 'command') {
      color = '#66b2ff';
    }

    return `<g>
              <rect x="${x}" y="${y}" width="100" height="100" rx="2" ry="2" fill="${color}" stroke="#ffffff" stroke-width="1.0"/>
              <text x="${x}" y="${y}" fill="#fff" text-anchor="middle">
                <tspan dx="50" dy="50">${node.name}</tspan>
              </text>
            </g>`
  }

  calculateCommandNodes(originParentNode: any, nodes: any) {
    let newNodes: any[] = [];

    for (let index in nodes) {
      let originNode: any;
      if (parseInt(index) <= 1) {
        originNode = this.calculateCommandNode(originParentNode, nodes[index], index);
      } else {
        let parentNode = newNodes[parseInt(index) - 2];
        originNode = this.calculateCommandClosedNode(parentNode, nodes[index], index);
      }
      newNodes.push(originNode);
    }

    return newNodes
  }

  calculateCommandNode(parentNode: any, node: any, index: string) {
    let rightTopPos = {
      x: parentNode.position.x,
      y: parentNode.position.y + parentNode.height
    };

    let rightBottomPos = {
      x: parentNode.position.x,
      y: parentNode.position.y
    };

    let originNode = node;
    let position = {
      x: 0,
      y: 0
    };

    let isEven = (parseInt(index) + 1) % 2 === 0;

    if (!isEven) {
      position.x = rightTopPos.x - this.defaultWidth * 0.8;
      position.y = rightTopPos.y - this.defaultHeight * 0.2;
    } else {
      position.x = rightBottomPos.x - this.defaultWidth * 0.8;
      position.y = rightBottomPos.y - this.defaultHeight * 0.2;
    }

    originNode.position = position;
    return originNode;
  }

  calculateCommandClosedNode(parentNode: any, node: any, index: string) {
    let parentPos = {
      x: parentNode.position.x,
      y: parentNode.position.y
    };

    let originNode = node;
    let position = {
      x: 0,
      y: 0
    };

    let isEven = (parseInt(index) + 1) % 2 === 0;

    if (!isEven) {
      position.x = parentPos.x - this.defaultWidth * 0.8;
      position.y = parentPos.y + this.defaultHeight * 0.8;
    } else {
      position.x = parentPos.x - this.defaultWidth * 0.8;
      position.y = parentPos.y + this.defaultHeight * 0.8;
    }

    originNode.position = position;
    return originNode;
  }
}
