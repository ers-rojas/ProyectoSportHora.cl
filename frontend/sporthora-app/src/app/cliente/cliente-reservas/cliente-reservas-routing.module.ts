import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteReservasComponent } from './cliente-reservas.component';

const routes: Routes = [
  { path: '', component: ClienteReservasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteReservasRoutingModule {} 