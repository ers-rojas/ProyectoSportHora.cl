import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioEscogeCentroComponent } from './usuario-escoge-centro.component';

const routes: Routes = [
  { path: '', component: UsuarioEscogeCentroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioEscogeCentroRoutingModule {} 