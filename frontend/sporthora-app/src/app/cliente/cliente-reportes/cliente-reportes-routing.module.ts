import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteReportesComponent } from './cliente-reportes.component';

const routes: Routes = [
  { path: '', component: ClienteReportesComponent }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ClienteReportesRoutingModule {} 