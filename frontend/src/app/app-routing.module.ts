import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { CrearUsuariosComponent } from './components/crear-usuarios/crear-usuarios.component';
// import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
// import { IngresarProductosComponent } from './components/ingresar-productos/ingresar-productos.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { IngresarProdComponent } from './components/ingresar-prod/ingresar-prod.component';
import { VerProdComponent } from './components/ver-prod/ver-prod.component';
import { ListProdComponent } from './components/list-prod/list-prod.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listar-usuarios', component: ListarUsuariosComponent },
  { path: 'crear-usuario', component: CrearUsuariosComponent },
  // { path: 'editar-usuario/:id', component: CrearUsuariosComponent },
  { path: 'admin-menu', component: AdminMenuComponent },
  {path: 'ingresar-prod', component: IngresarProdComponent},
  {path: 'ver-prod', component: VerProdComponent},
  {path: 'list-prod', component: ListProdComponent},
  {path: 'modal', component: ModalComponent},

  


  
  //Esta linea siempre debe estar al final
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
