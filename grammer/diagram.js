function Diagram() {

}

Diagram.data = [];
Diagram.aggregate = [];
Diagram.currentDomain = {};
Diagram.currentAggregate = {};
Diagram.currentModel = {};

Diagram.storeModel = function (symbol, field, fieldTypeString) {
  var filedTypeRegex = /\(([A-Za-z1-9 ,]+)\)/;
  var result = {};
  if(filedTypeRegex.test(fieldTypeString)) {
    var fieldString = filedTypeRegex.exec(fieldTypeString)[1];
    var fields = fieldString.split(",");
    result = {
      name: field,
      options: fields
    };
  } else {
    result = {
      name: field
    };
  }

  Diagram.currentModel.model.push(result);
  return [symbol, field, fieldTypeString]
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

Diagram.createAggregateDetail = function (input) {
  if(Diagram.currentAggregate.name !== undefined) {
    this.aggregate.push(Diagram.currentAggregate);
  }

  Diagram.currentAggregate = {
    name: input,
    model: []
  };
  return input;
};

Diagram.createModel = function (input) {
  if (Diagram.currentModel.name !== undefined) {
    Diagram.currentAggregate.model.push(Diagram.currentModel);
  }

  Diagram.currentModel = {
    name: input,
    model: []
  };
  return input;
};

Diagram.getResult = function () {
  this.data.push(Diagram.currentDomain);

  Diagram.currentAggregate.model.push(Diagram.currentModel);
  this.aggregate.push(Diagram.currentAggregate);
  return this.data;
};

if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
  exports.Diagram = Diagram;
}
