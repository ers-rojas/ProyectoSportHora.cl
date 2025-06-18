import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioDeporteComponent } from './usuario-deporte.component';

const routes: Routes = [
  { path: '', component: UsuarioDeporteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioDeporteRoutingModule {} 