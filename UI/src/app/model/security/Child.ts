import { Store } from '../crud/Store';

export class Child {
    Id: number;
    Firstname: string;
    Lastname: string;
    Grade: string;
    Store: Store;

    constructor(id: number, firstname: string, lastname: string, grade: string, store: Store) {
        this.Id = id;
        this.Firstname = firstname;
        this.Lastname = lastname;
        this.Grade = grade;
        this.Store = store;
    }

    public JSON () {
        return JSON.stringify(this);
    }
}
