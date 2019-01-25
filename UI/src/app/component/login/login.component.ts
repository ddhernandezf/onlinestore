import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '../../model/security/Login';
import { SecurityService } from '../../backend/security.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    Model: Login;
    BlockView: boolean;

    Properties = {
        EnterpriseName: 'MITI Guatemala un ejemplo de nombre de empresa largo',
        ErrorMessage: null
    };

    LoginForm: FormGroup;
    Submitted = false;

    constructor(private frmBuilder: FormBuilder, private router: Router, private Api: SecurityService) {}

    /*@HostListener('window:resize', ['$event'])
    onResize(event?) {
        alert(window.innerWidth);
        // this.screenHeight = window.innerHeight;
        // this.screenWidth = window.innerWidth;
    }*/

    ngOnInit() {
        this.BlockView = true;

        this.LoginForm = this.frmBuilder.group({
            User: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required, Validators.minLength(6)]]
        });

        setTimeout(() => {
            this.BlockView = false;
          }, 5000);
    }

    get f() {
        return this.LoginForm.controls;
    }

    Submit() {
        this.Submitted = true;

        if (this.LoginForm.invalid) {
            return;
        }

        this.Model = new Login(this.LoginForm.get('User').value, this.LoginForm.get('Password').value);
        const validate = this.Model.Validate();

        if (validate === true) {
            this.BlockView = true;
            this.Api.Login(this.Model).subscribe(
                data => { this.OnSucess(data); } ,
                    error => { this.OnError(error); });
        } else {
            this.Properties.ErrorMessage = validate;
            this.BlockView = false;
        }

    }

    private OnSucess(result) {
        sessionStorage.setItem('USER', JSON.stringify(result));
        this.router.navigateByUrl('');
    }

    private  OnError(result) {
        this.Properties.ErrorMessage = result.error;
        this.BlockView = false;
    }
}
