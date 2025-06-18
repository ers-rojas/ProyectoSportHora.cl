import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ClienteCanchasComponent } from './cliente-canchas.component';
import { ClienteCanchasRoutingModule } from './cliente-canchas-routing.module';

@NgModule({
  imports:[CommonModule, RouterModule, NgChartsModule, ClienteCanchasRoutingModule, ClienteCanchasComponent]
})
export class ClienteCanchasModule {} 