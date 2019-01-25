import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Register} from '../../model/security/Register';
import { Router } from '@angular/router';

import {Corporation} from '../../model/crud/Corporation';
import {Enterprise} from '../../model/crud/Enterprise';
import {Store} from '../../model/crud/Store';
import {Student} from '../../model/crud/Student';

import {RegisterCrud} from '../../model/crud/enum/RegisterCrud';

import { CrudService } from '../../backend/crud.service';

import { SecurityService } from '../../backend/security.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    private corporation: Corporation;
    private enterprise: Enterprise;
    private store: Store;
    private student: Student;
    BlockView: boolean;

    Model: Register;
    Crud = RegisterCrud;

    Properties = {
        ErrorMessage: null
    };

    ErrorModel = {
        Corporation: null,
        Enterprise: null,
        Store: null,
        Student: null
    };

    RegisterForm: FormGroup;
    Submitted = false;

    constructor(private frmBuilder: FormBuilder, private Api: CrudService, private ApiSecurity: SecurityService, private router: Router) {}

    ngOnInit() {
        this.BlockView = true;

        this.corporation = new Corporation(null, null);
        this.enterprise = new Enterprise(null, null, null);
        this.store = new Store(null, null, null);
        this.student = new Student(null, null, null, null);
        this.Model = new Register(this.corporation, this.enterprise, this.store, this.student,
                        null, null, null, null,
                null, null, null, null);

        this.RegisterForm = this.frmBuilder.group({
            Corporation: ['', [Validators.required]],
            Enterprise: ['', [Validators.required]],
            Store: ['', [Validators.required]],
            Student: ['', [Validators.required]],
            GradeName: ['', [Validators.required]],
            Username: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required, Validators.minLength(6)]],
            Confirmation: ['', [Validators.required, Validators.minLength(6)]],
            Firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
            Lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
            Address: ['', [Validators.required, Validators.maxLength(250)]],
            Telephone: ['', [Validators.required]]
        });

        setTimeout(() => {
            this.BlockView = false;
          }, 5000);
    }

    get f() {
        return this.RegisterForm.controls;
    }

    GetData(data: RegisterCrud) {
        switch (data) {
            case RegisterCrud.Corporation:
                this.corporation = new Corporation(this.RegisterForm.get('Corporation').value, null);

                this.Api.GetCorporation(this.corporation).subscribe(
                    resultData => {
                        if (resultData.length === 1) {
                            this.Model.Corporation = resultData[0];
                            this.ErrorModel.Corporation = null;
                        } else {
                            this.RegisterForm.get('Corporation').setValue(null);
                            this.Model.Corporation = new Corporation(null, null);
                            this.ErrorModel.Corporation = 'Código inválido';
                        }
                    },
                    resultError => {
                        this.RegisterForm.get('Corporation').setValue(null);
                        this.Model.Corporation = new Corporation(null, null);
                        this.ErrorModel.Corporation = resultError.error;
                    });
                break;
            case RegisterCrud.Enterprise:
                this.enterprise = new Enterprise(this.RegisterForm.get('Enterprise').value,
                    this.Model.Corporation.Id, null);

                this.Api.GetEnterprise(this.enterprise).subscribe(
                    resultData => {
                        if (resultData.length === 1) {
                            this.Model.Enterprise = resultData[0];
                            this.ErrorModel.Enterprise = null;
                        } else {
                            this.Model.Enterprise = new Enterprise(null, null, null);
                            this.ErrorModel.Enterprise = 'Código inválido';
                        }
                    },
                    resultError => {
                        this.RegisterForm.get('Enterprise').setValue(null);
                        this.Model.Enterprise = new Enterprise(null, null, null);
                        this.ErrorModel.Enterprise = resultError.error;
                    });
                break;
            case RegisterCrud.Store:
                this.store = new Store(this.RegisterForm.get('Store').value,
                    this.Model.Enterprise.Id, null);

                this.Api.GetStore(this.store).subscribe(
                    resultData => {
                        if (resultData.length === 1) {
                            this.Model.Store = resultData[0];
                            this.ErrorModel.Store = null;
                        } else {
                            this.Model.Store = new Store(null, null, null);
                            this.ErrorModel.Store = 'Código inválido';
                        }
                    },
                    resultError => {
                        this.RegisterForm.get('Store').setValue(null);
                        this.Model.Store = new Store(null, null, null);
                        this.ErrorModel.Store = resultError.error;
                    });
                break;
            case RegisterCrud.Student:
                this.student = new Student(this.RegisterForm.get('Student').value,
                    this.Model.Store.Id, null, null);

                this.Api.GetStudent(this.student).subscribe(
                    resultData => {
                        if (resultData.length === 1) {
                            this.Model.Student = resultData[0];
                            this.ErrorModel.Student = null;
                        } else {
                            this.Model.Student = new Student(null, null, null, null);
                            this.ErrorModel.Student = 'Código inválido';
                        }
                    },
                    resultError => {
                        this.RegisterForm.get('Student').setValue(null);
                        this.Model.Student = new Student(null, null, null, null);
                        this.ErrorModel.Student = resultError.error;
                    });
                break;
        }
    }

    Submit() {
        this.Submitted = true;

        if (this.RegisterForm.invalid) {
            return;
        }

        this.Model.Corporation = this.RegisterForm.get('Corporation').value;
        this.Model.Enterprise = this.RegisterForm.get('Enterprise').value;
        this.Model.Store = this.RegisterForm.get('Store').value;
        this.Model.Student = this.RegisterForm.get('Student').value;
        this.Model.Grade = this.RegisterForm.get('GradeName').value;
        this.Model.Username = this.RegisterForm.get('Username').value;
        this.Model.Password = this.RegisterForm.get('Password').value;
        this.Model.Confirmation = this.RegisterForm.get('Confirmation').value;
        this.Model.Firstname = this.RegisterForm.get('Firstname').value;
        this.Model.Lastname = this.RegisterForm.get('Lastname').value;
        this.Model.Address = this.RegisterForm.get('Address').value;
        this.Model.Telephone = this.RegisterForm.get('Telephone').value;

        const validate = this.Model.Validate();

        if (validate === true) {
            this.BlockView = true;
            this.ApiSecurity.Register(this.Model).subscribe(
                data => { this.OnSucess(data); } ,
                    error => { this.OnError(error); });
        } else {
            this.Properties.ErrorMessage = validate;
            this.BlockView = false;
        }
    }

    private OnSucess(result) {
        result['Password'] = this.Model.Password;

        this.ApiSecurity.Activate(result).subscribe(
            data => { this.OnSucessActivate(data); } ,
                error => { this.OnErrorActivate(error); });
    }

    private  OnError(result) {
        this.Properties.ErrorMessage = result.error;
        this.BlockView = false;
    }

    private OnSucessActivate(result) {
        if (result['Active'] === true) {
            this.router.navigateByUrl('');
        } else {
            this.Properties.ErrorMessage = 'No se pudo realizar la activación de su usurio.';
        }

        return null;
    }

    private  OnErrorActivate(result) {
        this.Properties.ErrorMessage = result.error;
        this.BlockView = false;
    }
}
