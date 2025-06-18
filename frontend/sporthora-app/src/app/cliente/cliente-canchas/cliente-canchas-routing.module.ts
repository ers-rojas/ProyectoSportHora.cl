import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCanchasComponent } from './cliente-canchas.component';

const routes: Routes = [
  { path: '', component: ClienteCanchasComponent }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ClienteCanchasRoutingModule {} 