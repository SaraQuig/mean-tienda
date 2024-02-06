export class Usuario {
    _id?: number;
    email: string;
    psw: string;
    active: boolean; 


    constructor(email: string, psw: string, active: boolean) { // active will be 'true' by default.
        this.email = email;
        this.psw = psw;
        this.active = active;
    }
}
