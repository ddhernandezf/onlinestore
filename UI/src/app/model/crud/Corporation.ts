import { CrudBase } from './abstract/CrudBase';

export class Corporation extends CrudBase {

    constructor(id: number, name: string) {
        super(id, name);
    }
}
