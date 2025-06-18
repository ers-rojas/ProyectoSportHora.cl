import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ClientePagosComponent } from './cliente-pagos.component';
import { ClientePagosRoutingModule } from './cliente-pagos-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, NgChartsModule, ClientePagosRoutingModule, ClientePagosComponent]
})
export class ClientePagosModule {} 