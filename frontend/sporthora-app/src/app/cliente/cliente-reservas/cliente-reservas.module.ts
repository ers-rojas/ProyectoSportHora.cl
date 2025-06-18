import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteReservasComponent } from './cliente-reservas.component';
import { ClienteReservasRoutingModule } from './cliente-reservas-routing.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgChartsModule,
    ClienteReservasRoutingModule,
    ClienteReservasComponent
  ]
})
export class ClienteReservasModule {} 