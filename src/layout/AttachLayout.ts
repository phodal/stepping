export class AttachLayout {
  constructor() {

  }

  calculateNodes(parentNode, nodes) {
    let newNodes: any[] = [];

    let rightTopPos = {
      x: parentNode.x + parentNode.width,
      y: parentNode.y + parentNode.height
    };

    let rightBottomPos = {
      x: parentNode.x + parentNode.width,
      y: parentNode.y
    };

    for (let index in nodes) {
      let originNode = nodes[index];
      let position = {
        x: 0,
        y: 0
      };

      let isEven = (parseInt(index) + 1) % 2 === 0;

      if (!isEven) {
        position.x = rightTopPos.x - parentNode.width * 0.3;
        position.y = rightTopPos.y + parentNode.height * 0.2;
      } else {
        position.x = rightBottomPos.x - parentNode.width * 0.3;
        position.y = rightBottomPos.y + parentNode.height * 0.2;
      }

      originNode.position = position;

      newNodes.push(originNode);
    }

    return newNodes
  }

  draw(nodes) {
    let results = "";
    for (let index in nodes) {
      results += this.drawNode(nodes[index]);
    }
    return results;
  }

  drawNode(node: any) {
    let x = node.position.x;
    let y = node.position.y;

    return `<g>
              <rect x="${x}" y="${y}" width="100" height="100" rx="2" ry="2" fill="#FFCC33"/>
              <text x="${x}" y="${y}" fill="#000" text-anchor="middle">
                <tspan dx="${x + 5}" dy="0">${node.name}</tspan>
              </text>
            </g>`
  }
}
