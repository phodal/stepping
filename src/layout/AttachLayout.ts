export class AttachLayout {
  constructor() {

  }

  calculateNodes(parentNode, nodes) {
    let newNodes: any[] = [];

    let rightTopPos = {
      x: parentNode.x + parentNode.width,
      y: parentNode.y + parentNode.height
    };

    for (let index in nodes) {
      let originNode = nodes[index];
      let position = {
        x: 0,
        y: 0
      };
      position.x = rightTopPos.x - rightTopPos.x * 0.3;
      position.y = rightTopPos.y + rightTopPos.y * 0.2;
      originNode.position = position;

      newNodes.push(originNode);
    }

    return newNodes
  }
}
