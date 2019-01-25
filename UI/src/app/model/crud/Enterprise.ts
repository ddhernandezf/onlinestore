import { CrudBase } from './abstract/CrudBase';

export class Enterprise extends CrudBase {
    Corporation: number;

    constructor(id: number, corporation: number, name: string) {
        super(id, name);
        this.Corporation = corporation;
    }
}
