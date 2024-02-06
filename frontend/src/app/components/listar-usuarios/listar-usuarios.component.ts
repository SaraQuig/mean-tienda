import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  listUsuarios: Usuario[] = [];

  loading = false

  constructor(private router: Router, private _usuarioService: UsuariosService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios(): void {
    this._usuarioService.getUsuarios().subscribe(
      (data) => {
        console.log(data);
        this.listUsuarios = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarUsuario(id: any) {
    this._usuarioService.eliminarUsuario(id).subscribe(
      (data) => {
        this.toastr.error('El usuario fue eliminado con éxito', 'Usuario eliminado');
        this.obtenerUsuarios();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  activateUser(id: any) {
    this._usuarioService.changeUserStatus(id, true).subscribe();
    this.toastr.success(`El estado del usuario a sido activado con exito`,'Estado actualizado')
  }

  deactivateUser(id: any) {
    this._usuarioService.changeUserStatus(id, false).subscribe();
    this.toastr.success(`El estado del usuario a sido desactivado con exito`,'Estado actualizado')

  }
 
}

