import {IPosition} from "./IPosition";

export class SVGGenerator {
  buildBody(node): string {
    return `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"> ${node} </svg>`

  }

  buildNode(position: IPosition, text: string): string {
    return `<g> \
              <rect x="${position.x}" y="${position.y}" width="100" height="100" rx="2" ry="2" fill="#FFCC33"/> \
              <text x="${position.x}" y="${position.y + 30}" fill="#000"> \
                <tspan x="${position.x + 5}" dy="0">${text}</tspan> \
              </text> \
            </g>`
  }
}
