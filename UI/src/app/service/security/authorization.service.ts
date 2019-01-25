import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizationService implements CanActivate {

    UserLogged = sessionStorage.getItem('USER');

    constructor(private router: Router) {
    }

    canActivate(): boolean {
        if (this.UserLogged === null) {
            this.router.navigate(['IniciarSesion']);
            return false;
        }

        return true;
    }
}
