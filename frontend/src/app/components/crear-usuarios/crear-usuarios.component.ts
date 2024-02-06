import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpErrorResponse } from '@angular/common/http';
import { buffer } from 'rxjs';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {
  //titulo = 'Crear producto';
  titulo = 'Crear producto';
  id ='';
  email = ''
  psw = ''
  confirmpsw = ''
  active=''
  loading = false

  constructor(private toastr: ToastrService,
    private _usuarioService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
  }
  //validacion de password
  validatePasswordComplexity(password: string) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
  }
  //validacion de dominio de email
  validateEmailDomain(email: string) {
    const re = /^[^\s@]+@ups\.edu\.ec$/i;
    return re.test(email);
  }
  agregarUsuario() {
    //validar que el usuario ingrese campos
    if (this.email == '' || this.psw == '' ) {
      this.toastr.error('Todos los campos son obligatorios', 'Adiministrador')
      return;
    }

    if (!this.validatePasswordComplexity(this.psw)) {
      this.toastr.error('La contraseña debe tener un mínimo de 6 caracteres entre letras y números', 'Error')
      return;
    }

    if (this.psw != this.confirmpsw) {
      this.toastr.error('Las contraseñas no coinciden', 'Error')
      return;
    }

    // Check domain
    if (!this.validateEmailDomain(this.email)) {
      this.toastr.error('Invalid domain. Email should end with @ups.edu.ec', 'Error')
      return
    }

    //creamos el objeto
    const user: Usuario = {
      email: this.email,
      psw: this.psw,
      active: true
    }

    //Guardando el usuario creado
    this.loading = true
    // if (this.id) {
    //   // Update existing user
    //   this._usuarioService.editarUsuario(this.id, user).subscribe({
    //     next: (v) => {
    //       this.loading = false
    //       this.toastr.success(`El usuario ${this.email} fue actualizado con exito`, 'Usuario actualizado')
    //       this.router.navigate(['/listar-usuarios'])
    //     },
    //     error: (e: HttpErrorResponse) => {
    //       this.loading = false
    //       this.msjError(e)
    //     }
    //   })
    // }else{

      this._usuarioService.guardarUsuario(user).subscribe({
        next: (v) => {
          this.loading = false
          this.toastr.success(`El usuario ${this.email} fue registrado con exito`, 'Usuario registrado')
          this.router.navigate(['/listar-usuarios'])
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false
          this.msjError(e)
        }
      })
    // }
  }

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error')
    } else {
      this.toastr.error(e.error.msg, 'Ocurrio un error')
    }
  }

}


