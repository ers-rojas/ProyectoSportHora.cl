import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioReservasComponent } from './usuario-reservas.component';

const routes: Routes = [
  { path: '', component: UsuarioReservasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioReservasRoutingModule {} 