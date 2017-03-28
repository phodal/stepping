function Diagram() {

}

Diagram.data = [];
Diagram.currentDomain = {};

Diagram.TYPE = {
  CHILD: 'ADD',
};

Diagram.store = function (actor, type, value) {
  if (type === 'aggregate') {
    Diagram.currentDomain.aggregates.push({
      name: value,
      type: type,
      events: [],
      commands: []
    });
    Diagram.aggregateIndex++;
  }

  if (type === 'event') {
    Diagram.currentDomain.aggregates[Diagram.aggregateIndex].events.push({
      name: value,
      type: type
    });
  }

  if (type === 'command') {
    Diagram.currentDomain.aggregates[Diagram.aggregateIndex].commands.push({
      name: value,
      type: type
    });
  }

  return [actor, type, value];
};

Diagram.unescape = function (input) {
  return input;
};

Diagram.signal = function (input) {
  return input;
};

Diagram.createDomain = function (input) {
  if (Diagram.currentDomain.name !== undefined) {
    this.data.push(Diagram.currentDomain);
  }

  Diagram.aggregateIndex = -1;

  Diagram.currentDomain = {
    name: input,
    type: 'domain',
    aggregates: []
  };
};

Diagram.parse = function (input) {
  var parser = new esDsl.Parser();
  parser.yy = new Diagram();
  return parser.parse(input);
};

Diagram.getResult = function () {
  this.data.push(Diagram.currentDomain);
  return this.data;
};
