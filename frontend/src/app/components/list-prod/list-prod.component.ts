import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-list-prod',
  templateUrl: './list-prod.component.html',
  styleUrls: ['./list-prod.component.css']
})
export class ListProdComponent implements OnInit {
  listProductos: Producto[] = [];
  totalCarrito =  0
  productosEnCarrito: Producto[] = [];
  
  constructor(private _productoService: ProductosService, private modalService: ModalService) { }
  ngOnInit(): void {
    this._productoService.getProductos().subscribe(data => {
      this.listProductos = data;
    });
  }
  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  agregarAlCarrito(producto: Producto) {
    this.productosEnCarrito.push(producto);
    this.totalCarrito += producto.precio; // Suma el precio del producto al total del carrito
  }
  eliminarDelCarrito(producto: Producto) {
    const index = this.productosEnCarrito.indexOf(producto);
    if (index > -1) {
      this.productosEnCarrito.splice(index,  1);
      this.totalCarrito -= producto.precio;
    }
  }
}
