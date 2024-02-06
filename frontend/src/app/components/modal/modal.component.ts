import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Model } from 'src/app/models/order'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

  titulo = 'Registrar orden'
  id = ''
  email = ''
  nombre  = ''
  apellido = ''
  direccionEntrega = ''
  loading = false
  toastr: any;
  constructor(private _modalService: ModalService) { }

  ngOnInit(): void { // Asigna un nuevo Subscription si subscription es null
  }
  agregarOrden() {
    //validar que el usuario ingrese campos
    if (this.email == ''  ) {
      this.toastr.error('Todos los campos son obligatorios', 'Adiministrador')
      return;
    }



    //creamos el objeto
    const modal: Model = {
      email: this.email,
     nombre :  this.nombre,
      apellido: this.apellido,
      direccionEntrega:this.direccionEntrega

    }

    //Guardando el usuario creado
    this.loading = true

      this._modalService.guardarOrder(modal).subscribe({
        next: (v) => {
          this.loading = false
          this.toastr.success(`El usuario ${this.email} fue registrado con exito`, 'Usuario registrado')
          //this.router.navigate(['/listar-usuarios'])
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