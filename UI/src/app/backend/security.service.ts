import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../model/security/Login';
import { Register } from '../model/security/Register';

const userToken = 'Basic ' + btoa(environment.API.USER + ':' + environment.API.PASSWORD);
const URL = environment.API.URl;
const apiHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Token', environment.API.TOKEN)
    .set('Authorization', userToken);

const httpOption = {
    headers: apiHeaders
};

@Injectable()

export class SecurityService {
    constructor(private http: HttpClient) {
    }

    public Login(user: Login): Observable<any> {
        const url = URL + 'Seguridad/IniciarSesion';

        return this.http.post<any>(url, user.JSON(), httpOption);
    }

    public Register(user: Register): Observable<any> {
        const url = URL + 'Seguridad/RegistrarUsuario';

        return this.http.post<any>(url, user.JSON(), httpOption);
    }

    public Activate(data: any): Observable<any> {
        const url = URL + 'Seguridad/ActivarUsuario';

        return this.http.post<any>(url, JSON.stringify(data), httpOption);
    }
}
