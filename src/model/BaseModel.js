interface Model {
    create: function,
    read: function,
    update: function,
    delete: function,
}

export default class BaseModel implements Model {

    constructor() {

    }

    model: any = [];

    create(model) {

    }

    update(id) {

    }

    read(id) {

    }

    delete(id) {

    }
}