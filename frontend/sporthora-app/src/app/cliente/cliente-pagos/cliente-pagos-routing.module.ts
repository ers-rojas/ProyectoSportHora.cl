import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientePagosComponent } from './cliente-pagos.component';

const routes: Routes = [
  { path: '', component: ClientePagosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientePagosRoutingModule {} 