import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioDeporteFiltrarComponent } from './usuario-deporte-filtrar.component';

const routes: Routes = [
  { path: '', component: UsuarioDeporteFiltrarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioDeporteFiltrarRoutingModule {} 