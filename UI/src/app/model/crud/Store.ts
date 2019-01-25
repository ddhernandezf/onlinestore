import { CrudBase } from './abstract/CrudBase';

export class Store extends CrudBase {
    Enterprise: number;

    constructor(id: number, enterprise: number, name: string) {
        super(id, name);
        this.Enterprise = enterprise;
    }
}
