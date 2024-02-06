//Peticiones HTTP a backend
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = ''
  myApiUrl = ''
  myApyLog = ''
  myApigetUsers = ''
  myApiElim = ''
  activo = true;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/'
    this.myApiUrl = 'api/crear-user'
    this.myApyLog = 'api/logearse'
    this.myApigetUsers = 'api/ver-users'
    this.myApiElim = 'api/usuarios/'
  }

  //cambiar el estado del usuario
  changeUserStatus(userId: string, isActive: boolean): Observable<any> {
    return this.http.put(`${this.url}${this.myApiElim}${userId}`, { active: isActive });
  }
  //observable se usa para hacer peticiones asyncronas
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}${this.myApigetUsers}`)
  }
  //eliminar usuarios
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.url}${this.myApiElim}` + id)
  }
  //registrar usuarios
  guardarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.url}${this.myApiUrl}`, usuario)
  }
  //actualizar un usuario
  obtenerUsuario(id: string): Observable<any> {
    return this.http.get(`${this.url}${this.myApiElim}` + id)
  }
  //Este codigo corresponde al login
  logearse(usuario: Usuario): Observable<string> {
    return this.http.post<string>(`${this.url}${this.myApyLog}`, usuario)
  }
}
