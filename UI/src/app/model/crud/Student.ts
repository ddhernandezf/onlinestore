export class Student {
    Id: number;
    Store: number;
    Firstname: string;
    Lastname: string;

    constructor(id: number, store: number, firstname: string, lastname: string) {
        this.Id = id;
        this.Store = store;
        this.Firstname = firstname;
        this.Lastname = lastname;
    }
}
