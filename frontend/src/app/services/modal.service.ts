import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Model} from '..//models/order';


@Injectable({ providedIn: 'root' })

export class ModalService {
    url = ''
  myApiUrl = ''
  activo = true;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/'
    this.myApiUrl = 'api/crear-user'
  }
  guardarOrder(usuario: Model): Observable<any> {
    return this.http.post(`${this.url}${this.myApiUrl}`, usuario)
  }
}
