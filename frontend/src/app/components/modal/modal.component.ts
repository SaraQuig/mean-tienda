import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Model } from 'src/app/models/order'
import { CartService } from 'src/app/services/cart.service'; 
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit , OnDestroy{

  titulo = 'Registrar orden'
  id = ''
  email = ''
  nombre  = ''
  apellido = ''
  direccionEntrega = ''
  loading = false
  camposDeshabilitados = true; // Campos deshabilitados por defecto

  totalCarrito!: number;
  subscription: Subscription = new Subscription;
  constructor(private _modalService: ModalService, private cartService: CartService, private toastr: ToastrService,private router: Router) { }


  ngOnInit(): void {
    this.subscription = this.cartService.totalCarrito$.subscribe(total => {
      this.totalCarrito = total;
    });
  }

  habilitarCampos() {
    this.camposDeshabilitados = false;
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  agregarOrden() {
    //validar que el usuario ingrese campos
    if (!this.email) {
      this.toastr.error('Todos los campos son obligatorios', 'Administrador');
      return;
    }

    //creamos el objeto
    const modal: Model = {
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      direccionEntrega: this.direccionEntrega
    };

    //Guardando el usuario creado
    this.loading = true;

    this._modalService.guardarOrder(modal).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.email} a comprado en noveades ideas`, 'Compra exitosa!');
        this.router.navigate(['/list-prod'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.msjError(e);
      }
    });
  }

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      this.toastr.error('Ocurrió un error', 'Error');
    }
  }

}