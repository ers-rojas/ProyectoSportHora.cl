import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteInicioComponent } from './cliente-inicio.component';

const routes: Routes = [
  { path: '', component: ClienteInicioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteInicioRoutingModule {} 