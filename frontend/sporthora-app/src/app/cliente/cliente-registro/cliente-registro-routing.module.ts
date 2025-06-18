import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteRegistroComponent } from './cliente-registro.component';

const routes: Routes = [
  { path: '', component: ClienteRegistroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRegistroRoutingModule {} 