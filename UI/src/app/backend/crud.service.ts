import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Corporation } from '../model/crud/Corporation';
import { Enterprise } from '../model/crud/Enterprise';
import { Store } from '../model/crud/Store';
import { Student } from '../model/crud/Student';

const userToken = 'Basic ' + btoa(environment.API.USER + ':' + environment.API.PASSWORD);
const URL = environment.API.URl;
const apiHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Token', environment.API.TOKEN)
    .set('Authorization', userToken);

const httpOption = {
    headers: apiHeaders
};

@Injectable()

export class CrudService {
    constructor(private http: HttpClient) {
    }

    public GetCorporation(model: Corporation): Observable<Corporation[]> {
        let url = '';

        if (model.Id === null) {
            url = URL + 'Catalogo/Corporacion';
        } else {
            url = URL + 'Catalogo/Corporacion/' + model.Id;
        }

        return this.http.get<Corporation[]>(url, httpOption);
    }

    public GetEnterprise(model: Enterprise): Observable<Enterprise[]> {
        let url = '';

        if (model.Id === null) {
            url = URL + 'Catalogo/Empresa';
        } else {
            url = URL + 'Catalogo/Empresa/' + model.Id;
        }

        return this.http.get<Enterprise[]>(url, httpOption);
    }

    public GetStore(model: Store): Observable<Store[]> {
        let url = '';

        if (model.Id === null) {
            url = URL + 'Catalogo/Bodega';
        } else {
            url = URL + 'Catalogo/Bodega/' + model.Id;
        }

        return this.http.get<Store[]>(url, httpOption);
    }

    public GetStudent(model: Student): Observable<Student[]> {
        let url = '';

        if (model.Id === null) {
            url = URL + 'Catalogo/Estudiante';
        } else {
            url = URL + 'Catalogo/Estudiante/' + model.Id;
        }

        return this.http.get<Student[]>(url, httpOption);
    }
}


