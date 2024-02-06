import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any
  
  email = ''
  psw = ''
  activo = true
  isUpdating = false;
  userIdToUpdate = null;
  loading = false


  constructor(private toastr: ToastrService,
    private _usuarioService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {

  }
  //validacion de dominio de email
  // validateEmailDomain(email: string) {
  //   const re = /^[^\s@]+@ups\.edu\.ec$/i;
  //   return re.test(email);
  // }
  logearse() {
    //validamos que el user ingrese datos

    if (this.email == '' || this.psw == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error')
      return
    }

    // Check domain
    // if (!this.validateEmailDomain(this.email)) {
    //   this.toastr.error('El email debe terminar en @ups.edu.ec', 'Error')
    //   return
    // }

    //creamos el objeto
    const user: Usuario = {
      email: this.email,
      psw: this.psw,
      active: this.activo
    }

    // this.loading = true
    this._usuarioService.logearse(user).subscribe({
      next: (token) => {
        console.log(token);
        localStorage.setItem('token', token);
        
        if(this.email.startsWith('operador')) {
            this.router.navigate(['/operador-menu']);
        }
        else if(this.email.startsWith('admin')) {
            this.router.navigate(['/admin-menu']);
        }
        else {
            this.router.navigate(['/login']);
        }
        // console.log(token);

        // localStorage.setItem('token', token);
        // this.router.navigate(['/dashboard'])
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e)
        //   this._errorService.msjError(e);
        //   this.loading = false
      }
    })



  }
  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error')
    } else {
      this.toastr.error(e.error.msg, 'Ocurrio un error')
    }
  }

}

