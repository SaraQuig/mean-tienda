export class Model{
    _id?: number;
    email: string;
    nombre: string;
    apellido: string;
    direccionEntrega: string;
    constructor(email:string,nombre:string,apellido:string,direccionEntrega:string){
        this.email=email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccionEntrega = direccionEntrega;
    }
}

