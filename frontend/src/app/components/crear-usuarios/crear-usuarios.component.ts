import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Crear usuario';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuariosService,
    private aRouter: ActivatedRoute
  ) {
    this.usuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator]],
      psw: ['', [Validators.required, this.passwordComplexityValidator]],
      confirmpsw: ['', Validators.required],
      active: [true]
    }, { validator: this.passwordMatchValidator });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  emailDomainValidator(control: any) {
    const email = control.value;
    const re = /^[^\s@]+@ups\.edu\.ec$/i;
    if (!re.test(email)) {
      return { emailDomain: true };
    }
    return null;
  }

  passwordComplexityValidator(control: any) {
    const password = control.value;
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!re.test(password)) {
      return { passwordComplexity: true };
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('psw')?.value;
    const confirmPassword = group.get('confirmpsw')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  agregarUsuario() {
    // if (this.usuarioForm.invalid) {
    //   this.toastr.error('Por favor, complete todos los campos correctamente.', 'Administrador');
    //   return;
    // }

    const user: Usuario = {
      email: this.usuarioForm.get('email')?.value,
      psw: this.usuarioForm.get('psw')?.value,
      active: this.usuarioForm.get('active')?.value
    };

    this._usuarioService.guardarUsuario(user).subscribe(data => {
      this.toastr.success('El usuario fue registrado con éxito!', 'Usuario Registrado!');
      this.router.navigate(['/listar-usuarios']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.usuarioForm.reset();
    });
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar usuario';
      this._usuarioService.obtenerUsuario(this.id).subscribe(data => {
        this.usuarioForm.setValue({
          email: data.email,
          psw: '',
          confirmpsw: '',
          active: data.active
        });
      });
    }
  }
}
