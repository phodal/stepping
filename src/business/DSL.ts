export class DSL {
  input: string;
  data: object[];
  aggregateIndex: -1;
  currentDomain: {
    name: string,
    type: string,
    aggregates: {
      type: string,
      name: string,
      events: object[],
      commands: object[],
    }[]
  };

  constructor(input: string) {
    this.input = input;
  }

  store(actor, type, value) {
    if (type === 'aggregate') {
      this.currentDomain.aggregates.push({
        name: value,
        type: type,
        events: [],
        commands: []
      });
      this.aggregateIndex++;
    }

    if (type === 'event') {
      this.currentDomain.aggregates[this.aggregateIndex].events.push({
        name: value,
        type: type
      });
    }

    if (type === 'command') {
      this.currentDomain.aggregates[this.aggregateIndex].commands.push({
        name: value,
        type: type
      });
    }

    return [actor, type, value];
  }

  unescape(input) {
    return input;
  }

  signal(input) {
    return input;
  }

  createDomain(input) {
    if (this.currentDomain.name !== undefined) {
      this.data.push(this.currentDomain);
    }

    this.aggregateIndex = -1;

    this.currentDomain = {
      name: input,
      type: 'domain',
      aggregates: []
    };
  };

  getResult() {
    this.data.push(this.currentDomain);
    return this.data;
  };
}
