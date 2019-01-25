export class Login {
    Username: string;
    Password: string;

    constructor(username: string, password: string) {
        this.Username = username;
        this.Password = password;
    }

    public Validate() {
        if (this.Username == null || this.Username === '' || this.Username === ' ') {
            return 'El usuario es requerido';
        }

        if (this.Password == null || this.Password === '' || this.Password === ' ') {
            return 'El password es requerido';
        }

        return true;
    }

    public JSON () {
        return JSON.stringify(this);
    }
}
