import { Child } from './Child';
import { Corporation } from '../crud/Corporation';
import { Enterprise } from '../crud/Enterprise';
import { Store } from '../crud/Store';

export class User {
    Email: string;
    Firstname: string;
    Lastname: string;
    Telephone: string;
    Address: string;
    Corporation: Corporation;
    Enterprise: Enterprise;
    Store: Store;
    Childs: Child[];

    constructor() {
        const model = JSON.parse(sessionStorage.getItem('USER'));
        this.Email = model.Email;
        this.Firstname = model.Firstname;
        this.Lastname = model.Lastname;
        this.Telephone = model.Telephone;
        this.Address = model.Address;
        this.Corporation = model.Corporation;
        this.Enterprise = model.Enterprise;
        this.Store = model.Store;
        this.Childs = [];

        for (let i = 0; i < model.Childs.length; i++) {
            const element = model.Childs[i];
            const store = new Store(element.Store, element.Enterprise, element.StoreName);
            const kid = new Child(element.Id, element.Firstname, element.Lastname, element.Grade, store);
            this.Childs.push(kid);
        }
    }

    public static GetFromSession() {
        return JSON.parse(sessionStorage.getItem('USER'));
    }

    public JSON () {
        return JSON.stringify(this);
    }
}
