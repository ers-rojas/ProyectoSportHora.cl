import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ClienteReportesComponent } from './cliente-reportes.component';
import { ClienteReportesRoutingModule } from './cliente-reportes-routing.module';

@NgModule({
  imports:[CommonModule, RouterModule, NgChartsModule, ClienteReportesRoutingModule, ClienteReportesComponent]
})
export class ClienteReportesModule {} 