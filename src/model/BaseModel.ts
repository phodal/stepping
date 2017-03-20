export interface Model {
    create: object,
    read: object,
    update: object,
    delete: object,
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