import { Corporation } from '../crud/Corporation';
import { Enterprise } from '../crud/Enterprise';
import { Store } from '../crud/Store';
import { Student } from '../crud/Student';

export class Register {
    Corporation: Corporation;
    Enterprise: Enterprise;
    Store: Store;
    Student: Student;
    Grade: string;
    Username: string;
    Password: string;
    Confirmation: string;
    Firstname: string;
    Lastname: string;
    Address: string;
    Telephone: number;

    constructor(corporation: Corporation, enterprise: Enterprise, store: Store, student: Student, gradename: string,
                username: string, password: string, confirmation: string, firstname: string, lastname: string,
                address: string, telephone: number) {
        this.Corporation = corporation;
        this.Enterprise = enterprise;
        this.Store = store;
        this.Student = student;
        this.Grade = gradename;
        this.Username = username;
        this.Confirmation = confirmation;
        this.Firstname = firstname;
        this.Lastname = lastname;
        this.Address = address;
        this.Telephone = telephone;
    }

    public Validate() {
        if (this.Password !== this.Confirmation) {
            return 'Los password deben ser iguales';
        }
        
        return true;
    }

    public JSON () {
        return JSON.stringify(this);
    }
}
